/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
 define(['N/record', 'N/log'], function(record, log) {
    function pageInit(context) {
        log.debug({ title: "Entry point", details: "pageInit" })
        console.log("pageInit Triggered")
    }

    function postSourcing(context) {
        console.log("postSourcing Triggered: ", context.fieldId)

        if (context.sublistId === 'item' && context.fieldId === 'item') {
            context.currentRecord.setCurrentSublistValue({
                sublistId: context.sublistId,
                fieldId: 'isclosed',
                value: true
            })
        }
    }

    function lineInit(context) {
        // This function is called when a line is initialized. This happens when clicking 
        // any existing line or when clicking the empty line at the bottom of the sublist
        console.log("lineInit triggered")

        var currentRecord = context.currentRecord

        if (context.sublistId === "item") {
            currentRecord.setCurrentSublistValue({
                sublistId: "item",
                fieldId: "quantity",
                value: 5
            })
        }
    }

    function validateField(context) {
        console.log("validateField Triggered")

        if (context.fieldId === "memo") {
            var memoValue = context.currentRecord.getValue("memo")
            console.log("memoValue", memoValue)

            if (memoValue === "UI") {
                return true
            } else {
                return false
            }
        }
    }
    
    function fieldChanged(context) {
        console.log("fieldChanged Triggered")

        if (context.sublistId === "item" && context.fieldId === "item") {
            console.log("item field has been changed")
        }
    }

    function validateInsert(context) {
        console.log("validateInsert Triggered on sublistId: ", context.sublistId)

        if (context.sublistId === "item") {
            var itemId = context.currentRecord.getCurrentSublistValue({
                sublistId: "item",
                fieldId: "item",
            })

            console.log("itemId", itemId)

            if (parseInt(itemId) === 1395400) {
                return true
            } else {
                console.log("Use a valid item...")
                return false
            }
        }

        return true
    }

    function validateDelete(context) {
        console.log("validateDelete Triggered on sublistId: ", context.sublistId)

        if (context.sublistId === "item") {
            var intQuantity = context.currentRecord.getCurrentSublistValue({
                sublistId: "item",
                fieldId: "quantity"
            })

            console.log("intQuantity: ", intQuantity)

            if (parseInt(intQuantity) === 1) {
                return true
            } else {
                alert("quantity is more than 1, you can't delete this line")
                return false
            }
        }
        
        return true
    }

    function sublistChanged(context) {
        // this function will always be triggered last among other entry points
        console.log("sublistChanged Triggered")

        var currentRecord = context.currentRecord
        var strOperation = context.operation

        console.log("strOperation", strOperation)

        if (context.sublistId === "item") {
            currentRecord.setValue({
                fieldId: "memo",
                value: "Tptal has changed to " + currentRecord.getValue({
                    fieldId: "total"
                }) + " with operation: " + strOperation
            })
        }
    }

    function saveRecord(context) {
        // this function could also be used to validate the form before saving its

        console.log("saveRecord Triggered")
        var currentRecord = context.currentRecord
        var intItemLineCount = currentRecord.getLineCount({ sublistId: "item" })
        console.log("Item line count ", intItemLineCount)

        if (intItemLineCount < 2) {
            alert("Minimum of 2 lines are required for this transaction")
            
            return false
        }

        return true
    }

    return {
        pageInit: pageInit,
        postSourcing: postSourcing,
        lineInit: lineInit,
        validateField: validateField,
        fieldChanged: fieldChanged,
        validateField: validateField,
        validateInsert: validateInsert,
        validateDelete: validateDelete,
        sublistChanged: sublistChanged,
        saveRecord: saveRecord
    }
})