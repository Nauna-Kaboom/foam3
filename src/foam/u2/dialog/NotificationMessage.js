/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
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
  package: 'foam.u2.dialog',
  name: 'NotificationMessage',
  extends: 'foam.u2.View',

  documentation: `
    A notification message is a UI element to give a user immediate
    feedback. Notification messages are only visible for a few seconds.
  `,

  requires: [
    'foam.log.LogLevel',
    'foam.u2.tag.CircleIndicator'
  ],

  imports: [
    'translationService',
    'theme'
  ],

  css: `
    ^ {
      display: flex;
      justify-content: flex-end;
      position: fixed;
      /* TODO: reduce max width when notification messages are updated */
      max-width: calc(min(100vw, 48rem) - 3.2rem);
      min-width: 150px;
      max-width: 80vw;
      right: 1.6rem;
      top: 2.4rem;
      z-index: 15000;
    }
    ^inner {
      align-items: center;
      animation-name: fade;
      animation-duration: 10s;
      background-color: /*%PRIMARY5%*/ white;
      border: 1px solid /*%SECONDARY3%*/ $grey300;
      border-radius: 3px;
      box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      margin: auto;
      min-height: 64px;
      padding: 12px 16px;
      width: 100%;
      display: inline-flex;
      flex-wrap: nowrap;
    }
    @keyframes fade {
      0% { opacity: 0; transform: translateX(300px);}
      10% { opacity: 1; transform: translateX(0px);}
      80% { opacity: 1; }
      100% { opacity: 0; }
    }
    ^outer-content{
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    ^status-icon {
      width: fit-content;
      align-items: center;
      height: 32px;
      justify-content: center;
      flex: 0 0 3.2rem;
      display: content;
    }
    ^content {
      display: flex;
      flex-direction: column;
    }
    ^title{
      color: /*%DESTRUCTIVE1%*/ #858585;
    }
    ^description {
      color: /*%DESTRUCTIVE1%*/ #858585;
    }
    ^close-icon {
      display: contents;
      position: absolute;
      right: 0.5em;
      top: 0.5em;
    }
    ^close-icon > ^iconButton{
      width: 2rem;
      height: 2rem;
      padding: 0;
    }
    @media only screen and (min-width: /*%DISPLAYWIDTH.MD%*/ 768px) {
      ^ {
        max-width: calc(min(75vw, 48rem) - 3.2rem);
        min-width: calc(max(30vw, 30rem) - 3.2rem);
        right: 3.2rem;
      }
    }
    @media only screen and (max-width: 150px) {
      ^ {
        right: -1;
      }
    }
    @media only screen and (min-width: 250px) {
      ^outer-content{
        flex-wrap: nowrap;
      }
    }
  `,

  properties: [
    {
      class: 'String',
      name: 'type'
    },
    'err',
    'message',
    'description',
    'icon'
  ],

  methods: [

    function render() {
      var self = this;
      var indicator;
      if ( this.err ) {
        // Create notification message and description from
        // exception name and message.
        var ex = this.err.exception || this.err;
        if ( ex.id ) {
          if ( ex.title ) {
            this.message = ex.title;
          } else {
            this.message = ex.id.split('.').pop();
            if ( this.message.endsWith('Exception') ) {
              this.message = this.message.replace('Exception', '');
            }
            this.message = foam.String.labelize(this.message);
          }
          this.message = this.translationService.getTranslation(foam.locale, ex.title || ex.id, this.message);
        }
        if ( ex.getTranslation ) {
          this.description = ex.getTranslation();
        } else {
          this.description = this.translationService.getTranslation(foam.locale, ex.id+'.'+ex.message, ex.message);
        }
        if ( this.message == this.description ) {
          this.description = null;
        }
      }
      if ( ! this.icon ) {
        if ( this.type == this.LogLevel.ERROR ) {
          console.error('notification: ' + this.message);
          indicator = {
            size: 32,
            backgroundColor:' orange',
            borderColor: 'orange',
            icon: this.theme.glyphs.exclamation.getDataUrl({
              fill: 'white'
            })
          };
        } else if ( this.type == this.LogLevel.WARN ) {
          console.warn('notification: ' + this.message);
          indicator = {
            size: 32,
            icon: 'images/baseline-warning-yellow.svg'
          };
        } else {
          console.info('notification: ' + this.message);
          indicator = {
            size: 32,
            backgroundColor: 'black',
            borderColor: 'black',
            icon: this.theme.glyphs.checkmark.getDataUrl({
              fill: 'white'
            })
          };
        }
      } else {
        indicator = {
          size: 32,
          icon$: this.icon$
        };
      }
      this
        .addClass(this.myClass())
        .start().addClass(this.myClass('inner'))
          .start()
            .addClass(this.myClass('outer-content'))
            .start()
              .addClass(this.myClass('status-icon'))
              .tag(this.CircleIndicator, indicator)
            .end()
            .start().addClass(this.myClass('content'))
              .start().addClass('h600', this.myClass('title'))
                .callIfElse(foam.String.isInstance(this.message), function() {
                  this.add(self.message);
                  console.log(self.message);
                }, function() {
                  this.tag(self.message);
                  console.log(self.message);
                })
              .end()
              .start().addClass('p', this.myClass('description'))
                .callIfElse(foam.String.isInstance(this.description), function() {
                  this.add(self.description);
                  console.log(self.description);
                }, function() {
                  this.tag(self.description);
                  console.log(self.description);
                })
              .end()
            .end()
          .end()
          .startContext({ data: this })
            .start()
                .addClass(this.myClass('close-icon'))
                .start(self.REMOVE_NOTIFICATION, { buttonStyle: 'TERTIARY', label: '' })
                .addClass(self.myClass('iconButton'))
                .end()
            .end()
          .endContext()
        .end();

      // setTimeout(() => {
      //   this.remove();
      // }, 9900);
    }
  ],

  actions: [
    {
      name: 'removeNotification',
      themeIcon: 'close',
      label: 'X',
      code: function() { this.remove(); }
    }
  ]
});
