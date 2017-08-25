({
    play: function(component, event, helper) {
        //console.log(component.get('v.name') + ', play().start');
        var commands = component.get('v.command').split(',');
        for (var i in commands) {
            var jankenAction = $A.get('e.c:JankenAction');
            jankenAction.setParams({'command': commands[i]}).fire();
		}
        //console.log(component.get('v.name') + ', play().end');
    },
    
})