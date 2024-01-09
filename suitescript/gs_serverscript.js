/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */


define(['N/email', 'N/record'], function(email, record) {
    // NOTE: EMAIL TEMPLATE FROM NETSUITE CAN BE USED INSTEAD OF HARDCODING THE EMAIL BODY


    function beforeLoad(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return
        }
    }

    function beforeSubmit(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return
        }
    }

    function afterSubmit(context) {
        if (context.type !== context.UserEventType.CREATE) {
            return
        }
        
        var purchaseRecord = context.newRecord

        var objRecord = record.load({
            type: record.Type.PURCHASE_ORDER,
            id: purchaseRecord.id,
        })

        var tranid = objRecord.getValue('tranid')
        var total = objRecord.getValue('total')
        var itemsCount = objRecord.getLineCount({ sublistId: 'item' })
        var items = ''

        if (itemsCount > 0) {
            for (var i = 0; i < itemsCount; i++) {
                var item = objRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i,
                })

                var itemRecord = record.load({
                    type: record.Type.INVENTORY_ITEM,
                    id: item,
                })

                var itemDisplayName = itemRecord.getValue('displayname')
                
                var quantity = objRecord.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i,
                })

                items = items + ' ' + quantity + 'x ' + itemDisplayName + '\n'
            }
        }

        var senderId = 6084
        var recipientEmail = 'gab@linkmind.co.jp'
        var body = 'Purchase order #' + tranid + ' with a total of ' + total + ' has been created.\n' + items

        email.send({
            author: senderId,
            recipients: recipientEmail,
            subject: 'A Purchase Order Has Been Created',
            body: body,
        })
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
})
