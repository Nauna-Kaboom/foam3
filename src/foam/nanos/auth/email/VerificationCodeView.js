/**
 * @license
 * Copyright 2022 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

 foam.CLASS({
  package: 'foam.nanos.auth.email',
  name: 'VerificationCodeView',
  extends: 'foam.u2.View',

  documentation: 'view to enter email verification code',

  imports: [
    'pushMenu',
    'theme'
  ],

  requires: [
    'foam.u2.detail.SectionView'
  ],

  css: `
  ^ {
    background-color: #fff;
    max-width: 450px;
    width: 100vw;
    overflow-y: auto;
    display: flex;
    border-radius: $inputBorderRadius;
    box-shadow: inset 0px -2px 4px 1px black;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
  }
    ^flex {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      gap: 3rem;
      padding-top: 5rem;
    }
    ^sectionView{
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 55px;
    }
    ^title {
        text-align:center;
    }
    ^subTitle {
      width: 75%;
      padding: 0 15px;
      text-align: center;
      margin: 0;
    }
    ^ .foam-u2-detail-SectionView .foam-u2-detail-SectionView-actionDiv {
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
    }
    ^ .foam-u2-detail-SectionView .foam-u2-detail-SectionView-actionDiv .foam-u2-layout-Cols {
      flex-direction: column;
    }
    ^ .foam-u2-dialog-ApplicationPopup-bodyWrapper .subTitle {
      text-align: center;
    }
    ^ .foam-u2-dialog-ApplicationPopup-bodyWrapper .foam-u2-detail-SectionView-verificationCodeSection {
      width: fit-content;
      align-self: center
    }
    ^ .foam-u2-ActionView + .foam-u2-ActionView {
      margin-left: 0px;
    }
    ^ .foam-u2-PropertyBorder-errorText {
        max-width: 29rem;
        min-height: 3rem;
    }
   /* mobile */
   @media (min-width: /*%DISPLAYWIDTH.MD%*/ 786px ) {
  }
  @media (min-width: /*%DISPLAYWIDTH.LG%*/ 960px ) {
  }
  `,


  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.nanos.auth.email.EmailVerificationCode',
      name: 'data'
    },
    {
      class: 'Boolean',
      name: 'showBack'
    }
  ],

  methods: [
    function render() {
      var spl = this.data.INSTRUCTION.split('\n');
      var ee = this.E();
      this
        .addClass(this.myClass(), this.myClass('flex')).style({ 'border': `2px ridge ${(this.theme.primary4 || '#edd50b')}`})
        .start('h1').addClass(this.myClass('title')).add(this.data.TITLE).end()
        .add(this.slot( (data)  => {
          return ee.style({ 'display': 'contents'})
            .forEach( spl, i => {
              return ee.start('p').addClass(this.myClass('subTitle')).add(i).end();
            });
        }))
        .start(this.SectionView, { data$: this.data$, sectionName: 'verificationCodeSection', showTitle: false })
        .addClass(this.myClass('sectionView')).end()
        .startContext({ data: this.data })
          .addClass(this.myClass('flex'))
          .start().show(this.showBack$)
            .add(this.BACK)
          .end()
        .endContext();
    }
  ],

  actions: [
    {
      name: 'back',
      label: 'Back to Sign In',
      buttonStyle: 'LINK',
      code: function(X) {
        X.data.cancel();
        X.pushMenu('sign-in', true);
      }
    }
  ]
});
