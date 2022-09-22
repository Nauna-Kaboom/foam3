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

  imports: [
    'auth',
    'ctrl',
    'currentMenu',
    'loginSuccess',
    'loginVariables',
    'menuDAO',
    'memento_',
    'pushMenu',
    'stack',
    'translationService',
    'subject'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.u2.dialog.NotificationMessage',
    'foam.u2.stack.StackBlock',
    'foam.nanos.auth.DuplicateEmailException'
  ],

  messages: [
    { name: 'TITLE', message: 'Welcome!' },
    { name: 'FOOTER_TXT', message: 'Not a user yet?' },
    { name: 'FOOTER_LINK', message: 'Create an account' },
    { name: 'SUB_FOOTER_LINK', message: 'Forgot password?' },
    { name: 'ERROR_MSG', message: 'There was an issue logging in' },
    { name: 'ERROR_MSG2', message: 'Please enter email or username' },
    { name: 'ERROR_MSG3', message: 'Please enter password' }
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
      },
      postSet: function(_, n) {
        this.identifier = n;
        return n;
      }
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
      view: {
        class: 'foam.u2.TextField',
        focused: true
      },
      visibility: function(disableIdentifier_, usernameRequired) {
        return disableIdentifier_ || usernameRequired ?
          foam.u2.DisplayMode.HIDDEN : foam.u2.DisplayMode.RW;
      },
      validationTextVisible: false
    },
    {
      class: 'Password',
      name: 'password',
      view: { class: 'foam.u2.view.PasswordView', passwordIcon: true }
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
    }
  ],

  methods: [
    {
      name: 'footerLink',
      code: function(topBarShow_, param) {
        window.history.replaceState(null, null, window.location.origin);
        this.stack.push(this.StackBlock.create({ view: { ...(this.loginVariables?.loginView ?? { class: 'foam.u2.view.LoginView' }), mode_: 'SignUp', topBarShow_: topBarShow_, param: param }, parent: this }));
      }
    },
    {
      name: 'subfooterLink',
      code: function() {
        this.stack.push(this.StackBlock.create({
          view: {
            class: 'foam.nanos.auth.ChangePasswordView',
            modelOf: 'foam.nanos.auth.RetrievePassword'
          }
        }));
      }
    },
    {
      name: 'nextStep',
      code: async function(X) {
        if ( this.subject.realUser.twoFactorEnabled ) {
          this.loginSuccess = false;
          window.history.replaceState({}, document.title, '/');
          this.stack.push(this.StackBlock.create({
            view: { class: 'foam.nanos.auth.twofactor.TwoFactorSignInView' }
          }));
        } else {
          if ( ! this.subject.realUser.emailVerified ) {
            await this.auth.logout();
            this.stack.push(this.StackBlock.create({
              view: { class: 'foam.nanos.auth.ResendVerificationEmail' }
            }));
          } else {
            this.loginSuccess = !! this.subject;
            // reload the client on loginsuccess in case login not called from controller
            if ( this.loginSuccess ) await this.ctrl.reloadClient();
          }
        }
      }
    }
  ],

  actions: [
    {
      name: 'login',
      label: 'Sign in',
      buttonStyle: 'PRIMARY',
      // if you use isAvailable or isEnabled - with model error_, then note that auto validate will not
      // work correctly. Chorme for example will not read a field auto populated without a user action
      isAvailable: function(showAction) { return showAction; },
      code: async function(X) {
        this.identifier = this.identifier.trim();
        if ( this.identifier.length > 0 ) {
          if ( ! this.password ) {
            this.ctrl.add(this.NotificationMessage.create({
              message: this.ERROR_MSG3,
              type: this.LogLevel.ERROR
            }));

            return;
          }

          try {
            var logedInUser = await this.auth.login(X, this.identifier, this.password);
            if ( ! logedInUser ) return;

            if ( this.token_ ) {
              logedInUser.signUpToken = this.token_;
              try {
                var updatedUser = await this.dao_.put(logedInUser);
                this.subject.user = updatedUser;
                this.subject.realUser = updatedUser;
                await this.nextStep();
              } catch ( err ) {
                this.ctrl.add(this.NotificationMessage.create({
                  err: err.data,
                  message: this.ERROR_MSG,
                  type: this.LogLevel.ERROR
                }));
              }
            } else {
              this.subject.user = logedInUser;
              this.subject.realUser = logedInUser;
              await this.nextStep();
            }
          } catch (err) {
              if ( this.DuplicateEmailException.isInstance(err.data.exception) ) {
                this.usernameRequired = true;
              }
              this.ctrl.add(this.NotificationMessage.create({
                err: err.data,
                message: this.ERROR_MSG,
                type: this.LogLevel.ERROR
              }));
          };
        } else {
          this.ctrl.add(this.NotificationMessage.create({
            message: this.ERROR_MSG2,
            type: this.LogLevel.ERROR
          }));
        }
      }
    }
  ]
});
