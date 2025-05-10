import React from "react";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  message,
  senderEmail,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#f3f4f6",
        color: "#000",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid #ccc",
        }}
      >
        <h2>You received the following message from the contact form:</h2>
        <p>{message}</p>
        <hr />
        <p>The sender's email is: {senderEmail}</p>
      </div>
    </div>
  );
};
