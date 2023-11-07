/**
 * @license
 * Copyright 2021 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.auth',
  name: 'CreatedAwareMixin',

  implements: [
    'foam.nanos.auth.CreatedAware'
  ],

  properties: [
    {
      class: 'DateTime',
      name: 'created',
      section: 'mainBodySection',
      documentation: 'Creation date',
      visibility: 'HIDDEN',
      // view: function(_, x) {
      //   if ( x?.data?.created ) return;
      //   return ctrl.E().start()
      //   .add(`${x.data.created.toDateString()} ${x.data.created.toLocaleTimeString()}`)
      //   .end()
      // },
      view: function(_, x) {
        return ctrl.E().start().add(x.data.slot(created => {
          if ( ! created ) return;
          return ctrl.E().add(`${created.toDateString()} ${created.toLocaleTimeString()}`)
        }))
        .end()
      },
      // visibility: function() {
      //   return ctrl.controllerMode == foam.u2.ControllerMode.CREATE ?
      //     foam.u2.DisplayMode.HIDDEN :
      //     foam.u2.DisplayMode.RO;
      // }
    }
  ]
});
