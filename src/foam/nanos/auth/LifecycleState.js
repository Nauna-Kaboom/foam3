/**
 * @license
 * Copyright 2019 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.ENUM({
  package: 'foam.nanos.auth',
  name: 'LifecycleState',

  values: [
    {
      name: 'PENDING',
      label: 'Pending'
      // User not verified - can't log in (loginEnabled and emailVerified...)
    },
    {
      name: 'ACTIVE',
      label: 'Active'
      // User fully active in app
    },
    {
      name: 'REJECTED',
      label: 'Rejected'
    },
    {
      name: 'DELETED',
      label: 'Deleted'
    },
    {
      name: 'DISABLED',
      label: 'Disabled'
    }
  ]
});
