/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.u2.navigation',
  name: 'SignUp',

  documentation: `Model used for registering/creating an user.
  Hidden properties create the different functionalities for this view (Ex. coming in with a signUp token)`,

  implements: [
    'foam.mlang.Expressions'
  ],

  imports: [
    'appConfig',
    'auth',
    'closeDialog?',
    'ctrl',
    'emailVerificationService',
    'loginSuccess',
    'loginView?',
    'notify?',
    'pushMenu',
    'setTimeout',
    'stack',
    'subject',
    'theme',
    'translationService',
    'window'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.nanos.auth.email.EmailVerificationCode',
    'foam.nanos.auth.email.VerificationCodeView',
    'foam.nanos.auth.User',
    'foam.u2.borders.StatusPageBorder',
    'foam.u2.dialog.Popup',
    'foam.u2.stack.StackBlock',
    'foam.u2.view.LoginView',
  ],

  messages: [
    { name: 'TITLE', message: 'Create an account' },
    { name: 'FOOTER_TXT', message: 'Already have an account?' },
    { name: 'ERROR_MSG', message: 'There was a problem creating your account' },
    { name: 'EMAIL_ERR', message: 'Valid email required' },
    { name: 'EMAIL_AVAILABILITY_ERR', message: 'This email is already in use. Please sign in or use a different email' },
    { name: 'USERNAME_EMPTY_ERR', message: 'Username required' },
    { name: 'USERNAME_AVAILABILITY_ERR', message: 'This username is taken. Please try another.' },
    //TODO: Find out better way to deal with PASSWORD_ERR
    { name: 'PASSWORD_ERR', message: 'Password should be at least 6 characters' },
    { name: 'WEAK_PASSWORD_ERR', message: 'Password is weak' },
    { name: 'SUCCESS_MSG', message: 'Account successfully created' },
    { name: 'SUCCESS_MSG_TITLE', message: 'Success' },
    { name: 'ERROR_MSG_LOGIN', message: 'There was a problem signing into your account' }
  ],

  sections: [
    {
      name: '_defaultSection',
      title: ''
    },
    {
      name: 'footerSection',
      title: '',
      isAvailable: () => false
    }
  ],


  properties: [
    {
      name: 'dao_',
      hidden: true,
      transient: true
    },
    {
      class: 'Boolean',
      name: 'isLoading_',
      documentation: `Condition to synchronize code execution and user response.`,
      hidden: true
    },
    {
      class: 'String',
      name: 'token_',
      documentation: `Input to associate new user with something.`,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'disableEmail_',
      documentation: `Set this to true to disable the email input field.`,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'emailAvailable',
      documentation: `Binded property used to display email not available error.`,
      value: true,
      hidden: true
    },
    {
      class: 'EMail',
      name: 'email',
      placeholder: 'example@example.com',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.UserPropertyAvailabilityView',
          icon: 'images/checkmark-small-green.svg',
          onKey: true,
          isAvailable$: X.data.emailAvailable$,
          inputValidation: /\S+@\S+\.\S+/,
          restrictedCharacters: /^[^\s]$/,
          displayMode: X.data.disableEmail_ ? foam.u2.DisplayMode.DISABLED : foam.u2.DisplayMode.RW
        };
      },
      validateObj: function(email, emailAvailable) {
        // Empty Check
        if ( email.length === 0 || ! /\S+@\S+\.\S+/.test(email) ) return this.EMAIL_ERR;
        // Availability Check
        if ( ! emailAvailable ) return this.EMAIL_AVAILABILITY_ERR;
      }
    },
    {
      class: 'Boolean',
      name: 'usernameAvailable',
      documentation: `Binded property used to display username not available error.`,
      value: true,
      hidden: true
    },
    {
      class: 'String',
      name: 'userName',
      label: 'Username',
      placeholder: 'example123',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.UserPropertyAvailabilityView',
          icon: 'images/checkmark-small-green.svg',
          onKey: true,
          isAvailable$: X.data.usernameAvailable$,
          inputValidation: /^[^\s\/]+$/,
          restrictedCharacters: /^[^\s\/]$/
        };
      },
      validateObj: function(userName, usernameAvailable) {
        // Empty Check
        if ( userName.length === 0 ) return this.USERNAME_EMPTY_ERR;
        // Availability Check
        if ( ! usernameAvailable ) return this.USERNAME_AVAILABILITY_ERR;
      }
    },
    {
      class: 'Boolean',
      name: 'passwordAvailable',
      value: true,
      hidden: true
    },
    {
      class: 'Password',
      name: 'desiredPassword',
      label: 'Password',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.PasswordView',
          isAvailable$: X.data.passwordAvailable$,
          passwordIcon: true
        }
      },
      validateObj: function(desiredPassword, passwordAvailable) {
        if ( ! desiredPassword || desiredPassword.length < 6 ) return this.PASSWORD_ERR;
        if ( ! passwordAvailable ) return this.WEAK_PASSWORD_ERR;
      }
    },
    {
      class: 'URL',
      name: 'acceptDocc',
      label: '',
      view: function(_, x) {
        let c = 'https://docs.google.com/document/d/e/2PACX-1vRqDvsbNbaI7fFyg19lPvmQwAaLVQR1yNH46jbIbRlW8QkTTMwtbnVn3IEBWUkBRGEhlNDe9d0jlrYK/pub';
        return x.E().start()
        .style({ 'cursor': 'pointer', 'color': 'blue', 'text-decoration': 'underline' })
          .add('Terms and Conditions')
          .on('click', () => {
            x.ctrl.add(x.ctrl.Popup.create({ backgroundColor: 'white' }, x)
            .tag({ class: 'foam.u2.IFrameHTMLView', isLink: true, data: c, usedAsDocInPopUp: true }))
          })
        .end();
      },
    },
    {
      class: 'Boolean',
      name: 'acceptDoc',
      label: 'Please view and accept the terms and conditions.',
      required: true
    },
    {
      class: 'Boolean',
      name: 'showAction',
      visibility: 'HIDDEN',
      value: true,
      documentation: 'Optional boolean used to display this model without login action'
    },
    {
      class: 'Boolean',
      name: 'pureLoginFunction',
      documentation: 'Set to true, if we just want to login without application redirecting.',
      hidden: true
    }
  ],

  listeners: [
    {
      name: 'emailVerifiedListener',
      code: async function() {
        try {
          await this.auth.login(x, this.userName, this.desiredPassword);
          ctrl.loginSuccess = true;
          this.notify('Successfully logged in', '', this.LogLevel.INFO, true);
          window.location.reload();
          if ( this.__subContext__.closeDialog ) this.__subContext__.closeDialog();
        } catch(err) {
          this.notify(this.ERROR_MSG_LOGIN, '', this.LogLevel.ERROR, true);
          this.pushMenu('sign-in', true);
        }
      }
    }
  ],

  methods: [
    {
      name: 'nextStep',
      code: async function(x) {
        await this.verifyEmail(x, this.email, this.userName);
      }
    },
    {
      name: 'verifyEmail',
      code: async function() {
        if ( this.subject.user.emailVerified ) {
          // When a link was sent to user to SignUp, they will have already verified thier email,
          // thus thier user.emailVerified should be true and they can simply login from here.
          this.window.history.replaceState(null, null, this.window.location.origin);
          location.reload();
        } else {
          // login function in signup sets the subject to the signed up user without logging in
          // here we save the new user info to be used later in emailverification
          // and reset the subject to the anonymous subject before verification step
          var user = this.subject.user;
          this.subject = await this.auth.getCurrentSubject(null);
          this.onDetach(this.emailVerificationService.sub('emailVerified', this.emailVerifiedListener));
          this.ctrl.groupLoadingHandled = true;
          let view = {
            class: 'foam.nanos.auth.email.VerificationCodeView',
            showBack: false,
            data: {
              class: 'foam.nanos.auth.email.EmailVerificationCode',
              email: user.email,
              userName: user.userName,
              showAction: true,
              signinOnSubmit: true
            }
          };
          this.closeDialog();
          ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));
        }
      }
    },
    {
      name: 'defaultUserLanguage',
      code: function() {
        let l = foam.locale.split('-');
        let code = l[0];
        let variant = l[1];
        let language = foam.nanos.auth.Language.create({ code: code });
        if ( variant ) language.variant = variant;
        return language;
      }
    }
  ],
  actions: [
    {
      name: 'login',
      label: 'Get started',
      section: 'footerSection',
      buttonStyle: 'PRIMARY',
      isEnabled: function(errors_, isLoading_) {
        return ! errors_ && ! isLoading_;
      },
      isAvailable: function(showAction) { return showAction; },
      code: async function(x) {
        let createdUser = this.User.create({
          userName: this.userName,
          email: this.email,
          desiredPassword: this.desiredPassword,
          signUpToken: this.token_,
          language: this.defaultUserLanguage()
        });
        var user;
        try {
          user = await this.dao_.put(createdUser);
        } catch (err) {
          this.notify(err.message, '', this.LogLevel.ERROR, true);
          return;
        }

        if ( user ) {
          this.subject.realUser = user;
          this.subject.user = user;

          if ( ! this.pureLoginFunction ) await this.nextStep(x);

          this.notify(this.SUCCESS_MSG_TITLE, this.SUCCESS_MSG, this.LogLevel.INFO, true);
        } else {
          this.loginFailed = true;
          this.notify(this.ERROR_MSG, '', this.LogLevel.ERROR, true);
        }
        // TODO: Add functionality to push to sign in if the user email already exists
      }
    },
    {
      name: 'footer',
      section: 'footerSection',
      label: 'Sign in',
      buttonStyle: 'TEXT',
      code: function(X) {
        // X.window.history.replaceState(null, null, X.window.location.origin);
        let view = { ...(X.loginView ?? { class: this.LoginView }),
          mode_: 'SignIn',
          topBarShow_: X.topBarShow_,
          param: X.param
        };
        this.closeDialog();
        ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));
      }
    },
    {
      name: 'subFooter',
      section: 'footerSection',
      isAvailable: () => false,
      code: () => {}
    }
  ]
});
