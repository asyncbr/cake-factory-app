import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { siteConfig } from '@/lib/site';

type ContactPayload = {
  name?: string;
  phone?: string;
  flavor?: string;
  topping?: string;
  deliveryDateTime?: string;
  observations?: string;
  locale?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function sanitize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: true } | { error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = (req.body ?? {}) as ContactPayload;
  const name = sanitize(body.name);
  const phone = sanitize(body.phone);
  const flavor = sanitize(body.flavor);
  const topping = sanitize(body.topping);
  const deliveryDateTime = sanitize(body.deliveryDateTime);
  const observations = sanitize(body.observations);
  const locale = sanitize(body.locale) || 'pt-BR';

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(flavor) ||
    !isNonEmptyString(topping) ||
    !isNonEmptyString(deliveryDateTime)
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT || '465');
  const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === 'true'
    : smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpUser || !smtpPass || !smtpFrom) {
    return res.status(500).json({ error: 'SMTP is not configured' });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const recipient = process.env.CONTACT_EMAIL_TO || siteConfig.contactEmail;
  const subject = `Novo contato do site - ${name}`;
  const text = [
    `Nome: ${name}`,
    `Telefone: ${phone}`,
    `Sabor: ${flavor}`,
    `Cobertura: ${topping}`,
    `Data e horario: ${deliveryDateTime}`,
    `Locale: ${locale}`,
    `Observacoes: ${observations || '-'}`,
  ].join('\n');

  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #2a2019; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">Novo contato do site</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Telefone:</strong> ${phone}</p>
      <p><strong>Sabor:</strong> ${flavor}</p>
      <p><strong>Cobertura:</strong> ${topping}</p>
      <p><strong>Data e horario:</strong> ${deliveryDateTime}</p>
      <p><strong>Locale:</strong> ${locale}</p>
      <p><strong>Observacoes:</strong><br/>${observations || '-'}</p>
    </div>
  `;

  await transporter.sendMail({
    from: smtpFrom,
    to: recipient,
    replyTo: smtpFrom,
    subject,
    text,
    html,
  });

  return res.status(200).json({ ok: true });
}
