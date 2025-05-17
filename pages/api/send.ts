import { EmailTemplate } from '../../components/elem/EmailTemplate/EmailTemplate';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, phone, message } = req.body;
    const data = await resend.emails.send({
      from: 'Portfolio@ljrdev.com',
      to: [process.env.CONTACT_FORM_TO || ''],
      subject: process.env.CONTACT_FORM_SUBJECT || 'New Form Message',
      text: message,
      react: EmailTemplate({ name, email, phone, message }),
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(400).json(error);
  }
};

