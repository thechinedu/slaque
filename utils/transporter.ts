import nodemailer from "nodemailer";

const auth = {
  user: process.env.TRANSPORT_USER,
  pass: process.env.TRANSPORT_KEY,
};

const config = {
  development: {
    host: "smtp.ethereal.email",
    port: 587,
    auth,
  },
  // TODO: use streaming transport for test environment
  test: {
    host: "smtp.ethereal.email",
    port: 587,
    auth,
  },
  production: {
    service: "gmail",
    auth,
  },
};

export const transporter = nodemailer.createTransport(
  config[process.env.NODE_ENV]
);
