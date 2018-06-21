

$.index.open();

var Cloud = require('ti.cloud');
var CloudPush = require('ti.cloudpush');

// Cloud.Users.create({
    // email: 'addieljuarez@gmail.com',
    // first_name: 'addiel',
    // last_name: 'Juarez',
    // password: '123456',
    // password_confirmation: '123456'
// }, function (e) {
    // if (e.success) {
        // var user = e.users[0];
        // alert('Success:\n' +
            // 'id: ' + user.id + '\n' +
            // 'sessionId: ' + Cloud.sessionId + '\n' +
            // 'first name: ' + user.first_name + '\n' +
            // 'last name: ' + user.last_name);
    // } else {
        // alert('Error:\n' +
            // ((e.error && e.message) || JSON.stringify(e)));
    // }
// });



Cloud.Users.login({
    login: 'addieljuarez@gmail.com',
    password: '123456'
}, function (e) {
    if (e.success) {
    	
    	Ti.API.info(JSON.stringify(e.success));
    	
    	$.label.text = JSON.stringify(e);
        var user = e.users[0];
        alert('Success:\n' +
            'id: ' + user.id + '\n' +
            'sessionId: ' + Cloud.sessionId + '\n' +
            'first name: ' + user.first_name + '\n' +
            'last name: ' + user.last_name);
            
        cloudStatu();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});



function cloudStatu(){
	CloudPush.retrieveDeviceToken({
	    success: function deviceTokenSuccess(e) {
	        // Use this device token with Ti.Cloud.PushNotifications calls
	        // to subscribe and unsubscribe to push notification channels
	        Ti.API.info('Device Token: ' + e.deviceToken);
	        
	        if(Ti.App.Properties.getString('tokenPush') == null){
	        	Ti.App.Properties.setString('tokenPush', e.deviceToken);
	        }
	        
	        Cloud.PushNotifications.subscribe({
			    channel: 'demo',
			    device_token: e.deviceToken,
			    type:'android',
			}, function (e) {
			    if (e.success) {
			        alert('Success push');
			    } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});
	    },
	    error: function deviceTokenError(e) {
	        alert('Failed to register for push! ' + e.error);
	    }
	});
	// These events monitor incoming push notifications
	CloudPush.addEventListener('callback', function (evt) {
	    alert(evt.payload);
	});
	CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
	    Ti.API.info('Tray Click Launched App (app was not running)');
	});
	CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
	    Ti.API.info('Tray Click Focused App (app was already running)');
	});
}




