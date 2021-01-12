// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const ourPhoneNumber = process.env.SMS_PHONE;
const client = require("twilio")(accountSid, authToken);

async function sendSms(fullphone: string, text: string): Promise<any> {
  try {
    return await client.messages.create({
      body: text,
      from: ourPhoneNumber,
      to: fullphone,
    });
  } catch (error) {
    throw error;
  }
}

export default {
  sendSms,
};
