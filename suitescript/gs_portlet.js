/**
 *@NApiVersion 2.1
 *@NScriptType Portlet
 */

// This sample creates a portlet that includes a simple form with a text field and a submit button
define([], function() {
    function render(params) {
        const portlet = params.portlet

        portlet.title = 'Sample Form Portlet'
        
        const fld = portlet.addField({
            id: 'text',
            type: 'text',
            label: 'Text'
        })

        fld.updateLayoutType({
            layoutType: 'normal'
        })

        fld.updateBreakType({
            breakType: 'startcol'
        })

        portlet.setSubmitButton({
            url: 'http://httpbin.org/post',
            label: 'Submit',
            target: '_top'
        })
    }

    return {
        render: render
    }
}) 

        