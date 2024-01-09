/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * 
 */


define([], function() {
    function showMessage(context) {
        var message = "Completion date is not set!!!!!!!!!";
        var isFilled = context.currentRecord.getValue({
            "fieldId": "completeddate",
        });

        console.log(context.currentRecord);

        if (!isFilled) {
            alert(message);
        }
        
        console.log(isFilled);

    }
    
    return {
        pageInit: showMessage
    }
});

