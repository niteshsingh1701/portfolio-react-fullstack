// EMAIL NOTIFICATION DISABLED — commented out to avoid production impact for now.
// To re-enable, uncomment this file and restore the require/call in
// server/controllers/contactController.js.
//
// const { Resend } = require("resend");
//
// const RESEND_API_KEY = process.env.RESEND_API_KEY;
// const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL;
// const FROM =
//   process.env.CONTACT_NOTIFY_FROM ||
//   "Nitesh Singh Portfolio <onboarding@resend.dev>";
//
// let warningLogged = false;
//
// // Fire-and-forget email notification for new contact form messages.
// // If Resend is not configured, this is a safe no-op so the contact flow
// // keeps working exactly as before.
// const sendContactNotification = async ({ name, email, message }) => {
//   if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
//     if (!warningLogged) {
//       console.warn(
//         "Contact email notification skipped — set RESEND_API_KEY and CONTACT_NOTIFY_EMAIL in server/.env",
//       );
//       warningLogged = true;
//     }
//     return;
//   }
//
//   const resend = new Resend(RESEND_API_KEY);
//   const timestamp = new Date().toLocaleString();
//
//   const { data, error } = await resend.emails.send({
//     from: FROM,
//     to: NOTIFY_EMAIL,
//     replyTo: email,
//     subject: `New portfolio message from ${name}`,
//     text: [
//       `Name: ${name}`,
//       `Email: ${email}`,
//       "",
//       "Message:",
//       message,
//       "",
//       `Sent: ${timestamp}`,
//     ].join("\n"),
//     html: `
//       <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #faf9f6; color: #1c1c1c; border-radius: 8px;">
//         <h2 style="margin: 0 0 16px; font-size: 20px;">New portfolio message</h2>
//         <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//           <tr>
//             <td style="padding: 8px 0; font-weight: bold; width: 90px; color: #8d8d8d;">Name</td>
//             <td style="padding: 8px 0;">${name}</td>
//           </tr>
//           <tr>
//             <td style="padding: 8px 0; font-weight: bold; width: 90px; color: #8d8d8d;">Email</td>
//             <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #b45b63;">${email}</a></td>
//           </tr>
//           <tr>
//             <td style="padding: 8px 0; font-weight: bold; width: 90px; color: #8d8d8d;">Sent</td>
//             <td style="padding: 8px 0;">${timestamp}</td>
//           </tr>
//         </table>
//         <div style="margin-top: 16px; padding: 16px; border-left: 3px solid #b45b63; background: #ffffff; white-space: pre-wrap;">${message}</div>
//         <p style="margin-top: 20px; font-size: 12px; color: #8d8d8d;">Reply directly to this email to reach the sender.</p>
//       </div>
//     `,
//   });
//
//   if (error) {
//     throw new Error(error.message || "Resend email send failed");
//   }
//   return data;
// };
//
// module.exports = { sendContactNotification };
