/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/log'],

    (record, log) => {

        const each = (params) => {
            try {
                // Log the parameters for debugging purposes
                log.debug("params ", JSON.stringify(params));

                // using record.delete API to DELETE
                var objRecordId = record.delete({
                    type: params.type,
                    id: params.id
                });

                // Log the ID of the deleted record
                log.debug("Deleted Record with Id ", objRecordId);
            } catch (error) {
                // Log any errors that occur during the deletion process
                log.debug(`Error in Deleting the record with Type : ${params.type} and Id : ${params.id}`, error.message);
            }
        }

        return { each: each }
    });