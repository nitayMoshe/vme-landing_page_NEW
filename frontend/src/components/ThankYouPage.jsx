import { Link } from "react-router-dom";
import logo_heart from "../assets/Vme_logo-heart.png";
import "../styles/thankyou.css";

export default function ThankYouPage() {
  return (
    <section>
      <img src={logo_heart} alt="Logo with heart" className="logo" />
      <h2>מדהים!</h2>
      <h2 className="heading-wide">בחרתם לקחת צעד של אמון למען זוגיות ואהבה</h2>
      <div>
        <p>
          המיזם בשלב זה עדיין לא חשוף לקהל הרחב. אנו בוחרים את המשתתפים שיזכו
          להיות המתנסים הראשונים ולהיות חלק מהמהלך החשוב הזה. לאחר הפיילוט נפתח
          את המיזם לכלל מחפשי זוגיות שרוצים להצטרף.
        </p>
        <p>בכדי להיכנס לפיילוט יש לבצע תיאום של שיחת היכרות קצרצרה.</p>
        <p>ברגעים אלו נשלחת אליכם הודעת מייל בה תוכלו לקבוע עם הצוות שלנו</p>
      </div>
      <h2 style={{ marginTop: "40px" }}>מחכים להכיר אתכם!</h2>
      <Link to="/" className="link">חזרה לדף הראשי</Link>
    </section>
  );
}
