/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'ManyToManyRelationshipDAO',
  extends: 'foam.dao.ProxyDAO',

  implements: [ { path: 'foam.mlang.Expressions', flags: ['js'], java: false } ],

  documentation: 'Adapts a DAO based on a *:* Relationship.',

  properties: [
    {
      class: 'FObjectProperty',
      of: 'foam.dao.ManyToManyRelationshipImpl',
      name: 'relationship'
    },
    {
      class: 'String',
      name: 'targetDAOKey'
    },
    {
      class: 'String',
      name: 'unauthorizedTargetDAOKey'
    }
  ],

  methods: [
    {
      name: 'put_',
      code: function(obj) {
        throw new Error("Create a junction - puts aren't accepted.");
      },
      javaCode: `
        throw new UnsupportedOperationException("Create a junction - puts aren't accepted.");
      `,
    },

    {
      name: 'remove_',
      code: async function remove_(x, obj) {
        var objId = typeof obj == 'object' ? obj.id : obj;
        return await this.relationship.junctionDAO
          .remove({ class: `${this.relationship.junctionDAO.of.id}`, sourceId: `${this.relationship.sourceId}`, targetId: objId });
      },
      javaCode: `
        Object objectId = null;
        if ( obj instanceof foam.core.FObject ) {
          objectId = ((foam.core.PropertyInfo) obj.getClassInfo().getAxiomByName("id")).f(obj);
        } else {
          objectId = obj;
        }
        var a = getRelationship().getJunctionDAO().find(foam.mlang.MLang.AND(foam.mlang.MLang.EQ(getRelationship().getSourceProperty(),getRelationship().getSourceId()), foam.mlang.MLang.EQ(getRelationship().getTargetProperty(), objectId)));
        return getRelationship().getJunctionDAO().remove(a);
      `,
    },
    {
      name: 'removeAll_',
      code: async function removeAll_() {
        return await this.relationship.junctionDAO
          .where(this.EQ(this.relationship.sourceProperty, this.relationship.sourceId))
          .select( obj => {
            this.relationship.junctionDAO.remove(obj);
          });
      },
      javaCode: `
      // .setSourceId(getId())
      // .setSourceProperty(ideas.contacts.ContactGroupPublicUserJunction.SOURCE_ID)
      // .setTargetProperty(ideas.contacts.ContactGroupPublicUserJunction.TARGET_ID)
      // .setTargetDAOKey("publicUserDAO")
      // .setUnauthorizedTargetDAOKey("")
      // .setJunctionDAOKey("contactGroupPublicUserJunctionDAO")
      // .setJunction(ideas.contacts.ContactGroupPublicUserJunction.getOwnClassInfo())

      // CALL would be: cg.getMembers(x).getDAO().removeAll(); // hold is there only one? yes...s&t unique
      var pred = foam.mlang.MLang.EQ(getRelationship().getSourceProperty(), getRelationship().getSourceId());
      var p = predicate != null ?
        foam.mlang.MLang.AND(predicate, pred ) :
        pred;
        
        getRelationship().getJunctionDAO()
          .select_(x, new foam.dao.RemoveSink(x, getRelationship().getJunctionDAO()), skip, limit, order, p);
          // .where(foam.mlang.MLang.EQ(getRelationship().getSourceProperty(), getRelationship().getSourceId() ))
          // .select(new foam.dao.AbstractSink() {
          //   @Override
          //   public void put(Object obj, Detachable sub) {
          //     getRelationship().getJunctionDAO().remove(obj);
          //   }
          // });
      `,
    },
    {
      name: 'find_',
      code: async function find_(x, id) {
        var r = await this.relationship.junctionDAO.
          find(this.AND(
            this.EQ(this.relationship.sourceProperty, this.relationship.sourceId),
            this.EQ(this.relationship.targetProperty, id)
          ));
        if ( r ) return this.delegate.find(id);
      },
      javaCode: `
        foam.mlang.sink.Map junction = (foam.mlang.sink.Map) getRelationship().getJunctionDAO()
          .where(foam.mlang.MLang.EQ(getRelationship().getSourceProperty(), getRelationship().getSourceId()))
          .select(foam.mlang.MLang.MAP(getRelationship().getTargetProperty(), new foam.dao.ArraySink()));

        foam.nanos.auth.Subject subject = (foam.nanos.auth.Subject) getX().get("subject");
        if ( subject != null && subject.getUser() != null && subject.getUser().getId() == foam.nanos.auth.User.SYSTEM_USER_ID && getUnauthorizedTargetDAOKey().length() != 0 ) {
          setDelegate(((foam.dao.DAO) getX().get(getUnauthorizedTargetDAOKey())).inX(getX()));
        }

        return getDelegate()
          .where(foam.mlang.MLang.IN(getPrimaryKey(), ((foam.dao.ArraySink) (junction.getDelegate())).getArray().toArray()))
          .find_(x, id);
      `,
    },
    {
      name: 'select_',
      code: async function select_(x, sink, skip, limit, order, predicate) {
        var self = this;

        return await this.relationship.junctionDAO.
          where(self.EQ(this.relationship.sourceProperty, this.relationship.sourceId)).
          select(self.MAP(this.relationship.targetProperty)).then(async function(map) {
            return await self.delegate.select_(x, sink, skip, limit, order, self.AND(
              predicate || self.TRUE,
              self.IN(self.of.ID, map.delegate.array)));
          });
      },
      javaCode: `
        foam.mlang.sink.Map junction = (foam.mlang.sink.Map) getRelationship().getJunctionDAO()
          .where(foam.mlang.MLang.EQ(getRelationship().getSourceProperty(), getRelationship().getSourceId()))
          .select(foam.mlang.MLang.MAP(getRelationship().getTargetProperty(), new foam.dao.ArraySink()));

        foam.nanos.auth.Subject subject = (foam.nanos.auth.Subject) getX().get("subject");
        if ( subject != null && subject.getUser() != null && subject.getUser().getId() == foam.nanos.auth.User.SYSTEM_USER_ID && getUnauthorizedTargetDAOKey().length() != 0 ) {
          setDelegate(((foam.dao.DAO) getX().get(getUnauthorizedTargetDAOKey())).inX(getX()));
        }

        return getDelegate()
          .where(foam.mlang.MLang.IN(getPrimaryKey(), ((foam.dao.ArraySink) (junction.getDelegate())).getArray().toArray()))
          .select_(x, sink, skip, limit, order, predicate);
      `,
      swiftCode: `
        let pred = __context__.create(foam_mlang_predicate_Eq.self, args: [
          "arg1": relationship?.sourceProperty,
          "arg2": relationship?.sourceId
        ])

        let map = __context__.create(foam_mlang_sink_Map.self, args: [
          "arg1": relationship?.targetProperty,
          "delegate": __context__.create(foam_dao_ArraySink.self)
        ])

        let junction: foam_mlang_sink_Map = try relationship!.junctionDAO!.\`where\`(pred)!.select(map!) as! foam_mlang_sink_Map
        return try delegate.\`where\`(__context__.create(foam_mlang_predicate_In.self, args: [
          "arg1": primaryKey,
          "arg2": __context__.create(foam_mlang_ArrayConstant.self, args: [
            "value": (junction.delegate as? foam_dao_ArraySink)?.array
          ])
        ]))!.select_(x, sink, skip, limit, order, predicate)
      `
    }
  ]
});
