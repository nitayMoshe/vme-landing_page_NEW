import express from "express";
import axios from "axios";
import { sendConfirmationEmail } from "../services/emailService.js";
import User from "../schemas/User.js";

const URL = "https://api.hubapi.com/crm/v3/objects/contacts";
const router = express.Router();

router.post("/submit", async (req, res) => {
  const { firstname, lastname, sex, age, city, phone, email, referrer } =
    req.body;

  // 1. --- Validation ---
  if (!firstname || !lastname || !sex || !age || !city || !phone || !email) {
    return res.status(400).json({ message: "נא למלא את כל השדות" });
  }

  if (!referrer) {
    return res.status(400).json({
      message:
        "ההרשמה חייבת להתבצע דרך קישור הפנייה. אם הגעת לכאן ללא קישור, אנא פנה לצוות V-me",
    });
  }

  // 2. --- Check for Mongo duplicate ---
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "נראה שנרשמת כבר עם כתובת מייל זו. אין צורך להירשם שוב :)",
      });
    }
  } catch (error) {
    console.error("Database error:", error.message);
    return res.status(500).json({
      message: "אירעה שגיאה בשרת... אנא נסו שוב בעוד מספר דקות.",
    });
  }

  // 3. --- All checks passed, proceed to create user ---
  const user = new User({
    firstname,
    lastname,
    sex,
    age,
    city,
    phone,
    email,
    referrer,
  });

  // 4. --- Try the external services (HubSpot and email) ---
  try {
    // HubSpot
    const payload = {
      properties: {
        firstname,
        lastname,
        sex,
        age: age,
        city,
        phone,
        email,
        referrer,
      },
    };

    const hubspotResponse = await axios.post(URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Send confirmation email
    await sendConfirmationEmail(email, firstname);

    // All external services succeeded, save to MongoDB
    await user.save();

    // Success response
    res.status(200).json({
      message: "Contact created and email sent",
      data: hubspotResponse.data,
    });
  } catch (error) {
    console.error("Submission error:", error.response?.data || error.message);

    // --- Error handling and rollback ---
    // Check for HubSpot duplicate error
    const hubSpotError = error.response?.data;
    const isHubSpotDuplicateError =
      error.response?.status === 409 ||
      hubSpotError?.message?.includes("already exists") ||
      hubSpotError?.category === "CONFLICT";

    if (isHubSpotDuplicateError) {
      return res.status(409).json({
        message: "נראה שנרשמת כבר עם כתובת מייל זו. אין צורך להירשם שוב :)",
      });
    }

    // Fallback for any other error
    res.status(500).json({
      message: "אירעה שגיאה בשרת... אנא נסו שוב בעוד מספר דקות.",
    });
  }
});

router.post("/calendly/webhook", async (req, res) => {
  try {
    const event = req.body;

    if (event.event === "invitee.created") {
      const email = event.payload?.email;
      console.log("New Calendly booking from:", email);

      // Update the user in MongoDB
      await User.findOneAndUpdate(
        { email },
        { calendlyBooked: true },
        { new: true }
      );
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("Calendly webhook error:", err);
    res.status(500).send("Server error");
  }
});
export default router;
