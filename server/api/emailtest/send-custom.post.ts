// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] };
  try {
    // 1) read body
    const body = await readBody(event);
    const toEmail = body?.email || '';
    const toName = body?.name || 'Guest';
    const leadId = body?.leadId || null;
    const subject = body?.subject || 'Message from Zafs Tours';
    const message = body?.message || '';

    console.log('📨 send-custom request:', {
      leadId: leadId,
      toEmail: toEmail,
      toName: toName,
      subject: subject
    });

    if (!toEmail) {
      return { success: false, error: 'Email is required', debug };
    }

    const params = {
      name: body?.name || 'Guest',
      subject: body?.subject || 'Message from Zafs Tours',
      message: body?.message || '',
      company_phone: body?.company_phone || '+255 624 023 455',
      company_email: body?.company_email || 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url || 'https://zafstours.com/unsubscribe?token=test'
    };

    debug.steps.push(`Prepared payload => to=${toEmail} subject="${subject}"`);

    // 2) import SDK
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

    // 3) configure and send
    try {
      const client = SibApiV3Sdk.ApiClient.instance;
      if (process.env.BREVO_API_KEY) {
        client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;
      }

      const api = new SibApiV3Sdk.TransactionalEmailsApi();
      const sendOptions = {
        to: [{ email: toEmail, name: toName }],
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Zafstours',
          email: process.env.BREVO_SENDER_EMAIL || 'no-reply@brevosend.com'
        },
        templateId: 7, // Template ID for custom message
        subject: subject,
        params
      };

      debug.steps.push('Calling sendTransacEmail');
      const resp = await api.sendTransacEmail(sendOptions);
      debug.steps.push('Custom email sent');
      
      // ✅ LOGGING: Create email log entry with FULL HTML
      try {
        // Generate the FULL HTML for the custom message
        const generateFullHtml = (recipientName: string, templateParams: any) => {
          return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${templateParams.subject}</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Arial, Helvetica, sans-serif;">
    <!-- WRAPPER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
        <!-- SIMPLE HEADER -->
        <tr>
            <td align="center" style="padding:30px 20px; background-color:#1a3c34;">
                <div style="color:#d4af37; font-size:28px; font-weight:bold;">
                    ZAFS TOURS
                </div>
            </td>
        </tr>
        
        <!-- MAIN CONTENT -->
        <tr>
            <td style="padding:40px 30px;">
                <!-- SUBJECT -->
                <div style="font-size:20px; font-weight:bold; color:#1a3c34; margin-bottom:10px;">
                    ${templateParams.subject}
                </div>
                
                <!-- FROM INFO -->
                <div style="color:#666; font-size:14px; margin-bottom:30px; border-bottom:1px solid #eee; padding-bottom:15px;">
                    From: Zafs Tours Team • ${new Date().toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                </div>
                
                <!-- GREETING -->
                <div style="font-size:16px; color:#333; margin-bottom:20px;">
                    Dear <strong>${recipientName}</strong>,
                </div>
                
                <!-- CUSTOM MESSAGE -->
                <div style="background-color:#f8f8f8; border:1px solid #e5e7eb; border-radius:8px; padding:25px; margin-bottom:30px; line-height:1.6;">
                    ${templateParams.message}
                </div>
                
                <!-- SIGNATURE -->
                <div style="color:#333; margin-top:30px;">
                    <div>Warm regards,</div>
                    <div style="color:#d4af37; font-weight:bold; font-size:18px; margin-top:5px;">
                        Team ZAFS
                    </div>
                </div>
            </td>
        </tr>
        
        <!-- SIMPLE FOOTER -->
        <tr>
            <td style="background-color:#1a3c34; color:#ffffff; padding:30px 20px; text-align:center;">
                <div style="font-size:14px; margin-bottom:15px;">
                    Zafs Tours • Arusha, Tanzania
                </div>
                <div style="font-size:12px; color:#d4af37; margin-bottom:20px;">
                    <a href="https://zafstours.com" style="color:#d4af37; text-decoration:none;">Website</a> • 
                    <a href="https://zafstours.com/privacy" style="color:#d4af37; text-decoration:none;">Privacy</a> • 
                    <a href="${templateParams.unsubscribe_url}" style="color:#d4af37; text-decoration:none;">Unsubscribe</a>
                </div>
                <div style="font-size:11px; color:#a0b5ae; max-width:400px; margin:0 auto; line-height:1.4;">
                    You're receiving this email from Zafs Tours
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;
        };
        
        // Get current user from cookie/token if available
        const token = getCookie(event, 'auth_token');
        let sentBy = null;
        if (token) {
          try {
            const jwt = await import('jsonwebtoken');
            const secret = process.env.JWT_SECRET || 'dev-secret';
            const currentUser = jwt.verify(token, secret) as any;
            sentBy = {
              id: String(currentUser._id || currentUser.id || ''),
              name: currentUser.name || currentUser.email || 'Unknown',
              email: currentUser.email || '',
              role: currentUser.role || 'user',
              source: 'manual'
            };
          } catch (err) {
            // Ignore token errors
          }
        }
        
        // Generate the full HTML
        const fullHtml = generateFullHtml(toName, params);
        
        // Create log entry with FULL HTML
        const logBody = {
          leadId: leadId,
          leadEmail: toEmail,
          leadName: toName,
          templateId: 7,
          templateName: 'Custom Message',
          subject: subject,
          previewText: 'Message from zafstours.com',
          html: fullHtml,
          fullHtml: fullHtml,
          params: params,
          status: 'sent',
          providerResponse: resp,
          sentAt: new Date().toISOString(),
          createdBy: sentBy
        };
        
        console.log('📝 Creating custom message log with leadId:', leadId);
        
        // Call the log API
        const logRes = await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        });
        
        debug.steps.push('Custom message logged with full HTML');
        debug.logId = logRes?.logId;
      } catch (logError: any) {
        console.error('❌ Failed to log custom email:', logError);
        debug.steps.push(`Failed to log custom email: ${logError.message}`);
      }
      
      return { success: true, messageId: resp?.messageId ?? null, debug };
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error');
      debug.error = brevoErr?.message || 'Brevo API error';
      
      // Log failed attempt
      try {
        const logBody = {
          leadId: leadId,
          leadEmail: toEmail,
          leadName: toName,
          templateId: 7,
          status: 'failed',
          providerResponse: {
            error: brevoErr?.message,
            code: brevoErr?.code || 'UNKNOWN_ERROR'
          }
        };
        
        await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        });
      } catch (logError) {
        // ignore
      }
      
      return { success: false, debug };
    }
  } catch (err: any) {
    console.error('Unhandled send-custom error:', err);
    return { success: false, debug: { ...debug, error: err.message } };
  }
});