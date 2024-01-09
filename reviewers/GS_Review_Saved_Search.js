/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
*/


define(['N/search', 'N/log'], function(search, log) {
    /**
     * This script is only intended to be used as a reviewer for
     * saved search. It can be deployed on any record as it will
     * only query items AND will not do any modifications on any
     * data.
     */

    function beforeLoad(context) {
        if (context.type !== context.UserEventType.VIEW) {
            return
        }

        getItemPricing(826)
    }

    function getItemPricing(itemid) {
        var item;
        var searchObject = search.create({
            type: "pricing",
            filters:
            [
                ["currency", "anyof", 1],
                "AND",
                ["item", "anyof", itemid],
                "AND",
                ["internalid", "anyof", 1]
            ],
            columns: 
            [
                search.createColumn({
                    name: "item",
                    sort: search.Sort.ASC,
                    label: "Item",
                }),
                search.createColumn({ name: "quantityrange", label: "Quantity Range" }),
                search.createColumn({ name: "saleunit", label: "Sale Unit" }),
                search.createColumn({ name: "currency", label: "Currency" }),
                search.createColumn({ name: "unitprice", label: "Unit Price" }),
                search.createColumn({
                    name: "baseprice",
                    join: "item",
                    label: "Base Price"
                }),
            ]
        })
        var searchResultCount = searchObject.runPaged().count
        searchObject.run().each(function (result) {
            log.debug("result", result)

            return true
        })
    }

    function getItemsForSale() {
        var item;

        const searchObject = search.create({
            type: "noninventoryitem",
            filters: 
            [
                // ['displayname', search.Operator.ISNOTEMPTY],
                // 'AND',
                ['subtype', search.Operator.ANYOF, 'Sale']
            ],
            columns: [
                search.createColumn({ name: 'itemid', label: 'Item ID' }),
                search.createColumn({ name: 'displayname', label: 'Display Name' })
            ]
        })
        var searchResultCount = searchObject.runPaged().count;
        log.debug("searchObject result count", searchResultCount);
        searchObject.run().each(function (result) {
            item = result.getValue({ name: 'itemid' })

            log.debug('item', item)
            return true
        })
    }

    function getItemsLessThan500() {
        var itemSearchObj = search.create({
            type: "item",
            filters:
            [
               ["price","lessthan","500.00"]
            ],
            columns:
            [
               search.createColumn({
                  name: "itemid",
                  sort: search.Sort.ASC,
                  label: "Name"
               }),
               search.createColumn({name: "displayname", label: "Display Name"}),
               search.createColumn({name: "subtype", label: "SubType"}),
               search.createColumn({name: "salesdescription", label: "Description"}),
               search.createColumn({name: "baseprice", label: "Base Price"})
            ]
         });
         var searchResultCount = itemSearchObj.runPaged().count;
         log.debug("itemSearchObj result count",searchResultCount);
         itemSearchObj.run().each(function(result){
            log.debug('Items', result)
            return true;
         });
    }

    return { beforeLoad }
})
