sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("johwen.controller.ControlCenter", {
		
		onInit: function(){
		var oModel = new sap.ui.model.json.JSONModel('http://192.168.0.38/api/1Jw5SfY1HEMYyDNgj6dRXhAWtuN7vefZOWRvyCG1/lights');		
	
        this.getView().setModel(oModel,'lights');
		},

        onPauseMusic: function () {
            new sap.ui.model.json.JSONModel('http://192.168.0.249:3001/raumfeld/renderer/Wohnbereich/pause')
        },

        onPlayMusic: function () {
            new sap.ui.model.json.JSONModel('http://192.168.0.249:3001/raumfeld/renderer/Wohnbereich/play')
        },


    });
});
