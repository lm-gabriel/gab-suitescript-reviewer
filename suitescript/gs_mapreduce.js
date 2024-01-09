/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */

define(['N/search', 'N/record', 'N/log'],

    (search, record, log) => {
        const getInputData = (context) => {
            const purchaseOrderRecord = search.create({
                type: search.Type.PURCHASE_ORDER,
                filters: [
                    ['entity', search.Operator.IS, 6097],
                    'AND',
                    ['mainline', search.Operator.IS, 'T'],
                    'AND',
                    ['status', search.Operator.ANYOF, 'PurchOrd:B']
                ],
                columns: [
                    search.createColumn({ name: 'entity', label: 'Name' }),
                    search.createColumn({ name: 'tranid', label: 'PO #' }),
                    search.createColumn({ name: 'status', label: 'Status' }),
                ]
            })

            log.debug({
                title: 'Purchase Order Search', 
                details: purchaseOrderRecord
            });

            /**
             * sample of the returned data
             * {
             *    "recordType":"purchaseorder",
             *    "id":"43637",
             *    "values":
             *    {
             *      "entity": { "value": "6097", "text": "XYZ Test Vendor" }, 
             *      "tranid":"291" 
             *    },
             *    "status": { "value": "pendingReceipt", "text": "受領保留" }
             * }
             * 
             */

            return purchaseOrderRecord
        }

        const map = (context) => {
            try {
                const data = JSON.parse(context.value)
                context.write({ key: data.id, value: data.values.tranid })

            } catch (error) {
                log.error('Something went wrong: ', error)
            }
        }

        const reduce = (context) => {
            try {
                const purchaseOrderRecord = record.load({
                    type: record.Type.PURCHASE_ORDER,
                    id: context.key
                })
    
                const lineItems = purchaseOrderRecord.getLineCount({ sublistId: 'item' })

                for (let i = 0; i < lineItems; i++) {
                    purchaseOrderRecord.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'isclosed',
                        line: i,
                        value: true,
                    })
                }
                
                purchaseOrderRecord.save()
            } catch (error) {
                log.error('Something went wrong: ', error)                
            }
        }

        // const summarize = (context) => {

        // }

        return {
            getInputData: getInputData,
            map: map,
            reduce: reduce
        }

});
