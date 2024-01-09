/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/runtime', 'N/log'],

    (record, runtime, log) => {

        const execute = (context) => {
            try {
                const script = runtime.getCurrentScript()
                log.debug({
                    "title": "Governance Monitoring Beginning",
                    "details": "Remaining Usage = " + script.getRemainingUsage()
                })

                for (var i = 1; i <= 334; i++) {
                    // load the SO -> 10 usage units
                    const objRecord = record.load({
                        type: record.Type.SALES_ORDER,
                        id: 43913
                    })

                    // save the SO -> 20 Usage Units
                    objRecord.save()

                    log.debug({
                        "title": "Governance Monitoring after each record load & save: " + i,
                        "details": "Remaining Usage = " + script.getRemainingUsage()
                    })
                }

                log.debug({
                    "title": "Governance Monitoring End",
                    "details": "Remaining Usage = " + script.getRemainingUsage()
                })

            } catch (error) {
                log.error("Error in Scheduled Script", error.message)
            }
        }

        return { execute: execute }
    });