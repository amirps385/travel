// server/api/emailtest/schedule.post.ts
// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] };

  try {
    const body = await readBody(event);

    // Required inputs
    const toEmail = body?.email || null;
    const toName = body?.name || 'Guest';
    const scheduledAt = body?.scheduledAt; // ISO string expected

    // Basic validation
    if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
      debug.steps.push('Invalid or missing recipient email');
      debug.error = 'recipient email is required and must be valid';
      return { success: false, debug };
    }
    if (!scheduledAt) {
      debug.steps.push('Missing scheduledAt');
      debug.error = 'scheduledAt (ISO string) is required';
      return { success: false, debug };
    }

    const scheduledDate = new Date(scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      debug.steps.push('Invalid scheduledAt format');
      debug.error = 'scheduledAt is not a valid date';
      return { success: false, debug };
    }
    if (scheduledDate <= new Date()) {
      debug.steps.push('scheduledAt not in future');
      debug.error = 'scheduledAt must be a future date/time';
      return { success: false, debug };
    }

    // Template selection: prefer body.templateId, else env override, else default to 4 (book-a-call)
    const templateId = Number(body?.templateId ?? process.env.BREVO_CALL_TEMPLATE_ID ?? 4);

    // Build params matching your Book-a-Call template placeholders
    const params = {
      name: body?.name ?? 'Guest',
      phone: body?.phone ?? '',
      country: body?.country ?? '',
      preferredTime: body?.preferredTime ?? '',
      timezone: body?.timezone ?? '',
      message: body?.message ?? '',
      cta_url: body?.cta_url ?? 'https://zafstours.com/contact',
      hero_image: body?.hero_image ?? '',
      logo_url: body?.logo_url ?? '',
      company_phone: body?.company_phone ?? process.env.PUBLIC_COMPANY_PHONE ?? '+255 624 023 455',
      company_email: body?.company_email ?? process.env.PUBLIC_COMPANY_EMAIL ?? 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url ?? process.env.PUBLIC_UNSUBSCRIBE_URL ?? 'https://zafstours.com/unsubscribe'
    };

    debug.steps.push(`Prepared payload => to=${toEmail} templateId=${templateId}`);
    debug.paramCount = Object.keys(params).length;

    // Import SDK
    let SibApiV3Sdk: any;
    try {
      const module = await import('sib-api-v3-sdk');
      SibApiV3Sdk = module.default || module;
      debug.steps.push('SDK imported');
    } catch (e: any) {
      debug.steps.push('SDK import failed');
      debug.error = e?.message;
      return { success: false, debug };
    }

    // Configure client & schedule transactional email
    try {
      const client = SibApiV3Sdk.ApiClient.instance;
      if (process.env.BREVO_API_KEY) {
        client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
        debug.steps.push('API key loaded from env');
      } else {
        debug.steps.push('No API key in env');
      }

      const api = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendOptions = {
        to: [{ email: toEmail, name: toName }],
        sender: {
          name: process.env.BREVO_SENDER_NAME ?? 'Zafstours',
          email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@brevosend.com'
        },
        templateId,
        params,
        scheduledAt: new Date(scheduledAt).toISOString() // ensure ISO
      };

      debug.steps.push('Calling sendTransacEmail with scheduledAt');
      const resp = await api.sendTransacEmail(sendOptions);
      debug.steps.push('Transactional email scheduled successfully');
      return { success: true, messageId: resp?.messageId ?? null, debug };
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error');
      debug.error = brevoErr?.message || 'Brevo API error';
      debug.brevoResponse = brevoErr?.response?.body || brevoErr?.response?.text || null;
      console.error('Brevo API error (schedule-call):', brevoErr);
      return { success: false, debug };
    }
  } catch (err: any) {
    console.error('Unhandled schedule-call error:', err);
    return { success: false, debug: { ...debug, error: err.message, stack: err.stack } };
  }
});
