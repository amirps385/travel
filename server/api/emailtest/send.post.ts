// server/api/emailtest/send.post.ts
// @ts-nocheck

export default defineEventHandler(async (event) => {
  const debug: any = {
    timestamp: new Date().toISOString(),
    steps: []
  }

  try {
    // 1) Validate environment variables
    if (!process.env.BREVO_API_KEY) {
      debug.steps.push('Missing BREVO_API_KEY');
      debug.error = 'BREVO_API_KEY missing in .env';
      return { success: false, debug };
    }
    if (!process.env.BREVO_SENDER_EMAIL) {
      debug.steps.push('Missing BREVO_SENDER_EMAIL');
      debug.error = 'BREVO_SENDER_EMAIL missing in .env';
      return { success: false, debug };
    }
    debug.steps.push('Environment variables validated');

    // 2) Parse incoming body
    const body = await readBody(event);

    const toEmail = body?.email || 'your-test-email@example.com';
    const toName = body?.name || 'Test User';
    const templateId = Number(body?.templateId ?? 4);
    
    // All template parameters for the new email template
    const params = {
      name: body?.name ?? 'Test User',
      email: body?.email ?? toEmail,
      phone: body?.phone ?? '+255 624 023 455',
      country: body?.country ?? 'Tanzania',
      preferredTime: body?.preferredTime ?? 'March 12, 2026 — 10:30 AM',
      timezone: body?.timezone ?? 'Africa/Dar_es_Salaam',
      message: body?.message ?? 'This is a hardcoded debug message.',
      cta_url: body?.cta_url ?? 'https://zafstours.com/contact',
      hero_image: body?.hero_image ?? 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop',
      logo_url: body?.logo_url ?? '',
      company_phone: body?.company_phone ?? '+255 624 023 455', 
      company_email: body?.company_email ?? 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url ?? 'https://zafstours.com/unsubscribe?token=test'
    };

    debug.steps.push(`Prepared send payload: to=${toEmail}, templateId=${templateId}`);
    debug.paramCount = Object.keys(params).length;

    // 3) Import and use the SDK
    let SibApiV3Sdk: any;
    try {
      const module = await import('sib-api-v3-sdk');
      SibApiV3Sdk = module.default || module;
      debug.steps.push('SDK imported successfully');
    } catch (e: any) {
      debug.steps.push('Failed to import SDK');
      debug.error = `SDK import error: ${e.message}`;
      return { success: false, debug };
    }

    // 4) Configure client and send email
    try {
      const client = SibApiV3Sdk.ApiClient.instance;
      client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

      const api = new SibApiV3Sdk.TransactionalEmailsApi();

      const sendOptions = {
        to: [{ email: toEmail, name: toName }],
        sender: { 
          name: process.env.BREVO_SENDER_NAME ?? 'Zafstours', 
          email: process.env.BREVO_SENDER_EMAIL 
        },
        templateId,
        params
      };

      debug.steps.push('Sending with params:', JSON.stringify(params, null, 2));

      const resp = await api.sendTransacEmail(sendOptions);
      
      debug.steps.push('Email sent successfully');
      debug.messageId = resp.messageId;
      
      return { 
        success: true, 
        messageId: resp.messageId,
        debug 
      };
      
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error');
      debug.error = brevoErr?.message || 'Unknown Brevo API error';
      debug.brevoErrorCode = brevoErr?.code;
      debug.brevoResponse = brevoErr?.response?.body || brevoErr?.response?.text || 'No response body';
      
      console.error('Brevo API error:', brevoErr);
      console.error('Brevo error response:', brevoErr?.response?.body);
      return { success: false, debug };
    }
    
  } catch (err: any) {
    debug.steps.push('Unhandled exception');
    debug.error = err.message;
    debug.stack = err.stack;
    console.error('Unhandled error:', err);
    return { success: false, debug };
  }
});