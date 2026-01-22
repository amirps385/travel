// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] }

  try {
    const body = await readBody(event)
    const toEmail = body?.email
    const toName = body?.name || 'Guest'
    const leadId = body?.leadId || null
    const templateId = 6 // Newsletter template ID

    // Simple parameters - just name and optional message
    const params = {
      name: toName,
      // message: body?.message || 'Welcome to the Zafs Tours newsletter! We\'ll share exclusive safari offers, travel tips, and stunning photography from the heart of Africa.',
      cta_url: body?.cta_url || 'https://zafstours.com/tours',
      hero_image: body?.hero_image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop',
      company_phone: body?.company_phone || process.env.PUBLIC_COMPANY_PHONE || '+255 624 023 455',
      company_email: body?.company_email || process.env.PUBLIC_COMPANY_EMAIL || 'info@zafstours.com',
      unsubscribe_url: body?.unsubscribe_url || process.env.PUBLIC_UNSUBSCRIBE_URL || 'https://zafstours.com/unsubscribe'
    }

    debug.steps.push(`Newsletter: to=${toEmail}, name=${toName}`)

    // Import SDK
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

    // Configure and send
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

      debug.steps.push('Sending newsletter email')
      const resp = await api.sendTransacEmail(sendOptions)
      debug.steps.push('Newsletter email sent')
      
      // LOGGING
      try {
        const token = getCookie(event, 'auth_token')
        let sentBy = null
        if (token) {
          try {
            const jwt = await import('jsonwebtoken')
            const secret = process.env.JWT_SECRET || 'dev-secret'
            const currentUser = jwt.verify(token, secret) as any
            sentBy = {
              id: String(currentUser._id || currentUser.id || ''),
              name: currentUser.name || currentUser.email || 'Unknown',
              email: currentUser.email || '',
              role: currentUser.role || 'user',
              source: 'manual'
            }
          } catch (err) {
            // Ignore token errors
          }
        }
        
        const logBody = {
          leadId: leadId,
          leadEmail: toEmail,
          leadName: toName,
          templateId: 6,
          templateName: 'Newsletter',
          subject: `Welcome ${toName}! Your Safari Insider Newsletter`,
          previewText: 'Welcome to our exclusive safari newsletter community!',
          params: params,
          status: 'sent',
          providerResponse: resp,
          sentAt: new Date().toISOString(),
          createdBy: sentBy
        }
        
        await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        })
        
        debug.steps.push('Newsletter logged')
      } catch (logError: any) {
        debug.steps.push(`Logging failed: ${logError.message}`)
      }
      
      return { success: true, messageId: resp?.messageId ?? null, debug }
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error')
      debug.error = brevoErr?.message
      
      // Log failed attempt
      try {
        const logBody = {
          leadId: leadId,
          leadEmail: toEmail,
          leadName: toName,
          templateId: 6,
          status: 'failed',
          providerResponse: {
            error: brevoErr?.message,
            code: brevoErr?.code || 'UNKNOWN_ERROR'
          }
        }
        
        await $fetch('/api/emailtest/log', {
          method: 'POST',
          body: logBody
        })
      } catch (logError) {
        // Ignore logging errors
      }
      
      return { success: false, debug }
    }
  } catch (err: any) {
    console.error('Unhandled newsletter error:', err)
    return { success: false, debug: { ...debug, error: err.message } }
  }
})