import { EmailTemplate } from '@/components/elem/EmailTemplate/EmailTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Portfolio@ljrdev.com',
      to: [process.env.CONTACT_FORM_TO || ''],
      subject: process.env.CONTACT_FORM_SUBJECT || 'New Form Message',
      text: message,
      react: EmailTemplate({ name, email, phone, message }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 400 });
  }
}

