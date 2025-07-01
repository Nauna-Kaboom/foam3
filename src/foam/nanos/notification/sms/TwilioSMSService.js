/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.notification.sms',
  name: 'TwilioSMSService',

  implements: [
    'foam.nanos.notification.sms.SMSService'
  ],

  documentation: 'Sends SMS message through Twilio',

  javaImports: [
    'com.twilio.rest.api.v2010.account.Message',
    'com.twilio.Twilio',
    'com.twilio.type.PhoneNumber',
    'foam.dao.DAO',
    'foam.nanos.logger.Loggers',
    'foam.nanos.notification.sms.SMSMessage',
    'foam.nanos.notification.sms.SMSStatus',
    'foam.nanos.notification.sms.TwilioConfig',
    'foam.util.SafetyUtil'
  ],

  methods: [
    {
      name: 'send',
      javaCode: `
        TwilioConfig twilioConfig = (TwilioConfig) x.get("twilioConfig");
        String        phoneNumber = smsMessage.getPhoneNumber();
        String            message = smsMessage.getMessage();
        SMSMessage          clone = (SMSMessage) smsMessage.fclone();
        DAO                smsDao = (DAO)x.get("smsMessageDAO");
        
        // check if twilio credentials are set
        if ( SafetyUtil.isEmpty(twilioConfig.getAccountSid()) || SafetyUtil.isEmpty(twilioConfig.getAuthToken()) ) {
          Loggers.logger(x, this).error("Twilio accountSid or authToken were not found. Message was not sent.");
          return smsMessage;
        }

        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());

        // check if phone number or message missing
        if ( SafetyUtil.isEmpty(phoneNumber) ||
          SafetyUtil.isEmpty(message) ) {
          clone.setStatus(SMSStatus.FAILED);
          return (SMSMessage) smsDao.put(clone);
        }
        
        try {
          Message.creator(
            new PhoneNumber(phoneNumber),
            new PhoneNumber(twilioConfig.getPhoneNumber()),
            message
          ).create();
          clone.setStatus(SMSStatus.SENT);
          return (SMSMessage) smsDao.put(clone);
        } catch (Exception e) {
          Loggers.logger(x, this).error(e.getMessage(), e);
        }
        return smsMessage; // return original message if failed to send
      `
    }
  ]

});
