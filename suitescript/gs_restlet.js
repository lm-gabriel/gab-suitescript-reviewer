/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
*/


define(['N/record', 'N/log'], function(record, log) {
    function _get(context) {
        return JSON.stringify(record.load({
            type: context.recordtype,
            id: context.id
        }))
    }

    function _post(context) {
        const rec = record.create({ type: context.recordtype })

        rec.setValue({ fieldId: 'entity', value: 6097 })

        if (context.items.length > 0) {
            for (let i = 0; i < context.items.length; i++) {
                rec.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i,
                    value: context.items[i]
                })

                rec.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i,
                    value: 1
                })
            }
        }

        for (let fldName in context) {
            if (context.hasOwnProperty(fldName)) {
                if (fldName !== 'recordtype' && fldName !== 'items') {
                    rec.setValue(fldName, context[fldName])
                }
            }
        }

        const recordId = rec.save()

        log.audit({ title: 'Record Created', details: recordId })

        return String(recordId)
    }

    function _delete(context) {
        record.delete({ type: context.recordtype, id: context.id })

        return String(context.id)
    }

    function _put(context) {
        const rec = record.load({
             type: context.recordtype,
             id: context.id
         })

         for (let fldName in context) {
             if (context.hasOwnProperty(fldName))
                 if (fldName !== 'recordtype' && fldName !== 'id')
                     rec.setValue(fldName, context[fldName])
         }

         rec.save()

         return JSON.stringify(rec)
     }
    
    return {
        get: _get,
        post: _post,
        delete: _delete,
        put: _put
    }
});