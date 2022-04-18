import { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const styles = {
  container: {
    border: "1px solid tomato",
  },
  button: {
    border: "1px solid #333",
    padding: "8px 16px",
    background: "#333",
    color: "#fff",
  },
};

export const ConfirmationMail: FC = () => {
  return (
    <div style={styles.container}>
      The confirmation email of sama land
      <button style={styles.button}>Oh, click on shiny button</button>
    </div>
  );
};

export const ConfirmationMailText = `The confirmation email of sama land`;

export const ConfirmationMailHTML = renderToStaticMarkup(<ConfirmationMail />);
