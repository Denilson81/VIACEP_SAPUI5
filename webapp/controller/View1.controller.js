sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel, MessageBox) {
		"use strict";

		return Controller.extend("pina.project1.controller.View1", {
             url:"https://viacep.com.br/ws/", 

			onInit: function () {

			},
			onGetCep: function(oEvent){
				
				var cep    = this.getView().byId("cep").getValue();
				var url    = this.url + cep + "/json/";
				var oModel = new JSONModel(url);		
                
				this.getView().setModel(oModel);
                var that = this; 
				oModel.attachRequestCompleted( function(){ 
                    if(this.getData().erro){
						that.onClear();
						MessageBox.error("CEP Inválido" );
						
					}                     
				})
			},

			onClear: function(oEvent){
				
				var initModel = {};
				var oModel = new JSONModel(initModel);
				this.getView().setModel(oModel)
				this.getView().byId("cep").setValue("");
				this.getView().byId("localidade").setValue("");

			},

			onChange: function(oEvent){
				var oBuscar = this.getView().byId("btBuscar");

				if (oEvent.getSource().getValue().length == 8 ){
                    oBuscar.setEnabled(true);
				}else{
					oBuscar.setEnabled(false);
				}
			}
		});
	});
