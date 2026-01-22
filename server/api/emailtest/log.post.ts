// server/api/emailtest/log.post.ts
import { defineEventHandler, readBody, getCookie, createError } from 'h3'
import { connectDB } from '../../utils/mongoose'
import { logEmail } from '../../utils/logEmail'
import jwt from 'jsonwebtoken'

// HTML GENERATION FUNCTION FOR LOGGING
function generateFullEmailHtmlFromLog(templateId: number, params: any, name: string) {
  if (templateId === 4) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zafs Tours</title>
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
                <img src="${params.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop'}" alt="Luxury Safari Image" width="600" style="max-width:100%; height:auto; display:block; border:0;" />
            </td>
        </tr>
        
        <!-- TITLE -->
        <tr>
            <td align="center" style="padding:40px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:24px; font-weight:bold; text-align:center;">
                            Exclusive Safari Adventure Awaits, ${name}!
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- CONFIRMATION BODY -->
        <tr>
            <td align="center" style="padding:0 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; text-align:left;">
                            <p style="margin-top:0; margin-bottom:20px;">
                                Thanks — we received your call request. We'll call you at <strong>${params.phone || ''}</strong> (${params.country || ''}) around <strong>${params.preferredTime || ''}</strong> (${params.timezone || ''}).
                            </p>
                            
                            ${params.message ? `
                            <p style="margin:25px 0 10px 0; color:#1a3c34; font-weight:bold;">Your notes:</p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f8f8f8; border-left:4px solid #d4af37; margin-bottom:25px;">
                                <tr>
                                    <td style="padding:15px 20px; color:#333333; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.5; font-style:italic;">
                                        "${params.message}"
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            <p style="margin-bottom:0;">
                                If you need to reschedule or have urgent questions before our call, please reply to this email or contact us directly.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- HIGHLIGHTS -->
        <tr>
            <td align="center" style="padding:30px 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Luxury Lodges</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Expert Guides</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td align="center" style="padding:0 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:160px; display:inline-table;">
                                <tr>
                                    <td align="center" style="background-color:#f8f5ec; padding:15px; border:1px solid #d4af37;">
                                        <span style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:14px; font-weight:bold;">Private Tours</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- PRIMARY CTA BUTTON -->
        <tr>
            <td align="center" style="padding:30px 20px 20px 20px;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="background-color:#d4af37; border-radius:4px;">
                            <a href="${params.cta_url || 'https://zafstours.com/contact'}" style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:15px 40px; display:inline-block;">
                                BOOK NOW
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- SECONDARY PHONE CTA -->
        <tr>
            <td align="center" style="padding:0 20px 40px 20px;">
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#666; padding:10px 0;">
                            or
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <a href="tel:${params.company_phone}" style="color:#1a3c34; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:bold; text-decoration:none; padding:12px 30px; display:inline-block; border:2px solid #d4af37; border-radius:4px;">
                                Call us: ${params.company_phone}
                            </a>
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
                            Zafs Tours
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:10px;">
                            Luxury Travel & Safari Specialists
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            Arusha, Tanzania
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:5px;">
                            ${params.company_phone}
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; padding-bottom:25px;">
                            <a href="mailto:${params.company_email}" style="color:#ffffff; text-decoration:underline;">${params.company_email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top:25px; border-top:1px solid #2c5a4d;">
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
                                        <a href="${params.unsubscribe_url}" style="color:#d4af37; font-family:Arial, Helvetica, sans-serif; font-size:13px; text-decoration:none;">Unsubscribe</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top:25px;">
                            <p style="color:#a0b5ae; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:1.5; max-width:500px; margin:0 auto;">
                                You're receiving this email because you requested a consultation with Zafs Tours. We respect your privacy. View our <a href="https://zafstours.com/privacy" style="color:#d4af37; text-decoration:underline;">privacy policy</a>.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
  }
  
  // Default fallback HTML
  return `<div style="padding: 30px; background-color: white; border-radius: 8px;">
    <h2 style="color: #1a3c34; margin-top: 0;">Email Content</h2>
    <p><strong>Template:</strong> ${templateId}</p>
    <p><strong>Recipient:</strong> ${name}</p>
    ${params.message ? `<div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
      <p><strong>Message:</strong> ${params.message}</p>
    </div>` : ''}
  </div>`
}

export default defineEventHandler(async (event) => {
  try {
    await connectDB()
    const body = await readBody(event)

    console.log('Log email request body - TemplateId:', body.templateId, 'Params:', body.params ? 'YES' : 'NO')

    // Basic validation - check for required fields
    if (!body.leadEmail && !body.leadId) {
      console.warn('Missing leadEmail and leadId in log request')
    }

    // Try to decode current user from cookie (optional)
    const token = getCookie(event, 'auth_token')
    let currentUser: any = null
    if (token) {
      try {
        const secret = process.env.JWT_SECRET || 'dev-secret'
        currentUser = jwt.verify(token, secret) as any
      } catch (err) {
        console.warn('Failed to decode token:', err)
      }
    }

    const createdBy = body.createdBy || (currentUser ? {
      id: String(currentUser._id || currentUser.id || ''),
      name: currentUser.name || currentUser.email || 'Unknown',
      role: currentUser.role || 'user',
      source: 'manual'
    } : { id: null, name: 'System', role: 'system', source: 'auto' })

    // Generate full HTML if preview text provided but no full HTML
    let fullHtml = body.fullHtml || ''
    
    // If fullHtml is empty but we have params, generate it
    if (!fullHtml && body.params && body.templateId) {
      console.log('Generating full HTML for template:', body.templateId)
      fullHtml = generateFullEmailHtmlFromLog(body.templateId, body.params, body.leadName || 'Guest')
      console.log('Generated HTML length:', fullHtml?.length || 0)
    }

    // Ensure required fields for EmailLog schema
    const logData = {
      leadId: body.leadId || null,
      toEmail: body.leadEmail || body.email || '', // CRITICAL: Must not be empty
      toName: body.leadName || body.name || '',
      templateId: body.templateId || null,
      templateName: body.templateName || null,
      subject: body.subject || null,
      previewHtml: body.previewText || body.html || '',
      fullHtml: fullHtml, // Save the generated full HTML
      html: body.html || body.emailHtml || null,
      params: body.params || {},
      status: body.status || 'sent',
      providerResponse: body.providerResponse || null,
      scheduledAt: body.scheduledAt || null,
      sentAt: body.sentAt || null,
      createdBy
    }

    console.log('Creating email log with data - TemplateId:', logData.templateId, 'FullHtml length:', logData.fullHtml?.length || 0)

    const log = await logEmail(logData)

    if (!log) {
      throw createError({
        statusCode: 500,
        message: 'Failed to create email log'
      })
    }

    return { 
      success: true, 
      logId: String(log._id) 
    }
  } catch (error: any) {
    console.error('Error in log.post.ts:', error)
    
    // Return error response instead of throwing to prevent unhandled errors
    return {
      success: false,
      message: error.message || 'Failed to log email',
      error: error
    }
  }
})