({
    doInit : function(component, event, helper) {
        var pageRef = component.get('v.pageReference');
        var prepertyValue = pageRef.state.c__prepertyValue;
        console.log('prepertyValue----'+prepertyValue);
        component.set('v.prepertyValue', prepertyValue);

    }
})