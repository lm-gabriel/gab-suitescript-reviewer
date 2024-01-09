/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */

define(['N/search'], function(search) {
    function render(params) {
        const portlet = params.portlet

        portlet.title = "My List"

        portlet.addColumn({
            id: 'internalid',
            type: 'text',
            label: 'Internal ID',
            align: 'LEFT'
        })

        portlet.addColumn({
            id: 'entity',
            type: 'text',
            label: 'Vendor',
            align: 'LEFT'
        })

        portlet.addColumn({
            id: 'status',
            type: 'text',
            label: 'Status',
            align: 'LEFT'
        })

        const customerSearch = search.create({
            type: search.Type.PURCHASE_ORDER,
            filters: [['entity', search.Operator.IS, 6097], 'AND', ['mainline', search.Operator.IS, 'T']],
            columns: ['internalid', 'entity', 'status']
        })

        customerSearch.run().each(function(result) {
            portlet.addRow(result.getAllValues())
            return true
        })
    }

    return {
        render: render
    }
}) 

        