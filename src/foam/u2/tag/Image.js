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
  package: 'foam.u2.tag',
  name: 'Image',
  extends: 'foam.u2.View',
  mixins: ['foam.u2.view.NavButtonMixin'],

  requires: [
    'foam.net.HTTPRequest',
    'foam.u2.HTMLView'
  ],

  css: `
    ^ .foam-u2-HTMLView {
      padding: 0;
    }
    ^imgHov:hover {
      background: $NavButtonBackgroundColor$hover;
      border-radius: $inputBorderRadius;
      box-shadow: 1px 1px 1px 0px #b1a5a5;
    }
    ^imgHov {
      cursor: pointer;
    }
  `,

  constants: {
    CACHE: {}
  },

  properties: [
    {
      class: 'GlyphProperty',
      name: 'glyph'
    },
    {
      name: 'displayWidth',
      attribute: true
    },
    {
      name: 'displayHeight',
      attribute: true
    },
    ['alpha', 1.0],
    {
      class: 'String',
      name: 'role'
    },
    {
      class: 'Boolean',
      name: 'embedSVG'
    },
    {
      class: 'Function',
      name: 'onCk'
    },
    {
      class: 'Boolean',
      name: 'isOnClick',
      expression: function(onCk) {
        return !! onCk;
      }
    }
  ],

  methods: [
    function requestWithCache(data) {
      if ( ! this.CACHE[data] ) {
        this.CACHE[data] = new Promise(resolve => {
          this.HTTPRequest.create({method: 'GET', path: data}).send().then(resp => {
            resp.resp.text().then(t => resolve(t));
          } );
        });
      }

      return this.CACHE[data];
    },

    function render() {
      this
        .addClass(this.myClass())
        .add(this.slot(function(data, glyph, displayWidth, displayHeight, alpha) {
          var e = this.E().enableClass(this.myClass('imgHov'), this.isOnClick$);
          if ( glyph ) {
            var indicator = glyph.clone(this).expandSVG();
            return e.start(this.HTMLView, { data: indicator })
              .on('click', () => this.onCk())
              .attrs({ role: this.role })
              .end();
          }

          if ( this.embedSVG && data?.endsWith('svg') ) {
            this.requestWithCache(data).then(data => {
              e.start(this.HTMLView, { data: data })
                .on('click', () => this.onCk())
                .attrs({ role: this.role })
              .end();
            });

            return e;
          }
          if ( ! data) return null;
          return e.start('img')
              .on('click', () => this.onCk())
              .attrs({ src: data, role: this.role })
              .style({
                height:  displayHeight,
                width:   displayWidth,
                opacity: alpha
              })
            .end();
        }));
    }
  ]
});


foam.SCRIPT({
  package: 'foam.u2.tag',
  name: 'ImageScript',
  requires: [
    'foam.u2.tag.Image',
    'foam.u2.U2ContextScript'
  ],
  flags: ['web'],
  code: function() {
    foam.__context__.registerElement(foam.u2.tag.Image);
  }
});
