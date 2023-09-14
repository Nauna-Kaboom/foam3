/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'RetrievePassword',

  documentation: 'Forgot Password Resend Model',

  imports: [
    'ctrl',
    'loginView?',
    'resetPasswordService',
    'resetPasswordToken',
    'stack',
    'translationService'
  ],

  requires: [
    'foam.log.LogLevel',
    'foam.nanos.auth.DuplicateEmailException',
    'foam.nanos.auth.User',
    'foam.nanos.auth.UserNotFoundException',
    'foam.u2.dialog.NotificationMessage'
  ],

  messages: [
    { name: 'TITLE', message: 'Forgot Password?' },
    { name: 'INSTRUCTION', message: 'Enter the email you used to create your account in order to reset your password.' },
    { name: 'TOKEN_INSTRUC_TITLE',      message: 'Password Reset Instructions Sent' },
    { name: 'TOKEN_INSTRUC',            message: 'Please check your inbox to continue' },
    { name: 'CODE_INSTRUC_TITLE',       message: 'Verification code sent' },
    { name: 'CODE_INSTRUC',             message: 'Please check your inbox to reset your password' },
    { name: 'REDIRECTION_TO',           message: 'Back to Sign in' },
    { name: 'DUPLICATE_ERROR_MSG',      message: 'This account requires username' },
    { name: 'ERROR_MSG',                message: 'Issue resetting your password. Please try again' },
    { name: 'USER_NOT_FOUND_ERROR_MSG', message: 'Unabled to find user with email: '}
  ],

  sections: [
    {
      name: 'resetPasswordSection',
      help: 'Enter your account email and we will send you an email with a link to create a new one.'
    }
  ],

  properties: [
    {
      class: 'EMail',
      name: 'email',
      section: 'resetPasswordSection',
      required: true,
      createVisibility: function(usernameRequired, readOnlyIdentifier) {
       return usernameRequired ? foam.u2.DisplayMode.HIDDEN :
        readOnlyIdentifier ? foam.u2.DisplayMode.DISABLED : foam.u2.DisplayMode.RW;
      }
    },
    {
      class: 'Boolean',
      name: 'readOnlyIdentifier',
      hidden: true
    },
    {
      class: 'String',
      name: 'username',
      createVisibility: function(usernameRequired) {
       return usernameRequired ? foam.u2.DisplayMode.RW : foam.u2.DisplayMode.HIDDEN;
      },
      validateObj: function(usernameRequired, username) {
        return usernameRequired && ! username ? 'Username is required.' : '';
      },
      section: 'resetPasswordSection'
    },
    {
      class: 'Boolean',
      name: 'usernameRequired',
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'hasBackLink',
      documentation: 'checks if back link to login page is needed',
      value: true,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'showSubmitAction',
      value: true,
      hidden: true
    },
    {
      class: 'Boolean',
      name: 'resetByCode',
      value: true, // setup for false not complete : todo add reset-password template
      hidden: true
    }
  ],

  actions: [
    {
      name: 'sendEmail',
      label: 'Submit',
      buttonStyle: 'PRIMARY',
      section: 'resetPasswordSection',
      isAvailable: function(showSubmitAction) {
        return showSubmitAction
      },
      isEnabled: function(errors_) {
        return ! errors_;
      },
      code: function(X) {
        const user = this.User.create({ email: this.email, userName: this.username });
        this.resetPasswordToken.generateToken(null, user).then((_) => {
          this.ctrl.add(this.NotificationMessage.create({
            message: `${this.TOKEN_INSTRUC_TITLE}`,
            description: `${this.TOKEN_INSTRUC}`,
            type: this.LogLevel.INFO,
            transient: true
          }));
        }).catch((err) => {
          if ( this.UserNotFoundException.isInstance(err?.data?.exception) ) {
              this.ctrl.add(this.NotificationMessage.create({
                err: err.data,
                type: this.LogLevel.ERROR,
                transient: true
              }));
              return;
          }
          var msg = this.ERROR_MSG;
          if ( this.DuplicateEmailException.isInstance(err?.data?.exception) ) {
            this.usernameRequired = true;
            msg = this.DUPLICATE_ERROR_MSG;
          }
          this.ctrl.add(this.NotificationMessage.create({
            message: msg,
            type: this.LogLevel.ERROR,
            transient: true
          }));
        });
      }
    }
  ]
});
