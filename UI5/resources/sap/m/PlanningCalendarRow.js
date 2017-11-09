/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','./StandardListItem','./StandardListItemRenderer','sap/ui/core/Renderer','./library','sap/ui/unified/library','sap/ui/unified/DateRange','sap/ui/unified/CalendarRow'],function(q,E,S,a,R,l,u,D,C){"use strict";var P=E.extend("sap.m.PlanningCalendarRow",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data"},text:{type:"string",group:"Data"},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Data",defaultValue:false},key:{type:"string",group:"Data",defaultValue:null}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},_nonWorkingDates:{type:"sap.ui.unified.DateRange",multiple:true,visibility:"hidden"}}}});P.PC_FOREIGN_KEY_NAME="relatedToPCDateRange";P.AGGR_NONWORKING_DATES_NAME="_nonWorkingDates";var b=S.extend("CalenderRowHeader",{metadata:{associations:{parentRow:{type:"sap.m.PlanningCalendarRow",multiple:false}}},setParentRow:function(i){this.setAssociation("parentRow",i,true);if(!i){this._oRow=undefined;}else if(typeof i=="string"){this._oRow=sap.ui.getCore().byId(i);}else{this._oRow=i;}return this;},renderer:R.extend(a)});CalenderRowHeaderRenderer.openItemTag=function(r,L){r.write("<div");};CalenderRowHeaderRenderer.closeItemTag=function(r,L){r.write("</div>");};CalenderRowHeaderRenderer.renderTabIndex=function(r,L){};P.prototype.init=function(){var i=this.getId();var c=new b(i+"-Head",{parentRow:this});var o=new C(i+"-CalRow",{checkResize:false,updateCurrentTime:false,ariaLabelledBy:i+"-Head"});o._oPlanningCalendarRow=this;o.getAppointments=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getAppointments();}else{return[];}};o.getIntervalHeaders=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getIntervalHeaders();}else{return[];}};this._oColumnListItem=new sap.m.ColumnListItem(this.getId()+"-CLI",{cells:[c,o]});};P.prototype.exit=function(){if(this._oColumnListItem.getCells()[1]){this._oColumnListItem.getCells()[1].destroy();}this._oColumnListItem.destroy();this._oColumnListItem=undefined;};P.prototype.setTooltip=function(t){this.setAggregation("tooltip",t,true);this._oColumnListItem.getCells()[0].setTooltip(t);return this;};P.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oColumnListItem.getCells()[0].setTitle(t);return this;};P.prototype.setText=function(t){this.setProperty("text",t,true);this._oColumnListItem.getCells()[0].setDescription(t);if(t){this._oColumnListItem.getCells()[1].addStyleClass("sapMPlanCalRowLarge");}else{this._oColumnListItem.getCells()[1].removeStyleClass("sapMPlanCalRowLarge");}return this;};P.prototype.setIcon=function(i){this.setProperty("icon",i,true);this._oColumnListItem.getCells()[0].setIcon(i);return this;};P.prototype.setNonWorkingDays=function(n){this.setProperty("nonWorkingDays",n,true);this.getCalendarRow().setNonWorkingDays(n);return this;};P.prototype.setNonWorkingHours=function(n){this.setProperty("nonWorkingHours",n,true);this.getCalendarRow().setNonWorkingHours(n);return this;};P.prototype.invalidate=function(o){if(!o||!(o instanceof sap.ui.unified.CalendarAppointment)){E.prototype.invalidate.apply(this,arguments);}else if(this._oColumnListItem){this.getCalendarRow().invalidate(o);}};P.prototype.removeAppointment=function(o){var r=this.removeAggregation("appointments",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllAppointments=function(){var r=this.removeAllAggregation("appointments",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyAppointments=function(){var d=this.destroyAggregation("appointments",true);this.getCalendarRow().invalidate();return d;};P.prototype.removeIntervalHeader=function(o){var r=this.removeAggregation("intervalHeaders",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllIntervalHeaders=function(){var r=this.removeAllAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyIntervalHeaders=function(){var d=this.destroyAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return d;};P.prototype.setSelected=function(s){this.setProperty("selected",s,true);this._oColumnListItem.setSelected(s);return this;};P.prototype.getColumnListItem=function(){return this._oColumnListItem;};P.prototype.getCalendarRow=function(){if(!this._oColumnListItem){return null;}return this._oColumnListItem.getCells()[1];};P.prototype.applyFocusInfo=function(f){this.getCalendarRow().applyFocusInfo(f);return this;};P.prototype.addAggregation=function(A,o,s){if(C.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().addAggregation(C.AGGR_NONWORKING_DATES_NAME,this._buildCalendarRowDateRange(o),s);}return E.prototype.addAggregation.apply(this,arguments);};P.prototype.insertAggregation=function(A,o,i,s){if(P.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().insertAggregation(C.AGGR_NONWORKING_DATES_NAME,this._buildCalendarRowDateRange(o),i,s);}return E.prototype.insertAggregation.apply(this,arguments);};P.prototype.removeAggregation=function(A,o,s){var r;if(P.AGGR_NONWORKING_DATES_NAME===A&&this.getAggregation(P.AGGR_NONWORKING_DATES_NAME)){r=this.getCalendarRow().getAggregation(C.AGGR_NONWORKING_DATES_NAME).filter(function(n){return n.data(C.PCROW_FOREIGN_KEY_NAME)===o.getId();});if(r.length){this.getCalendarRow().removeAggregation("_nonWorkingDates",r[0]);}}return E.prototype.removeAggregation.apply(this,arguments);};P.prototype.removeAllAggregation=function(A,s){if(P.AGGR_NONWORKING_DATES_NAME===A){this.getCalendarRow().removeAllAggregation(C.AGGR_NONWORKING_DATES_NAME,s);}return E.prototype.removeAllAggregation.apply(this,arguments);};P.prototype.destroyAggregation=function(A,s){if(P.AGGR_NONWORKING_DATES_NAME===A){if(this.getCalendarRow()){this.getCalendarRow().destroyAggregation(C.AGGR_NONWORKING_DATES_NAME,s);}}return E.prototype.destroyAggregation.apply(this,arguments);};P.prototype._buildCalendarRowDateRange=function(s){var r=new D();if(s.getStartDate()){r.setStartDate(new Date(s.getStartDate().getTime()));}if(s.getEndDate()){r.setEndDate(new Date(s.getEndDate().getTime()));}r.data(C.PCROW_FOREIGN_KEY_NAME,s.getId());return r;};return P;},true);
