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
        String phoneNumber = "";
        SMSStatus status;
        DAO smsDao = (DAO)x.get("smsMessageDAO");
        
        // check if twilio credentials are set
        if ( SafetyUtil.isEmpty(twilioConfig.getAccountSid()) || SafetyUtil.isEmpty(twilioConfig.getAuthToken()) ) {
          Loggers.logger(x, this).error("Twilio accountSid or authToken were not found. Message was not sent.");
          return smsMessage;
        }

        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());

        // check if phone number exists
        if ( ! SafetyUtil.isEmpty(smsMessage.getPhoneNumber()) ) {
          phoneNumber = smsMessage.getPhoneNumber();
        } else {
          status = SMSStatus.FAILED;
          status.setErrorMessage("Phone number not found, failed to send SMS.");
          smsMessage.setStatus(status);
          return (SMSMessage) smsDao.put(smsMessage);
        }

        // check if message exists
        if ( ! SafetyUtil.isEmpty(smsMessage.getMessage()) ) {
          try {
            Message.creator(new PhoneNumber(phoneNumber), new PhoneNumber(twilioConfig.getPhoneNumber()),
              smsMessage.getMessage()).create();
            smsMessage.setStatus(SMSStatus.SENT);
            return (SMSMessage) smsDao.put(smsMessage);
          } catch (Exception e) {
            status = SMSStatus.FAILED;
            status.setErrorMessage(e.toString());
            return (SMSMessage) smsDao.put(smsMessage);
          }
        } else {
          status = SMSStatus.FAILED;
          status.setErrorMessage("No message found, failed to send SMS.");
          smsMessage.setStatus(status);
          return (SMSMessage) smsDao.put(smsMessage);
        }
      `
    }
  ]

});
