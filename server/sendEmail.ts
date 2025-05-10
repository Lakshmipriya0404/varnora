import { Resend } from "resend";
import { ContactFormEmail } from "@/components/ui/contact-form-email";
import ReactDOMServer from "react-dom/server";
import React from "react";
import type { Request, Response } from "express";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req:Request, res:Response) {
  const { senderEmail, message, subject } = req.body;

  // simple server-side validation
  if (typeof senderEmail !== "string") {
    return {
      error: "Invalid sender email",
    };
  }
  if (typeof message !== "string") {
    return {
      error: "Invalid message",
    };
  }
  if (typeof subject !== "string") {
    return {
      error: "Invalid message",
    };
  }
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "varnoraworks@gmail.com",
      subject: subject,
      replyTo: senderEmail,
      html: ReactDOMServer.renderToStaticMarkup(
        React.createElement(ContactFormEmail, {
          message,
          senderEmail,
        })
      ),
    });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Email sending failed." });
  }
}