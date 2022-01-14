({
	init: function(cmp, event, helper) {
        helper.setColumns(cmp);
       // helper.setData(cmp);
    },

    handleSort: function(cmp, event, helper) {
        helper.handleSort(cmp, event);
    },
     onChange: function (cmp, evt, helper) {
        console.log(cmp.find('select').get('v.value'));
         var selectValue = cmp.find('select').get('v.value');
         
         if(selectValue == 'Recently'){
              helper.setData(cmp, 10);
         }
         else if(selectValue == 'All'){
              helper.setData(cmp, 0);
         }
    }
})