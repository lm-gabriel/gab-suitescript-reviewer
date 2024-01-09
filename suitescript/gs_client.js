/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/record'], function(record) {
    function pageInit(context) {
        if (context.mode !== 'create') {
            return;
        }

        var currentRecord = context.currentRecord;
        var vendorId = 6097
        currentRecord.setValue({ fieldId: 'entity', value: vendorId })
    }

    // function fieldChanged(context) {
    //     var currentRecord = context.currentRecord
    //     var sublistName = context.sublistId
    //     var sublistFieldName = context.fieldId

    //     if (sublistName === 'item' && sublistFieldName === 'item') {
    //         currentRecord.setValue({
    //             fieldId: 'memo',
    //             value: 'Item: ' + currentRecord.getCurrentSublistValue({
    //                 sublistId: 'item',
    //                 fieldId: 'item'
    //             }) + ' is selected'
    //         })
    //     }
    // }

    function saveRecord(context) {
        var currentRecord = context.currentRecord;

        if (currentRecord.getLineCount({sublistId: 'item'}) < 1) {
            alert('At least 1 item is required for entering a purchase order.')
            return
        }

        return true
    }
    
    /** CHANGE THE CODE BELOW */

    // function lineInit(context) {
    //     var currentRecord = context.currentRecord;
    //     var sublistName = context.sublistId;
    //     if (sublistName === 'partners')
    //         currentRecord.setCurrentSublistValue({
    //             sublistId: sublistName,
    //             fieldId: 'partner',
    //             value: '55'
    //         });
    // }

    // function sublistChanged(context) {
    //     var currentRecord = context.currentRecord;
    //     var sublistName = context.sublistId;
    //     if (sublistName === 'item')
    //         // currentRecord.getCurrentSublistIndex(options)
    //         currentRecord.setCurrentSublistValue({
    //             sublistId: sublistName,
    //             fieldId: 'rate',
    //             value: '55'
    //         });

    //         // currentRecord.setValue({
    //         //     fieldId: 'memo',
    //         //     value: 'Total has changed to ' + currentRecord.getValue({fieldId: 'total'}) + 
    //         //            'with operation: ' + op
    //         // });
    // }

    function postSourcing(context) {
        const currentRecord = context.currentRecord
        const sublistId = context.sublistId
        const fieldId = context.fieldId

        if (sublistId === 'item' && fieldId === 'item') {
            if (currentRecord.getCurrentSublistValue({ sublistId: sublistId, fieldId: fieldId })) {
                currentRecord.setCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: 'rate',
                    value: 200
                })
            }
        }
    }

    return {
        pageInit: pageInit,
        postSourcing: postSourcing,
        saveRecord: saveRecord,
    }
})