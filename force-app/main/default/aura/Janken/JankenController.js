({
    doInit: function(component, event, helper) {
        component.set('v.self', 'rock');
        component.set('v.judge', []);
        component.set('v.result', '-');
        component.set('v.style', 'rock');
        //console.log('JankenController.doInit(' + component + ', ' + event + ', ' + helper + ')->self:' + component.get('v.self') + ', judge:' + component.get('v.judge') + ', result:' + component.get('v.result') + ', style:' + component.get('v.style'));
    },
    
    handleClick: function(component, event, helper) {
        var self = component.get('v.self');
        if (self === 'rock') {
            self = 'scissors';
        } else if (self === 'scissors') {
            self = 'paper';
        } else if (self === 'paper') {
            self = 'rock';
        }
        component.set('v.self', self);
        component.set('v.style', self);
        //console.log('JankenController.handleClick(' + component + ', ' + event + ', ' + helper + ')->self:' + component.get('v.self') + ', judge:' + component.get('v.judge') + ', result:' + component.get('v.result') + ', style:' + component.get('v.style'));
    },

    handleAction: function(component, event) {
        var command = event.getParam('command');
        if (command === 'reset') {
            component.set('v.self', 'rock');
        	component.set('v.judge', []);
        	component.set('v.result', '-');
	        component.set('v.style', 'rock');
        }
        if (!(component.get('v.result') === 'x' || component.get('v.result') === 'o')) {
	        if (command === 'next') {
                component.set('v.judge', []);
                var array = ['rock', 'scissors', 'paper'];
                component.set('v.self', array[Math.floor(Math.random() * 3)]);
            } else if (command === 'report') {
                var jankenEvent = $A.get('e.c:JankenEvent');
                jankenEvent.setParams({'name': component.get('v.player')}).setParams({'change': component.get('v.self')}).fire();
            } else if (command === 'judge') {
                var self = component.get('v.self');
                var judge = component.get('v.judge');
                //console.log(component.get('v.player') + ':' + judge);
                var even = false, lost = false, win = false;
                for (var i in judge) {
                    var change = judge[i];
                    if (self === change) {
                        even = true;
                    } else if (self === 'rock' && change === 'paper' || self === 'paper' && change === 'scissors' || self === 'scissors' && change === 'rock') {
                        lost = true;
                    } else if (self === 'rock' && change === 'scissors' || self === 'paper' && change === 'rock' || self === 'scissors' && change === 'paper') {
                        win = true;
                    }
                }
                var result = '-';
                if (even && !lost || win && lost) {
                } else if (win && !lost) {
                    result = 'o';
                } else {
                    result = 'x';
                }
	        	component.set('v.result', result);
                component.set('v.style', self + (result === 'x' ? 'Lost' : ''));
            }
	    }
        //console.log('JankenController.handleAction(' + component + ', ' + event + ')->self:' + component.get('v.self') + ', judge:' + component.get('v.judge') + ', result:' + component.get('v.result') + ', style:' + component.get('v.style'));
    },
    
    handleEvent: function(component, event) {
        if (event.getParam('name') !== component.get('v.player')) {
        	component.get('v.judge').push(event.getParam('change'));
        }
        //console.log('JankenController.handleEvent(' + component + ', ' + event + ')->self:' + component.get('v.self') + ', judge:' + component.get('v.judge') + ', result:' + component.get('v.result') + ', style:' + component.get('v.style'));
    },
 
})