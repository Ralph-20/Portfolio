import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  phone,
  message,
}: EmailTemplateProps): React.JSX.Element => (
  <div>
    <h2>Submitted by: {name}, </h2>
    <br />
    <p>Reason for contact: {message}</p>
    <br />
    <p> Phone number: {phone},</p>
    <p> Email: {email},</p>
  </div>
);
