import vmeLogo from "../assets/me_logo.webp";
import "../styles/founderMessage.css";

export default function FounderMessageSection() {
  return (
    <section style={styles.section} className="founder-message-section">
      <div style={styles.container} className="founder-container">
        {/* Logo Section */}
        <div style={styles.logoSection} className="founder-logo-section">
        <img 
            src={vmeLogo} 
            alt="Vme Logo M" 
            style={styles.logoM} 
            className="founder-logo-m"
          />
        
         
        </div>

        {/* Profile Image */}
        
        {/* Main Content */}
        <div style={styles.contentContainer} className="founder-content">
          {/* Title */}
          <h2 style={styles.title} className="founder-title">
            מסר אישי ממני, המייסדת..
          </h2>

          {/* First Paragraph - Highlighted */}
          <div style={styles.highlightedText} className="founder-highlighted-text">
            <p style={styles.paragraphHighlighted}>
              בפנים, כולנו רוצים את אותו הדבר: שייכות ואהבה.
            </p>
            <p style={styles.paragraphHighlighted}>
              למצוא אדם שנרגיש איתו חופשיים להיות עצמנו. בלי מסכות, בלי משחקים
            </p>
            <p style={styles.paragraphHighlighted}>
              מישהו שנרגיש איתו שייכות, בטחון ושמחה, מישהו שנוכל להיות איתו בדיוק כמו שאנחנו
            </p>
          </div>

          {/* Remaining Paragraphs */}
          <div style={styles.bodyText} className="founder-body-text">
            <p style={styles.paragraph}>
              אך אנחנו חיים בתקופה מורכבת מציאות שבה יותר ויותר אנשים חווים בדידות.
            </p>
            <p style={styles.paragraph}>
              לצד הכמיהה לאהבה ולזוגיות עולה גם חוסר בטחון. אנחנו נזהרים, חוששים להיפתח, מתקשים לתת אמון במי שמולנו.
            </p>
            <p style={styles.paragraph}>
              העולם המודרני והמרוץ הטכנולוגי רק מחזקים את התחושה הזו וגורמים לנו לסגור את הלב במקום לפתוח אותו.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== Styles =====
const styles = {
  section: {
    position: "relative",
    padding: "4rem 1.5rem",
    direction: "rtl",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  logoM: {
    height: "300px",
    width: "auto",
    objectFit: "contain",
  },
  logoE: {
    height: "300px",
    width: "auto",
    objectFit: "contain",
  },
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  profileImageWrapper: {
    position: "relative",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid #ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    textAlign: "right",
  },
  title: {
    margin: "0 0 1rem 0",
    fontSize: "44px",
    fontWeight: "700",
    color: "#C22D8B",
    textAlign: "center",
    lineHeight: 1.4,
  },
  highlightedText: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "0.5rem",
  },
  paragraphHighlighted: {
    margin: 0,
    fontSize: "35px",
    fontWeight: "500",
    color: "#C22D8B",
    lineHeight: 1.8,
    textAlign: "right",
  },
  bodyText: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  paragraph: {
    margin: 0,
    fontSize: "35px",
    fontWeight: "400",
    color: "#D81B60",
    lineHeight: 1.8,
    textAlign: "right",
  },
};

