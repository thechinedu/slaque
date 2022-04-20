import { Logo } from "@/components/Icons";
import { CSSProperties, FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const styles = {
  container: {
    maxWidth: 500,
    margin: "0 auto",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 40,
    fill: "#49154b",
    marginRight: 16,
  },
  logoTitle: {
    fontSize: 40,
  },
  message: {
    fontSize: 16,
    lineHeight: "1.5",
  },
  otp: {
    fontSize: 24,
    textAlign: "center" as CSSProperties["textAlign"],
  },
  disclaimer: {
    fontSize: 14,
    lineHeight: "1.5",
  },
  footer: {
    borderTop: "1px solid #f5f5f5",
    paddingTop: 16,
    textAlign: "center" as CSSProperties["textAlign"],
  },
};

type ConfirmationMailProps = {
  otp: string;
};

const title = "Confirm your email address";
const message =
  "Your confirmation code is below — enter it in your browser window and we'll help you get signed in.";
const disclaimer =
  "If you didn't request this email, there's nothing to worry about — you can safely ignore it.";

export const ConfirmationMail: FC<ConfirmationMailProps> = ({ otp }) => {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        {/* TODO: Replace svg Logo with image as it has better support in email clients */}
        <Logo style={styles.logo} />
        <span style={styles.logoTitle}>slaque</span>
      </div>
      <h1>{title}</h1>
      <p style={styles.message}>{message}</p>

      <p style={styles.otp}>{otp}</p>
      <p style={styles.disclaimer}>{disclaimer}</p>

      <footer style={styles.footer}>
        <Logo style={styles.logo} />
        <p>Made by Slaque Technologies.</p>
      </footer>
    </div>
  );
};

export const ConfirmationMailText = (otp: string) =>
  `
  ${title}

  ${message}

  ${otp}

  ${disclaimer}`;

export const ConfirmationMailHTML = (otp: string) =>
  renderToStaticMarkup(<ConfirmationMail otp={otp} />);
