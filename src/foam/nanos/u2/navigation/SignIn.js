/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.u2.navigation',
  name: 'SignIn',

  documentation: `User Signin model to be used with LoginView.
  `,

  implements: [ 'foam.mlang.Expressions' ],

  imports: [
    'auth',
    'ctrl',
    'closeDialog?',
    'emailVerificationService',
    'loginSuccess',
    'loginView?',
    'memento_',
    'setTimeout',
    'notify',
    'menuDAO',
    'pushMenu',
    'stack',
    'subject',
    'window'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.u2.borders.StatusPageBorder',
    'foam.u2.dialog.Popup',
    'foam.u2.dialog.NotificationMessage',
    'foam.u2.stack.StackBlock',
    'foam.nanos.auth.AuthenticationException',
    'foam.nanos.auth.ChangePasswordView',
    'foam.nanos.auth.DuplicateEmailException',
    'foam.nanos.auth.UnverifiedEmailException',
    'foam.nanos.auth.twofactor.TwoFactorSignInView',
    'foam.nanos.auth.email.EmailVerificationCode',
    'foam.nanos.auth.email.VerificationCodeView',
  ],

  messages: [
    { name: 'TITLE',      message: 'Welcome Back' },
    { name: 'FOOTER_TXT', message: 'Not a User Yet?' },
    { name: 'ERROR_MSG',  message: 'There was an issue logging in' },
    { name: 'ERROR_MSG2', message: 'Please enter email or username' },
    { name: 'ERROR_MSG3', message: 'Please enter password' }
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
      class: 'String',
      name: 'username',
      visibility: function(usernameRequired) {
        return usernameRequired ? foam.u2.DisplayMode.RW : foam.u2.DisplayMode.HIDDEN;
      }
    },
    {
      flags: ['web'],
      name: 'email',
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'usernameRequired',
      hidden: true
    },
    {
      class: 'String',
      name: 'identifier',
      required: true,
      label: 'Email or Username',
      preSet: function(_, n) {
        return n.trim();
      },
      view: {
        class: 'foam.u2.TextField',
        focused: true
      },
      visibility: function(disableIdentifier_, usernameRequired) {
        return usernameRequired ? foam.u2.DisplayMode.HIDDEN :
          disableIdentifier_ ? foam.u2.DisplayMode.DISABLED : foam.u2.DisplayMode.RW;
      },
      validationTextVisible: false
    },
    {
      class: 'Password',
      name: 'password',
      required: true,
      view: { class: 'foam.u2.view.PasswordView', passwordIcon: true },
      validationTextVisible: false
    },
    {
      class: 'Boolean',
      name: 'disableIdentifier_',
      hidden: true
    },
    {
      class: 'String',
      name: 'token_',
      hidden: true
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
    },
    {
      class: 'Boolean',
      name: 'loginFailed',
      value: true,
      hidden: true,
      documentation: 'Used to control flow in transient wizard signin'
    }
  ],

  methods: [
    {
      name: 'nextStep',
      code: async function() {
        if ( this.subject.realUser.twoFactorEnabled ) {
          ctrl.loginSuccess = false;
          this.window.history.replaceState({}, document.title, '/');
          let view = { class: this.TwoFactorSignInView };
          if ( this.closeDialog ) this.closeDialog();
          ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));
        }
      }
    },
    {
      name: 'verifyEmail',
      code: async function(x, email, username) {
        this.ctrl.groupLoadingHandled = true;
        this.onDetach(this.emailVerificationService.sub('emailVerified', this.emailVerifiedListener));
        let view = {
            class: 'foam.nanos.auth.email.VerificationCodeView',
            showBack: false,
            data: {
              class: 'foam.nanos.auth.email.EmailVerificationCode',
              email: email,
              userName: username,
              showAction: true
            }
          };
        if ( this.closeDialog ) this.closeDialog();
        ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));
      }
    },
    {
      name: 'notifyUser',
      code: function(err, msg, type) {
        this.ctrl.add(this.NotificationMessage.create({
          err: err,
          message: msg,
          type: type
        }));
      }
    }
  ],

  listeners: [
    {
      name: 'emailVerifiedListener',
      code: function() {
        this.login();
      }
    }
  ],

  actions: [
    {
      name: 'login',
      label: 'Sign In',
      section: 'footerSection',
      buttonStyle: 'PRIMARY',
      // if you use isAvailable or isEnabled - with model error_, then note that auto validate will not
      // work correctly. Chorme for example will not read a field auto populated without a user action
      isAvailable: function(showAction) { return showAction; },
      code: async function(x) {
        if ( this.identifier.length == 0 ) {
          this.notifyUser(undefined, this.ERROR_MSG2, this.LogLevel.ERROR);
          return;
        }
        if ( ! this.password ) {
          this.notifyUser(undefined, this.ERROR_MSG3, this.LogLevel.ERROR);
          return;
        }
        await this.auth.login(x, this.identifier, this.password)
        .then( _ => {
          ctrl.loginSuccess = true;
          this.notify('Successfully logged in', '', this.LogLevel.INFO, true);
          window.location.reload();
          if ( this.__subContext__.closeDialog ) this.__subContext__.closeDialog();
          console.debug(this.subject.user.id);
        }).catch( err => {
          this.loginFailed = true;
          let e = err && err.data ? err.data.exception : err;
          if ( this.UnverifiedEmailException.isInstance(e) || 'User is not active' == e?.message ) { 
            var email = this.usernameRequired ? this.email : this.identifier;
            this.verifyEmail(x, email, this.userName);
            return;
          }
          this.notifyUser(err.data, this.ERROR_MSG, this.LogLevel.ERROR);
        });
      }
    },
    {
      name: 'footer',
      label: 'Create an Account',
      section: 'footerSection',
      buttonStyle: 'SECONDARY',
      size: 'large',
      isAvailable: function(showAction) { return showAction; },
      code: function(X) {
        // X.window.history.replaceState(null, null, X.window.location.origin);
        view = { ...(X.loginView ?? { class: this.LoginView }),
        mode_: 'SignUp',
        topBarShow_: X.topBarShow_,
        param: X.param }
        if ( this.closeDialog ) this.closeDialog();
        ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));

      }
    },
    {
      name: 'subFooter',
      label: 'Forgot Password?',
      section: 'footerSection',
      buttonStyle: 'LINK',
      isAvailable: function(showAction) { return showAction; },
      code: function(X) {
        view = {
          class: this.ChangePasswordView,
          modelOf: 'foam.nanos.auth.RetrievePassword'
        }
        if (this.closeDialog ) this.closeDialog();
        ctrl.add(this.Popup.create({ backgroundColor: 'white' }).tag(view));
      }
    }
  ]
});
