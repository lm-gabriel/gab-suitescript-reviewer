/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search', 'N/log'],

    (serverWidget, search, log) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            const form = serverWidget.createForm({
                title : 'Basic Form'
            })

            if (scriptContext.request.method === 'GET') {
                log.audit({ title: 'Method Call', details: 'GET' })

                // creating fields
                const fieldgroup = form.addFieldGroup({
                    id : 'custpage_usergroup',
                    label : 'User Information'
                })
    
                const firstName = form.addField({
                    id : 'custpage_fnamefield',
                    type : serverWidget.FieldType.TEXT,
                    label : 'First Name',
                    container: 'custpage_usergroup'
                })
    
                const lastName = form.addField({
                    id : 'custpage_lnamefield',
                    type : serverWidget.FieldType.TEXT,
                    label : 'Last Name',
                    container: 'custpage_usergroup'
                })
    
                const email = form.addField({
                    id : 'custpage_emailfield',
                    type : serverWidget.FieldType.EMAIL,
                    label : 'Email',
                    container: 'custpage_usergroup'
                })
    
                // setting fields mandatory
                firstName.isMandatory = true
                lastName.isMandatory = true
    
                // creating buttons
                form.addResetButton({
                    label : 'Reset Button'
                })
    
                form.addSubmitButton({
                    label : 'Submit Button'
                })
    
                // creating sublist
                const sublist = form.addSublist({
                    id : 'custpage_sublistid',
                    type : serverWidget.SublistType.LIST,
                    label : 'Sublist'
                })
    
                sublist.addMarkAllButtons()
    
                sublist.addField({
                    id: 'custpage_checkbox',
                    type: serverWidget.FieldType.CHECKBOX,
                    label: 'Select'
                })
                
                sublist.addField({
                    id: 'custpage_customer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer'
                })
    
                sublist.addField({
                    id: 'custpage_internalid',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Interal ID'
                })
    
                sublist.addField({
                    id: 'custpage_trannum',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Transaction Number'
                })
    
                // create a search to fill the sublist
                const purchaseOrderRecord = search.create({
                    type: search.Type.PURCHASE_ORDER,
                    filters: [
                        ['entity', search.Operator.IS, 6097],
                        'AND',
                        ['mainline', search.Operator.IS, 'T'],
                    ],
                    columns: [
                        search.createColumn({ name: 'entity', label: 'Name' }),
                        search.createColumn({ name: 'tranid', label: 'PO #' }),
                        search.createColumn({ name: 'internalid', label: 'Internal ID' }),
                    ]
                })
    
                let counter = 0
    
                purchaseOrderRecord
                .run()
                .each(function(res) {
                    let entity = res.getText({ name: 'entity' })
                    let tranid = res.getValue('tranid')
                    let id = res.id
    
                    log.debug({ title: 'Results', details: res })
    
                    sublist.setSublistValue({
                        id: 'custpage_customer',
                        line: counter,
                        value: entity
                    })
    
                    sublist.setSublistValue({
                        id: 'custpage_internalid',
                        line: counter,
                        value: id
                    })
    
                    sublist.setSublistValue({
                        id: 'custpage_trannum',
                        line: counter,
                        value: tranid
                    })
    
                    counter++
    
                    return true
                })
                
                scriptContext.response.writePage({
                    pageObject: form
                })
            } else {
                log.audit({ title: 'Method Call', details: 'POST' })

                const fname = scriptContext.request.parameters.custpage_fnamefield
                const serverRequest = scriptContext.request
                const lineCount = serverRequest.getLineCount({ group: 'custpage_sublistid' })
                log.debug('First Name', fname)

                for (let i = 0; i < lineCount; i++) {
                    let internalId = serverRequest.getSublistValue({
                        group: 'custpage_sublistid',
                        name: 'custpage_internalid',
                        line: i,
                    })

                    let checked = serverRequest.getSublistValue({
                        group: 'custpage_sublistid',
                        name: 'custpage_checkbox',
                        line: i,
                    })

                    // create table

                    log.debug("Internal ID", internalId)
                    log.debug("Checked", checked)
                }

                scriptContext.response.write({ output: '<h1>Data Received...</h1>' })
            }

        }

        return { onRequest }
});