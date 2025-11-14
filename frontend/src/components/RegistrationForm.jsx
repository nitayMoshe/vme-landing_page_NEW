import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/registrationFormSection.css";
import logo_m from "../assets/images/Vme_logo-M.png";

export default function RegistrationForm({ referrer }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmitting(true);

    try {
      const formData = { ...data, referrer };
      const response = await axios.post(
        "https://vme-landing-page.onrender.com/api/submit",
        formData
      );
      console.log("Response:", response.data);
      navigate("/thank-you");
    } catch (error) {
      console.error("Axios error:", error.response?.data || error.message);

      // Check if the backend sent a specific error message
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        alert("שגיאת רשת. אנא בדקו את חיבור האינטרנט ונסו שנית");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("אירעה שגיאה לא צפויה. אנא נסו שוב מאוחר יותר.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="registration">
      <div className="intro">
        <p>סקרנתם אותי! איך מתקדמים?</p>
        <h2>כאן תעשו את הצעד הבא לעבר אהבה</h2>
        <p>מלאו פרטים להרשמה</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-fields">
          <input
            {...register("firstname", { required: "שדה חובה" })}
            placeholder="שם פרטי"
          />
          {errors.firstname && (
            <p className="error-message">{errors.firstname.message}</p>
          )}

          <input
            {...register("lastname", { required: "שדה חובה" })}
            placeholder="שם משפחה"
          />
          {errors.lastname && (
            <p className="error-message">{errors.lastname.message}</p>
          )}

          <select {...register("sex", { required: "בחר אפשרות" })}>
            <option value="">מין</option>
            <option value="man">גבר</option>
            <option value="woman">אישה</option>
          </select>
          {errors.sex && <p className="error-message">{errors.sex.message}</p>}

          <input
            {...register("age", {
              required: "שדה חובה",
              min: { value: 18, message: "השירות מיועד לבני 18 ומעלה" },
            })}
            placeholder="גיל"
            type="number"
          />
          {errors.age && <p className="error-message">{errors.age.message}</p>}

          <input
            {...register("city", { required: "שדה חובה" })}
            placeholder="עיר"
          />
          {errors.city && (
            <p className="error-message">{errors.city.message}</p>
          )}

          <input
            {...register("phone", { required: "שדה חובה" })}
            placeholder="טלפון"
            type="tel"
          />
          {errors.phone && (
            <p className="error-message">{errors.phone.message}</p>
          )}

          <input
            {...register("email", {
              required: "שדה חובה",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: "כתובת מייל לא חוקית",
              },
            })}
            placeholder='דוא"ל'
            type="email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            {...register("confirmEmail", {
              required: "שדה חובה",
              validate: (value) =>
                value === getValues("email") || "כתובות המייל אינן תואמות",
            })}
            placeholder='אישור דוא"ל'
            type="email"
          />
          {errors.confirmEmail && (
            <p className="error-message">{errors.confirmEmail.message}</p>
          )}
        </div>

        {/* Privacy Policy */}
        <div className="checkboxes">
          <label
            style={{ display: "block", marginTop: "1rem", direction: "rtl" }}
          >
            <input
              type="checkbox"
              {...register("privacyPolicy", {
                required: "יש לאשר את מדיניות הפרטיות",
              })}
            />
            אני מאשר/ת את{" "}
            <a
              href="https://vme-landingpage-videos.s3.eu-north-1.amazonaws.com/files/privacyPolicy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              מדיניות הפרטיות
            </a>
          </label>
          {errors.privacyPolicy && (
            <p className="error-message">{errors.privacyPolicy.message}</p>
          )}

          {/* Terms of Use */}
          <label
            style={{ display: "block", marginTop: "0.6rem", direction: "rtl" }}
          >
            <input
              type="checkbox"
              {...register("termsOfUse", {
                required: "יש לאשר את תנאי השימוש",
              })}
            />
            אני מסכים/ה ל{" "}
            <a
              href="https://vme-landingpage-videos.s3.eu-north-1.amazonaws.com/files/condotions.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
            >
              תנאי השימוש
            </a>
          </label>
          {errors.termsOfUse && (
            <p className="error-message">{errors.termsOfUse.message}</p>
          )}

          {/* Consent to notifications */}
          <label
            style={{ display: "block", marginTop: "0.6rem", direction: "rtl" }}
          >
            <input
              type="checkbox"
              {...register("notifications", {
                required: "לא ניתן להתקדם ללא אישור הודעות הדיוור",
              })}
            />
            אני מאשר לקבל עדכונים והטבות הקשורות לשירות, בזמנים סבירים ובאמצעים
            מקובלים (כמו מייל, הודעה או וואטסאפ), בהתאם למדיניות הפרטיות.
          </label>
          {errors.notifications && (
            <p className="error-message">{errors.notifications.message}</p>
          )}
        </div>

        {errors.consent && <p>{errors.consent.message}</p>}

        <button className="submitButton" type="submit" disabled={submitting}>
          <span>רוצה להתקדם!</span>
        </button>
      </form>
      <img src={logo_m} alt="Logo M" />

      <p className="support-text">
        נתקלתם בבעיה? מוזמנים לפנות למייל{" "}
        <a href="mailto:eran@vme-value.com" className="support-link">
          eran@vme-value.com
        </a>
      </p>
    </section>
  );
}
