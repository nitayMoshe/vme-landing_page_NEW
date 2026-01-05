import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendConfirmationEmail(to, firstname) {
  const msg = {
    to,
    from: {
      email: process.env.EMAIL_FROM,
      name: "V-Me Team",
    },
    subject: "תודה שנרשמת ל-Vme 🎉",
    html: `
      <div style="direction:rtl;font-family:sans-serif">
        <h2>היי ${firstname}!</h2>
        <p>
          תודה שנרשמת לגרסת הפיילוט שלנו.<br/>
          בקרוב ניצור איתך קשר ונשתף בצעד הבא.<br/><br/>
          לכל שאלה ניתן לפנות אלינו במייל:
          <a href="mailto:eran@vme-value.com">eran@vme-value.com</a><br/><br/>
          מחכים להכיר אותך<br/>
          צוות Vme ❤
        </p>
      </div>
    `,
  };

  await sgMail.send(msg);
  console.log("Confirmation email sent to", to);
}
