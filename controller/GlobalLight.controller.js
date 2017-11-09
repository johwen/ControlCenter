sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("johwen.controller.GlobalLight", {
		
		onInit: function(){
		
        },

		lightSwitchState: function(state){
		
			jQuery.ajax({
			  type: "PUT",
			  data: JSON.stringify(statte),
			  crossDomain: true,
			  url: "http://192.168.0.38/api/1Jw5SfY1HEMYyDNgj6dRXhAWtuN7vefZOWRvyCG1/lights/"+(parseInt(oControlEvent.getParameters().id.charAt(19))+1)+"/state",

			  contentType: "text/plain",
			  success: function (res, status, xhr) {
				    alert("success");
			  },
			  error: function (jqXHR, textStatus, errorThrown) {
				alert("error");
				console.log("Got an error response: " + textStatus + errorThrown);
			  }
			});; 		

		}


    });
});
