require(['N/search'], function(search) {
    var params = {
        type: search.Type.PURCHASE_ORDER,
        filters: [
            ['entity', search.Operator.EQUALTO, 6097]
        ]
    }

    search
     .create(params)
     .run()
     .each(processResult)

    function processResult(result) {
        // code here...

        return true
    }
})