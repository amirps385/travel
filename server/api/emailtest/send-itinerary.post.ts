// server/api/emailtest/send-itinerary.post.ts - COMPLETE FIXED VERSION
// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] }
  try {
    // 1) read body
    const body = await readBody(event)
    const toEmail = body?.email || 'your-test-email@example.com'
    const toName = body?.name || 'Guest'
    const leadId = body?.leadId || null  // CRITICAL: This should not be null
    
    // Log the incoming request
    console.log('📨 send-itinerary request:', {
      leadId: leadId,
      toEmail: toEmail,
      toName: toName,
      hasLeadId: !!leadId
    })

    // Validate leadId is provided (for non-test emails)
    if (!leadId && toEmail !== 'your-test-email@example.com') {
      console.warn('⚠️ Warning: leadId is null for real email:', toEmail)
      // Don't fail, but log warning
    }

    const templateId = Number(body?.templateId ?? process.env.BREVO_ITINERARY_TEMPLATE_ID ?? 5)

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
      company_phone: body?.company_phone ?? process.env.PUBLIC_COMPANY_PHONE ?? '+255 624 023 455',
      company_email: body?.company_email ?? process.env.PUBLIC_COMPANY_EMAIL ?? 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url ?? process.env.PUBLIC_UNSUBSCRIBE_URL ?? 'https://zafstours.com/privacy'
    }

    debug.steps.push(`Prepared payload => to=${toEmail} templateId=${templateId} leadId=${leadId}`)

    // 2) import SDK
    let SibApiV3Sdk: any
    try {
      const module = await import('sib-api-v3-sdk')
      SibApiV3Sdk = module.default || module
      debug.steps.push('SDK imported')
    } catch (e: any) {
      debug.steps.push('SDK import failed')
      debug.error = e?.message
      return { success: false, debug }
    }

    // 3) configure and send
    try {
      const client = SibApiV3Sdk.ApiClient.instance
      if (process.env.BREVO_API_KEY) {
        client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY
      }

      const api = new SibApiV3Sdk.TransactionalEmailsApi()
      const sendOptions = {
        to: [{ email: toEmail, name: toName }],
        sender: {
          name: process.env.BREVO_SENDER_NAME ?? 'Zafstours',
          email: process.env.BREVO_SENDER_EMAIL ?? 'no-reply@brevosend.com'
        },
        templateId,
        params
      }

      debug.steps.push('Calling sendTransacEmail')
      const resp = await api.sendTransacEmail(sendOptions)
      debug.steps.push('Email sent')
      
      // ✅ LOGGING: Create email log entry with FULL HTML
      try {
        // Helper functions
        const getTemplateName = (id: number) => {
          const templates = { 4: 'Book a Call', 5: 'Itinerary Request', 6: 'Newsletter' };
          return templates[id] || `Template ${id}`;
        };
        
        const getEmailSubject = (id: number, name: string) => {
          switch(id) {
            case 4: return `${name}, your call request is confirmed`;
            case 5: return `Thanks ${name} - Your Africa Adventure Has Officially Begun`;
            case 6: return 'Latest Safari Updates & Special Offers';
            default: return 'Email from Zafs Tours';
          }
        };

        const getPreviewText = (id: number) => {
          switch(id) {
            case 4: return 'Our team will contact you shortly to plan your safari.';
            case 5: return 'We\'ll send your full itinerary in 48 hours.';
            case 6: return 'Stay updated with our latest safari news and special offers.';
            default: return '';
          }
        };
        
        // Generate the FULL HTML for the email
        const generateFullHtml = (templateId: number, recipientName: string, templateParams: any) => {
          if (templateId === 5) {
            // Return the NEW itinerary template HTML
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Africa Adventure Has Officially Begun</title>
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5;">
    <!-- WRAPPER -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin:0 auto; background-color:#ffffff;">
        <!-- HEADER -->
        <tr>
            <td align="center" style="padding:30px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center;">
                            ZAFS TOURS
                        </td>
                    </tr>
                    <tr>
                        <td style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; padding-top:8px; text-align:center;">
                            Luxury Safari Experiences in Tanzania
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HERO IMAGE -->
        <tr>
            <td align="center" style="padding:0;">
                <img src="${templateParams.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop'}" alt="African Safari Adventure" width="600" style="max-width:100%; height:auto; display:block; border:0;" />
            </td>
        </tr>
        
        <!-- TITLE -->
        <tr>
            <td align="center" style="padding:40px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:28px; font-weight:bold; text-align:center; line-height:1.3;">
                            Get Ready for the Adventure of a Lifetime
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- MAIN CONTENT -->
        <tr>
            <td align="center" style="padding:0 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; text-align:left;">
                            <!-- GREETING -->
                            <p style="margin-top:0; margin-bottom:20px; font-size:18px; color:#1a3c34;">
                                <strong>Karibu ${recipientName},</strong>
                            </p>
                            
                            <p style="margin-bottom:20px;">
                                Thank you for sharing your travel plans with us. Your journey to Africa is already taking shape, and we're truly excited to be part of it.
                            </p>
                            
                            <p style="margin-bottom:20px;">
                                Based on the details you've submitted, our travel experts are now crafting a personalized itinerary tailored to your interests, travel dates, group size, and adventure level. Whether it's a thrilling safari, the challenge of Mount Kilimanjaro, or a perfectly balanced mix of both, we've got you covered.
                            </p>
                            
                            <!-- WHAT HAPPENS NEXT -->
                            <div style="background-color:#f8fafc; border:1px solid #eef6f3; border-radius:8px; padding:25px; margin:30px 0;">
                                <h3 style="color:#1a3c34; margin-top:0; margin-bottom:20px; font-size:20px; text-align:center;">
                                    What happens next?
                                </h3>
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;">
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0; width:30px;">
                                            <span style="color:#1a3c34; font-weight:bold;">✓</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            <strong>Our specialists</strong> are carefully reviewing your preferences
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0;">
                                            <span style="color:#1a3c34; font-weight:bold;">→</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            We'll design an itinerary aligned with your goals, comfort, and budget
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" style="padding:12px 10px 12px 0;">
                                            <span style="color:#1a3c34; font-weight:bold;">✉</span>
                                        </td>
                                        <td valign="top" style="padding:12px 0;">
                                            You'll hear back from us within <strong>24–48 hours</strong> with a curated plan and next steps
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <p style="margin-bottom:20px;">
                                If we need any clarification to perfect your experience, a member of our team may reach out directly.
                            </p>
                            
                            <!-- REQUEST DETAILS -->
                            ${templateParams.tripName || templateParams.days || templateParams.travellers ? `
                            <div style="background-color:#f8fafc; border:1px solid #eef6f3; border-radius:8px; padding:20px; margin:25px 0;">
                                <h3 style="color:#1a3c34; margin-top:0; margin-bottom:15px; font-size:18px;">Request Summary</h3>
                                
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size:15px;">
                                    ${templateParams.tripName ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold; width:120px;">Trip:</td>
                                        <td style="padding:8px 0;">${templateParams.tripName}</td>
                                    </tr>
                                    ` : ''}
                                    ${templateParams.days ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Duration:</td>
                                        <td style="padding:8px 0;">${templateParams.days} days</td>
                                    </tr>
                                    ` : ''}
                                    ${templateParams.travellers ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Travellers:</td>
                                        <td style="padding:8px 0;">${templateParams.travellers}</td>
                                    </tr>
                                    ` : ''}
                                    ${templateParams.interests ? `
                                    <tr>
                                        <td style="padding:8px 0; color:#1a3c34; font-weight:bold;">Interests:</td>
                                        <td style="padding:8px 0;">${templateParams.interests}</td>
                                    </tr>
                                    ` : ''}
                                </table>
                            </div>
                            ` : ''}
                            
                            <!-- MESSAGE -->
                            ${templateParams.message ? `
                            <div style="margin:25px 0;">
                                <p style="color:#1a3c34; font-weight:bold; margin-bottom:10px;">Your Message:</p>
                                <div style="background-color:#f8f8f8; border-left:4px solid #d4af37; padding:15px 20px; font-style:italic; color:#333333;">
                                    "${templateParams.message}"
                                </div>
                            </div>
                            ` : ''}
                            
                            <p style="margin-bottom:20px; font-style:italic; color:#1a3c34; border-left:4px solid #d4af37; padding-left:15px;">
                                In the meantime, imagine waking up to sweeping savannah views, spotting wildlife in their natural habitat, or standing on Africa's highest peak. Your adventure is closer than you think.
                            </p>
                            
                            <!-- CLOSING -->
                            <p style="margin-bottom:10px;">
                                Warm regards,
                            </p>
                            <p style="margin-top:0; margin-bottom:30px; font-size:18px; color:#d4af37; font-weight:bold;">
                                Team ZAFS
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- FOOTER -->
        <tr>
            <td align="center" style="padding:40px 20px; background-color:#1a3c34;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:20px; font-weight:bold; padding-bottom:15px;">
                            ZAFS Tours
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:20px; font-style:italic;">
                            Crafting once-in-a-lifetime African adventures
                        </td>
                    </tr>
                    
                    <!-- CONTACT INFO WITHOUT EMOJIS -->
                    <tr>
                        <td align="center" style="padding-bottom:25px;">
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0 auto; font-family:Arial, Helvetica, sans-serif; font-size:14px;">
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Location:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0; color:#ffffff;">
                                        Based in Tanzania
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Website:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0;">
                                        <a href="https://zafstours.com" style="color:#ffffff; text-decoration:none;">www.zafstours.com</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Email:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0;">
                                        <a href="mailto:${templateParams.company_email || 'info@zafstours.com'}" style="color:#ffffff; text-decoration:none;">${templateParams.company_email || 'info@zafstours.com'}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="middle" style="padding:5px 8px 5px 0; color:#ffffff;">
                                        <strong>Phone:</strong>
                                    </td>
                                    <td valign="middle" style="padding:5px 0; color:#ffffff;">
                                        <a href="tel:${templateParams.company_phone || '+255620285462'}" style="color:#ffffff; text-decoration:none;">${templateParams.company_phone || '+255 620 285 462'}</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- SOCIAL MEDIA -->
                    <tr>
                        <td align="center" style="padding-bottom:30px;">
                            <p style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; margin-bottom:10px;">
                                Follow our journeys:
                            </p>
                            <a href="https://instagram.com/zafstours" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; text-decoration:none; font-weight:bold;">
                                Instagram
                            </a>
                        </td>
                    </tr>
                    
                    <!-- FINAL NOTE -->
                    <tr>
                        <td align="center" style="padding-top:25px; border-top:1px solid #2c5a4d;">
                            <p style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; margin-bottom:15px;">
                                You'll hear from our team within 24–48 hours with your personalized itinerary.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- BOTTOM LINKS -->
                    <tr>
                        <td align="center" style="padding-top:25px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Website</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="https://zafstours.com/privacy" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Privacy</a>
                                    </td>
                                    <td style="padding:0 12px; color:#d4af37;">|</td>
                                    <td style="padding:0 12px;">
                                        <a href="${templateParams.unsubscribe_url || 'https://zafstours.com/unsubscribe?token=test'}" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- LEGAL FOOTNOTE -->
                    <tr>
                        <td align="center" style="padding-top:25px;">
                            <p style="color:#a0b5ae; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:1.5; max-width:500px; margin:0 auto;">
                                You're receiving this email because you requested a custom itinerary with Zafs Tours. We respect your privacy.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
          }
          // Add similar for other templates if needed
          return '';
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
        const fullHtml = generateFullHtml(templateId, toName, params);
        
        // Create log entry with FULL HTML
        const logBody = {
          leadId: leadId, // THIS MUST BE THE leadId FROM THE REQUEST
          leadEmail: toEmail,
          leadName: toName,
          templateId: templateId,
          templateName: getTemplateName(templateId),
          subject: getEmailSubject(templateId, toName),
          previewText: getPreviewText(templateId),
          html: fullHtml,
          fullHtml: fullHtml,
          params: params,
          status: 'sent',
          providerResponse: resp,
          sentAt: new Date().toISOString(),
          createdBy: sentBy,
          autoGenerated: body.autoGenerated || false
        };
        
        console.log('📝 Creating email log with leadId:', leadId)
        
        // Call the log API
        const logRes = await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        });
        
        console.log('✅ Email logged successfully, logId:', logRes?.logId)
        debug.steps.push('Itinerary email logged with full HTML');
        debug.logId = logRes?.logId;
      } catch (logError: any) {
        console.error('❌ Failed to log itinerary email:', logError)
        debug.steps.push(`Failed to log itinerary email: ${logError.message}`);
      }
      
      return { success: true, messageId: resp?.messageId ?? null, debug }
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error')
      debug.error = brevoErr?.message || 'Brevo API error'
      debug.brevoResponse = brevoErr?.response?.body || brevoErr?.response?.text || null
      
      // ✅ LOGGING: Log failed email attempt
      try {
        const logBody = {
          leadId: leadId,
          leadEmail: toEmail,
          leadName: toName,
          templateId: templateId,
          status: 'failed',
          providerResponse: {
            error: brevoErr?.message,
            code: brevoErr?.code || 'UNKNOWN_ERROR',
            response: brevoErr?.response?.body
          },
          sentAt: new Date().toISOString()
        };
        
        console.log('📝 Logging failed email with leadId:', leadId)
        
        await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        });
        
        debug.steps.push('Failed itinerary email logged');
      } catch (logError) {
        debug.steps.push(`Failed to log failed itinerary email: ${logError.message}`);
      }
      
      console.error('Brevo API error (send-itinerary):', brevoErr)
      return { success: false, debug }
    }
  } catch (err: any) {
    console.error('Unhandled send-itinerary error:', err)
    return { success: false, debug: { ...debug, error: err.message, stack: err.stack } }
  }
})