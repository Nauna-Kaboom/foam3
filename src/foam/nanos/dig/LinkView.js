/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.dig',
  name: 'LinkView',
  extends: 'foam.u2.View',

  properties: [
    [ 'nodeName', 'a' ],
    {
      name: 'linkValue',
      expression: function(data) {
        return data;
      }
    }
  ],

  methods: [
    function render() {
      this.SUPER();

      this
        .attrs({href: this.data$, target:'_blank'})
        .add(this.linkValue$);
    }
  ]
});
