import { EmailTemplate } from '../../components/elem/EmailTemplate/EmailTemplate';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, phone, message } = req.body;
    const data = await resend.emails.send({
      // TODO: change this
      //   from: 'LJR DEV <lucasjamesralph@gmail.com>',
      from: 'onboarding@resend.dev', // valid for dev/testing
      to: ['lucasjamesralph@gmail.com'],
      subject: 'New Message from Portfolio Website',
      text: message,
      react: EmailTemplate({ name, email, phone, message }),
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(400).json(error);
  }
};

