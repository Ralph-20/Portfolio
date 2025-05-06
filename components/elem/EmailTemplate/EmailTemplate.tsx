import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div>
    <h2>Submitted by: {name}, </h2>
    <br />
    <p>Reason for contact: {message}</p>
    <br />
    <p> Phone number: {phone},</p>
    <p> Email: {email},</p>
  </div>
);
