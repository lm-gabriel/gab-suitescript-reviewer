/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
*/

define(['N/record', 'N/log'],
    
    (record, log) => {

        const execute = (context) => {
            const estimateToSalesOrder = record.transform({
                fromType: record.Type.ESTIMATE,
                fromId: 43912,
                toType: record.Type.SALES_ORDER
            })

            estimateToSalesOrder.save()

            log.debug('Obj', estimateToSalesOrder)
        }

        return { execute: execute }
    }
);