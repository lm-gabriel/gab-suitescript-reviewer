/**
 *@NApiVersion 2.1
 *@NScriptType Portlet
 */

// This sample creates a portlet that displays simple HTML
define([], function() {
    function render(params) {
        params.portlet.title = 'My Portlet'

        const content = '<td><span><b>Hello, this is an example of inline portlet!</b></span></td>'
        
        params.portlet.html = content
    }

    return {
        render: render
    }
})