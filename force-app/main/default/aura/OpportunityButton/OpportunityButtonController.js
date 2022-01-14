({
	handleClick : function(component, event, helper) {
		 $A.createComponent('c:OpportunityChildCmp', {
           // title: 'Please enter your name',
             
        }, function attachModal(modalCmp, status) {
            if (component.isValid() && status === 'SUCCESS') {
                var body = component.get("v.body");
                body.push(modalCmp);
                component.set("v.body", body);    
            }
        });
	}
})