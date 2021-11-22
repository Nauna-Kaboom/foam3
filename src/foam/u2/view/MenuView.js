/**
* @license
* Copyright 2021 The FOAM Authors. All Rights Reserved.
* http://www.apache.org/licenses/LICENSE-2.0
*/

foam.CLASS({
  package: 'foam.u2.view',
  name: 'MenuView',
  extends: 'foam.u2.tag.Button',

  imports: ['dropdown?'],

  properties: [
    'menu',
    {
      name: 'label',
      factory: function() { return this.menu.label || ''; }
    },
    {
      name: 'icon',
      factory: function() { return this.menu.icon; }
    },
    {
      name: 'themeIcon',
      factory: function() { return this.menu.themeIcon; }
    }
  ],

  listeners: [
    function click(evt) {
      this.SUPER(evt);
      this.menu.launch_(this.__subContext__, this);
      if ( this.dropdown ) this.dropdown.close();
      return;
    }
  ]
});
