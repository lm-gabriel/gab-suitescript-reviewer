/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/log'],

    (record, log) => {

        const each = (params) => {
            log.debug("params ", JSON.stringify(params))
            
            const objRecord = record.load({
                type: params.type,
                id: params.id
            })

            const lineCount = objRecord.getLineCount({ sublistId: 'item' })

            for (let i = 0; i < lineCount; i++) {
                objRecord.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 5,
                    line: i
                })

                let id = objRecord.save()
                log.debug("id saved", id)
            }
        }

        return { each: each }
    });