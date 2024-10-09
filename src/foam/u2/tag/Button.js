/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.u2.tag',
  name: 'Button',
  extends: 'foam.u2.View',

  documentation: 'Basic button view. Should be extended to add functionality',

  requires: [
    'foam.net.HTTPRequest',
    'foam.u2.ButtonSize',
    'foam.u2.ButtonStyle',
    'foam.u2.HTMLView',
    'foam.u2.LoadingSpinner',
    'foam.u2.tag.CircleIndicator'
  ],

  imports: [ 'theme?' ],

  cssTokens: [
    {
      class: 'foam.u2.ColorToken',
      name: 'buttonPrimaryColor',
      value: '/*%PRIMARY3%*/',
      disabledModifier: 90,
      onLight: '$grey50'
    },
    {
      class: 'foam.u2.ColorToken',
      name: 'buttonSecondaryColor', // /*%WARNING3%*/
      value: '$white',
      onLight: '$grey600',
      disabledModifier: -10,
      hoverModifier: -5,
      activeModifier: -15
    },
    {
      name: 'buttonSecondaryBorderColor',
      value: function(e) { return e.LIGHTEN(e.TOKEN('$buttonSecondaryColor'), -40) }
    },
    {
      name: 'buttonPrimaryLightColor',
      value: function(e) { return e.FROM_HUE(e.TOKEN('$buttonPrimaryColor'), 41, 95) }
    }
  ],
  css: `
    ^ {
      font: inherit;
      align-items: center;
      border: 1px solid transparent;
      border-radius: $inputBorderRadius;
      box-sizing: border-box;
      display: inline-flex;
      gap: 8px;
      justify-content: center;
      margin: 0;
      outline: none;
      position: relative;
      text-align: center;
    }

    ^:focus-visible {
      outline: 1px solid /*%PRIMARY4%*/ red;
    }

    ^iconAfter {
      flex-direction: row-reverse;
    }

    ^ + ^ {
      margin-left: 8px;
    }

    ^:hover:not(:disabled) {
      cursor: pointer;
    }

    ^:hover^:disabled {
      cursor: not-allowed;
    }

    ^unavailable {
      display: none;
    }

    ^ img {
      vertical-align: middle;
    }

    ^ svg {
      width: 100%;
      max-height: 100%;
      vertical-align: middle;
      fill:/*%DESTRUCTIVE1%*/ black;
    }

    ^.material-icons {
      cursor: pointer;
    }

    /* Unstyled */
    ^unstyled {
      background: none;
      border: none;
      color: inherit;
    }

    /* Primary */
    ^primary{
      background-color: /*%PRIMARY4%*/ #59c4f6;
      color: /*%SECONDARY1%*/ #ffffff;
      text-shadow: 0px 0px 2px grey;
    }
    ^primary svg {
      fill: /*%DESTRUCTIVE1%*/ black;
    }

    ^primary:hover:not(:disabled) {
      box-shadow: 0px 0px 4px 1px black;
    }

    ^primary:active:not(:disabled) {
      box-shadow: inset 0px 0px 4px 0px /*%SECONDARY2%*/ #425250;
    }

    ^primary:disabled {
      background-color: /*%WARNING5%*/ red;
      color: /*%SECONDARY5%*/ black;
    }

    /* Primary destructive */

    ^primary-destructive,^primary-destructive svg {
      background-color: /*%PRIMARY4%*/ red;
      color: /*%SECONDARY2%*/ white;
      fill: /*%SECONDARY2%*/ white;
    }

    ^primary-destructive:hover:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
    }

    ^primary-destructive:active:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
      border: 1px solid /*%SECONDARY1%*/ red;
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.06);
    }

    ^primary-destructive:disabled {
      background-color: /*%WARNING5%*/ red;
    }


    /* Secondary */

    ^secondary{
      background-color: /*%PRIMARY3%*/ #59c4f6;
      color: /*%SECONDARY1%*/ #ffffff;
      text-shadow: 0px 0px 1px black;
    }

    ^secondary svg { fill: /*%DESTRUCTIVE1%*/ black; }

    ^secondary:hover:not(:disabled):not(:active) {
      background-color: /*%PRIMARY4%*/ red;
    }

    ^secondary:hover:not(:disabled):not(:active) svg {
      fill: /*%DESTRUCTIVE1%*/ black;
    }

    ^secondary:active:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
      border-color: /*%SECONDARY2%*/ red;
    }

    ^secondary:disabled{
      background-color: /*%WARNING4%*/ gray;
      border-color: /*%WARNING4%*/ gray;
      color: /*%WARNING4%*/ grey;
    }

    ^secondary:disabled svg { fill: /*%WARNING4%*/ gray; }

    /* Secondary destructive */

    ^secondary-destructive{
      background-color: /*%PRIMARY4%*/ red;
      border: 1px solid /*%WARNING3%*/ grey;
      color: /*%DESTRUCTIVE1%*/ white;
    }

    ^secondary-destructive svg { fill: /*%PRIMARY4%*/ red; }

    ^secondary-destructive:hover:not(:disabled) {
      background-color: /*%WARNING3%*/ grey;
      border: 1px solid /*%PRIMARY4%*/ red;
    }

    ^secondary-destructive:active:not(:disabled) {
      background-color: /*%SECONDARY2%*/ white;
      border-color: /*%PRIMARY4%*/ red;
    }

    ^secondary-destructive:disabled {
      background-color: /*%SECONDARY2%*/ white;
      border-color: /*%WARNING5%*/ red;
      color: /*%WARNING5%*/ red;
    }

    ^secondary-destructive:disabled svg { fill: /*%WARNING5%*/ red; }

    /* Tertiary */

    ^tertiary{
      background: none;
      color: /*%DESTRUCTIVE1%*/ black;
    }

    ^tertiary svg { fill: /*%DESTRUCTIVE1%*/ black; }

    ^tertiary:hover:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
    }

    ^tertiary:active:not(:disabled) {
      background-color: /*%SECONDARY5%*/ white;
      color: /*%PRIMARY4%*/ red;
    }

    ^tertiary:active:not(:disabled) svg {
      fill: /*%PRIMARY4%*/ red;
    }

    ^tertiary:disabled {
      color: /*%WARNING4%*/ grey;
    }

    ^tertiary:disabled svg {
      fill: /*%WARNING4%*/ grey;
    }

    /* Tertiary destructive */

    ^tertiary-destructive{
      background-color: transparent;
      border-color: transparent;
      color: /*%PRIMARY4%*/ red;
    }

    ^tertiary-destructive svg { fill: /*%PRIMARY4%*/ red; }

    ^tertiary-destructive:hover:not(:disabled):not(:active) {
      background-color: /*%SECONDARY2%*/ white;
    }

    ^tertiary-destructive:active:not(:disabled) {
      background-color: /*%SECONDARY2%*/ white;
      color: /*%PRIMARY4%*/ red;
    }

    ^tertiary-destructive:active:not(:disabled) svg {
      fill: /*%PRIMARY4%*/ red;
    }

    ^tertiary-destructive:disabled {
      color: /*%WARNING4%*/ grey;
    }

    ^tertiary-destructive:diabled svg{
      fill: /*%WARNING4%*/ grey;
    }

    /* Link */

    ^link,^link svg {
      background: none;
      color: /*%PRIMARY2%*/ black;
      fill: /*%PRIMARY2%*/ black;
    }

    ^link:hover:not(:disabled):not(:active),^link:hover:not(:disabled):not(:active) svg {
      text-decoration: underline;
      color: /*%PRIMARY3%*/ red;
      fill: /*%PRIMARY3%*/ red;
    }

    ^link:active:not(:disabled),^link:active:not(:disabled) svg {
      color: /*%SECONDARY2%*/ red;
      fill: /*%SECONDARY2%*/ red;
      text-decoration: underline;
    }

    /* Text */

    ^text{
      background: none;
      border: 1px solid transparent;
      color: /*%PRIMARY4%*/ red;
    }

    ^text svg { fill: /*%PRIMARY4%*/ red; }

    ^text:hover:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
    }

    ^text:active:not(:disabled) {
      background-color: /*%PRIMARY4%*/ red;
      border-color: /*%PRIMARY4%*/ red;
    }

    ^text:disabled {
      color: /*%WARNING4%*/ grey;
    }

    ^text:disabled svg {
      fill: /*%WARNING4%*/ grey;
    }

    /* Sizes */

    ^small {
      padding: 6px 10px;
    }

    ^medium {
      padding: 8px 12px;
    }

    ^large {
      min-width: 100px;
      padding: 12px 12px;
    }

    ^iconOnly{
      padding: 8px;
      max-height: inherit;
    }

    ^link > .foam-u2-HTMLView{
      height: 1em;
    }

    ^svgIcon {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
    ^svgIcon svg {
      height: 100%;
    }

    /* SVGs outside themeGlyphs may have their own heights and widths,
    these ensure those are respected rather than imposing new dimensions */
    ^imgSVGIcon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ^imgSVGIcon svg {
      height: initial;
    }

    ^small svg,
    ^small img {
      width: 1.15em;
      height: 1.15em;
    }
    ^medium svg,
    ^medium img {
      width: 1.42em;
      height: 1.42em;
    }
    ^large svg,
    ^large img {
      width: 2.25em;
      height: 2.25em;
    }
    ^link svg, link img {
      width: 1em;
      height: 1em;
    }
    /* Loading indicator css */
    ^[data-loading] > :not(^loading) {
      opacity: 0;
    }
    ^loading {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ^primary ^loading svg, ^primary:disabled > ^loading svg {
      fill: /*%SECONDARY2%*/ white;
    }
    ^secondary ^loading svg, ^tertiary ^loading svg,  ^link ^loading svg,
    ^secondary:disabled ^loading svg, ^tertiary:disabled ^loading svg,  ^link:disabled ^loading svg {
      fill: /*%DESTRUCTIVE1%*/ black;
    }
    ^text > ^loading svg, ^text:disabled > ^loading svg {
      fill: /*%PRIMARY4%*/ red;
    }
  `,

  properties: [
    'name',
    {
      class: 'GlyphProperty',
      name: 'themeIcon'
    },
    {
      class: 'URL',
      name: 'icon'
    },
    {
      class: 'Boolean',
      name: 'isIconAfter'
    },
    {
      class: 'String',
      name: 'iconFontFamily'
    },
    {
      class: 'String',
      name: 'iconFontClass'
    },
    {
      class: 'String',
      name: 'iconFontName'
    },
    [ 'nodeName', 'button' ],
    {
      name: 'label'
    },
    {
      class: 'String',
      name: 'ariaLabel'
    },
    {
      class: 'Enum',
      of: 'foam.u2.ButtonStyle',
      name: 'buttonStyle',
      value: 'SECONDARY'
    },
    {
      class: 'Boolean',
      name: 'isDestructive',
      documentation: `
        When set to true, this action should be styled in a way that indicates
        that data is deleted in some way.
      `,
      factory: function() {
        return false;
      }
    },
    {
      class: 'Enum',
      of: 'foam.u2.ButtonSize',
      name: 'size',
      value: 'MEDIUM'
    },
    {
      class: 'String',
      name: 'styleClass_',
      expression: function(isDestructive, buttonStyle) {
        var s = buttonStyle.name.toLowerCase();
        return isDestructive ? s + '-destructive' : s;
      }
    },
    [ 'loading_', false]
  ],

  methods: [
    function render() {
      this.SUPER();

      this.initCls();

      this.on('click', this.click);

      this.addContent();

      this.attrs({ name: this.name || '', 'aria-label': this.ariaLabel });

      this.addClass(this.slot(function(styleClass_) {
        return this.myClass(styleClass_);
      }));

      this.addClass(this.myClass(this.size.label.toLowerCase()));
      this.enableClass(this.myClass('iconOnly'), ! (this.contents || this.label));
      this.enableClass(this.myClass('iconAfter'), this.isIconAfter$);
      this.enableClass('destructive', this.isDestructive$);
    },

    function initCls() {
      this.addClass();
    },

    async function addContent() {
      /** Add text or icon to button. **/
      var self = this;
      var icon = this.icon || this.action?.icon;
      if ( ( this.themeIcon && this.theme ) ) {
        this
          .start({ class: 'foam.u2.tag.Image', glyph: this.themeIcon, role: 'presentation' })
            .addClass(this.myClass('SVGIcon'))
          .end();
      } else if ( icon ) {
        this
          .start({ class: 'foam.u2.tag.Image', data: icon, role: 'presentation', embedSVG: true })
            .addClass(this.myClass('SVGIcon'), this.myClass('imgSVGIcon'))
          .end();
      } else if ( this.iconFontName ) {
        this.nodeName = 'i';
        this.addClass(this.action.name);
        this.addClass(this.iconFontClass); // required by font package
        this.attr(role, 'presentation')
        this.style({ 'font-family': this.iconFontFamily });
        this.add(this.iconFontName);
      }

      if ( this.label ) {
        if ( foam.String.isInstance(this.label) ) {
          if ( this.buttonStyle == 'UNSTYLED' ) {
            this.start().addClass('p').add(this.label$).end();
          } else {
            this.start().addClass('h600').add(this.label$).end();
          }
        } else if ( foam.Object.isInstance(this.label) && ! this.label.then ) {
          this.tag(this.label);
        } else {
          this.add(this.label$);
        }
      }

      this.attrs({ 'data-loading': this.loading_$ })
      this.add(this.slot(function(loading_) {
        return loading_ ? this.E().tag(self.LoadingSpinner, {size: '100%'}).addClass(self.myClass('loading')) : this.E().hide();
      }));
    }
  ],

  listeners: [
    function click(e) {
      // Implemented by subclasses
      e.preventDefault();
      e.stopPropagation();
    }
  ]

});
