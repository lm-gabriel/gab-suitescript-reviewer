/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record','N/render', 'N/search', 'N/log'],

    (email, record, render, search, log) => {

        const execute = (context) => {
            let count = 0

            search.create({
                type: record.Type.PURCHASE_ORDER,
                filters: [
                    ['entity', search.Operator.IS, 6097],
                    'AND',
                    ['mainline', search.Operator.IS, 'T'],
                    'AND',
                    ['status', search.Operator.ANYOF, 'PurchOrd:B']
                ]
            }).run().each(function(result) {
                count++
                return true
            })

            const mergeResult = render.mergeEmail({ templateId: 210 })
            let emailSubject = mergeResult.subject
            let emailBody = mergeResult.body

            emailBody = emailBody.replace("TOTAL_ROWS", count)

            const senderId = 6084
            const recipientEmail = 'gab@linkmind.co.jp'

            email.send({
                author: senderId,
                recipients: recipientEmail,
                subject: emailSubject,
                body: emailBody
            })

            log.debug({ title: 'Below Email', details: 'Email should be sent at this moment...' })

        }

        return { execute: execute }
    });