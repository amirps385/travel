// server/api/emailtest/schedule-itinerary.post.ts
// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] };

  try {
    const body = await readBody(event);
    const toEmail = body?.email || 'your-test-email@example.com';
    const toName = body?.name || 'Guest';
    const scheduledAt = body?.scheduledAt; // Expecting an ISO string like "2026-01-16T15:09:00.000Z"

    // 1) Validate required fields
    if (!scheduledAt) {
      debug.steps.push('Missing scheduledAt');
      debug.error = 'scheduledAt (ISO string) is required for scheduling.';
      return { success: false, debug };
    }
    // Optional: Validate that scheduled time is in the future
    if (new Date(scheduledAt) <= new Date()) {
      debug.steps.push('Invalid schedule time');
      debug.error = 'Scheduled date should not be less than current date[citation:6].';
      return { success: false, debug };
    }

    // 2) Build parameters (same as your working itinerary template)
    const params = {
      name: body?.name ?? 'Guest',
      tripName: body?.tripName ?? 'Custom Trip',
      days: body?.days ?? 7,
      travellers: body?.travellers ?? '2 people',
      interests: body?.interests ?? '',
      message: body?.message ?? '',
      cta_url: body?.cta_url ?? 'https://zafstours.com/contact',
      hero_image: body?.hero_image ?? '',
      logo_url: body?.logo_url ?? '',
      company_phone: body?.company_phone ?? '+255 624 023 455',
      company_email: body?.company_email ?? 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url ?? 'https://zafstours.com/privacy',
    };

    debug.steps.push(`Prepared payload for scheduling: to=${toEmail}, time=${scheduledAt}`);

    // 3) Import SDK
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

    // 4) Configure client and schedule a TRANSACTIONAL email
    try {
      const client = SibApiV3Sdk.ApiClient.instance;
      if (process.env.BREVO_API_KEY) {
        client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
      }

      const api = new SibApiV3Sdk.TransactionalEmailsApi();
      const sendOptions = {
        to: [{ email: toEmail, name: toName }],
        sender: {
          name: process.env.BREVO_SENDER_NAME ?? 'Zafstours',
          email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@brevosend.com',
        },
        templateId: 5, // Your itinerary template ID
        params,
        scheduledAt: new Date(scheduledAt).toISOString(), // ✅ Key parameter for scheduling
      };

      debug.steps.push('Calling sendTransacEmail with scheduledAt');
      const resp = await api.sendTransacEmail(sendOptions);
      debug.steps.push('Transactional email scheduled successfully');
      return { success: true, messageId: resp?.messageId ?? null, debug };
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error');
      debug.error = brevoErr?.message || 'Brevo API error';
      debug.brevoResponse = brevoErr?.response?.body || brevoErr?.response?.text || null;
      console.error('Brevo API error (schedule-itinerary):', brevoErr);
      return { success: false, debug };
    }
  } catch (err: any) {
    console.error('Unhandled schedule-itinerary error:', err);
    return { success: false, debug: { ...debug, error: err.message, stack: err.stack } };
  }
});