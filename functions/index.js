import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import twilio from "twilio";

admin.initializeApp();

const accountSid = "AC457222c16f33725dfc4df4b5594692c0";
const authToken = "3e063d338add1010d81721abab86ed6a";
const client = twilio(accountSid, authToken);

export const sendSMS = functions.https.onRequest(async (req, res) => {
  try {
    const { phoneNumber, studentName } = req.body;
    const message = `Hello, this is a notification that your child, ${studentName}, is absent today.`;

    await client.messages.create({
      body: message,
      to: phoneNumber,
      from: "+16609560283",
    });

    res.status(200).send("SMS sent successfully");
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).send("Error sending SMS");
  }
});
