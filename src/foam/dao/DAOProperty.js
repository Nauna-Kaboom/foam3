/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'DAOProperty',
  extends: 'FObjectProperty',

  documentation: 'Property for storing a reference to a DAO.',

  requires: [ 'foam.dao.ProxyDAO' ],

  properties: [
    {
      name: 'view',
      value: { class: 'foam.comics.InlineBrowserView' }
    },
    {
      name: 'createVisibility',
      value: 'HIDDEN'
    },
    ['transient', true],
    ['of', 'foam.dao.DAO'],
    {
      name: 'javaInfoType',
      flags: ['java'],
      value: 'foam.core.AbstractDAOPropertyPropertyInfo'
    },
    {
      name: 'adapt',
      value: function(_, o, prop) {
        if ( ! o ) return;
        if ( foam.String.isInstance(o) && this.__subContext__ ) return this.__subContext__[o];
        if ( o === null ) return v;
        var type = foam.lookup(prop.type);
        return type.isInstance(o) ?
          o :
          ( o.class ?
            this.__context__.lookup(o.class) :
            type ).create(o, this.__subContext__);
      }
    }
  ],

  methods: [
    function installInProto(proto) {
      this.SUPER(proto);

      var name = this.name;
      var prop = this;

      Object.defineProperty(proto, name + '$proxy', {
        get: function daoProxyGetter() {
          var proxy = prop.ProxyDAO.create({delegate: this[name]}, this[name]);
          this[name + '$proxy'] = proxy;

          this.sub('propertyChange', name, function(_, __, ___, s) {
            proxy.delegate = s.get();
          });

          return proxy;
        },
        configurable: true
      });
    }
  ]
});
