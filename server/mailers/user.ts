import { transporter } from "@/utils";
import {
  ConfirmationMailHTML,
  ConfirmationMailText,
} from "@/server/mailer-templates/confirmation-email";

export const sendConfirmationEmail = async (email: string, otp: string) => {
  try {
    const formattedOTP = otp.replace(/.../, "$&-");
    await transporter.sendMail({
      from: "Slaque <noreply@slaque.com>",
      to: email,
      subject: `Slaque confirmation code: ${formattedOTP}`,
      text: ConfirmationMailText(formattedOTP),
      html: ConfirmationMailHTML(formattedOTP),
    });
  } catch (err) {
    // TODO: use an error logging service to log the error thrown
    // add retry logic for failed email
    console.log(err, "Failed to send email");
  }
};
