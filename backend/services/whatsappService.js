import twilio from "twilio";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsapp(to, message) {
  try {
    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: `whatsapp:${to}`, // Must include country code
      body: message,
    });
    console.log("Whatsapp sent to", to, result.sid);
  } catch (error) {
    console.error("Whatsapp sent failed:", error.message);
  }
}

export function scheduleReminder(to, name) {
  const message = `היי ${name}, כאן צוות V-Me\n
  עדיין לא קבעת שיחת היכרות? אפשר לבחור מועד כאן:\n
  https://calendly.com/vme-intro/5min`;

  // Schedule job3 hours from now
  // const date = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const date = new Date(Date.now() + 20 * 1000);
  const cronExpression = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
    date.getMonth() + 1
  } *`;
  cron.schedule(cronExpression, () => {
    sendWhatsapp(to, message);
  });

  console.log(`Reminder schedule for ${to} at ${date.toLocaleString()}`);
}
