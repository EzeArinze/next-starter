'use server';

import { resend } from '@/lib/resend';

export async function EmailSender({
  to,
  subject,
  from = 'onboarding@resend.dev',
  template,
}: EmailSenderOptions): Promise<ResponseReturnType> {
  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      react: template,
    });

    if (error) {
      return { status: 'error', error: error.message };
    }

    return { status: 'success', message: 'Email sent successfully' };
  } catch {
    return { status: 'error', error: 'Internal server error' };
  }
}
