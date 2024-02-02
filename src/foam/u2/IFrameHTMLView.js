/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2',
  name: 'IFrameHTMLView',
  extends: 'foam.u2.View',

  css: `
    iframe {
      border: 1px solid $grey300;
      padding: 8px;
      max-width: 100%;
      box-sizing: border-box;
    }
    ^resize {
      resize: both;
    }
  `,

  properties: [
    'resizable',
    {
      class: 'Boolean',
      name: 'isLink'
    }
  ],

  methods: [    
    function render() {
      this.SUPER();
      this.addClass();
      var att = {};
      if ( this.isLink ) att = { src: this.data, target: "_parent" };
      else att = { srcdoc: this.data }
      this.start('iframe')
        .attrs(att)
        .enableClass(this.myClass('resize'), this.resizable$)
        .callIf(this.isLink, _ => {
          this.on('error', _ => console.log('error'))
        })
        .on('load', evt => this.resizeIFrame(evt))
      .end();
    },

    function resizeIFrame(evt) {
      var el = evt.target;
      if ( ! this.isLink ) {
        // reset padding and margins of iframe document body
        el.contentDocument.body.style.padding = 0;
        el.contentDocument.body.style.margin = 0;

        // set iframe dimensions according to the document / its content
        el.style.height = Math.max(
          el.contentDocument.documentElement.scrollHeight,
          el.contentDocument.body.firstElementChild.scrollHeight
        );
        el.style.width = "100%";
      }
    }
  ]
});
