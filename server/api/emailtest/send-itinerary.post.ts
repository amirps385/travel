// server/api/emailtest/send-itinerary.post.ts
// @ts-nocheck
export default defineEventHandler(async (event) => {
  const debug: any = { timestamp: new Date().toISOString(), steps: [] }
  try {
    // 1) read body
    const body = await readBody(event)
    const toEmail = body?.email || 'your-test-email@example.com'
    const toName = body?.name || 'Guest'
    // allow override by body.templateId, otherwise rely on any env set by you; do NOT modify env in this file
    const templateId = Number(body?.templateId ?? process.env.BREVO_ITINERARY_TEMPLATE_ID ?? 4)

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

    debug.steps.push(`Prepared payload => to=${toEmail} templateId=${templateId}`)

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
      // use env key if present — you said you already have working setup so we use whatever is present
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
      return { success: true, messageId: resp?.messageId ?? null, debug }
    } catch (brevoErr: any) {
      debug.steps.push('Brevo API error')
      debug.error = brevoErr?.message || 'Brevo API error'
      debug.brevoResponse = brevoErr?.response?.body || brevoErr?.response?.text || null
      console.error('Brevo API error (send-itinerary):', brevoErr)
      return { success: false, debug }
    }
  } catch (err: any) {
    console.error('Unhandled send-itinerary error:', err)
    return { success: false, debug: { ...debug, error: err.message, stack: err.stack } }
  }
})
