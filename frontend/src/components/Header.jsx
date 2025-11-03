import "../styles/header.css";
import logoHeart from "../assets/images/Vme_logo-heart.png";

export default function Header() {
  return (
    <section className="header-wrapper">
      <div className="header-inner">
        <img src={logoHeart} alt="Vme logo" className="logo" />
        <p className="header-text">
          פלטפורמה ייחודית שעומדת לשנות את עולם ההכרויות כפי שהכרתם אותו
        </p>
      </div>
    </section>
  );
}

// TODO: Make the whole component shorter in height on all devices.
