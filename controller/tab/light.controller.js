sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("johwen.controller.tab.light", {
		
		onInit: function(){
		this.HOST = "http://192.168.0.38";
		this.userToken = "1Jw5SfY1HEMYyDNgj6dRXhAWtuN7vefZOWRvyCG1";	
		this.API_URL = this.HOST + "/api/";
		this.LIGHTS_ENDPOINT = this.API_URL + this.userToken + "/lights/";

		},

		onLightSwitchChange: function(oControlEvent){
			var state = {};
			state.on = oControlEvent.getParameters().state;
			var lightId = (parseInt(oControlEvent.getParameters().id.charAt(19))+1);
			this.lightSwitchState(state,lightId, function(){alert("success")}, function(){alert("error")});

		},

		
		lightSwitchState: function(state,lightId,successFN,errorFN){
		
			jQuery.ajax({
			  type: "PUT",
			  data: JSON.stringify(state),
			  crossDomain: true,
			  url: this.LIGHTS_ENDPOINT + lightId + "/state",

			  contentType: "application/json",
			  success: function (res, status, xhr) {
				successFN();
				    
			  },
			  error: function (jqXHR, textStatus, errorThrown) {
				console.log("Got an error response: " + textStatus + errorThrown);
				errorFN();
			  }
			});; 		

		}


    });
});
