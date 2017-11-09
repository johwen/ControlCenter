/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','./library','sap/ui/unified/CalendarDateInterval','sap/ui/unified/CalendarDateIntervalRenderer'],function(q,C,a,l,b,c){"use strict";var d=b.extend("CalendarWeekInterval",{renderer:c});d.prototype._getDaysLarge=function(){return 6;};d.prototype._handleFocus=function(e){var o=!!e.getParameter("_outsideBorder"),D,f,g;if(o){D=e.getParameter("date");this._oFocusDateWeek=a.fromLocalJSDate(D);f=C._getFirstDateOfWeek(this._oFocusDateWeek);g=this.getAggregation("month")[0];if(g.getDomRef()){this._setStartDate(f,false,true);}}return b.prototype._handleFocus.apply(this,arguments);};d.prototype._adjustFocusedDateUponMonthChange=function(f,i){var n=new a(f),I;n.setDate(1);n.setMonth(n.getMonth()+1);I=this._oPlanningCalendar._dateMatchesVisibleRange(n.toLocalJSDate(),sap.ui.unified.CalendarIntervalType.Week);if(I&&i===n.getMonth()){return;}f.setMonth(i);f.setDate(1);var F=C._getFirstDateOfWeek(f);this._setStartDate(F,false,true);this._oFocusDateWeek=F;f.setYear(F.getYear());f.setMonth(F.getMonth());f.setDate(F.getDate());};d.prototype._adjustFocusedDateUponYearChange=function(f,i){if(!(f&&f instanceof a)){return;}var w=C._getWeek(f),t=new a(f),n;t.setYear(i);t.setDate(t.getDate()-7);n=C._getWeek(t);if(w.week===52&&C._getNumberOfWeeksForYear(i)<53){w.week=51;}while(w.week!==n.week){t.setDate(t.getDate()+1);n=C._getWeek(t);}f.setYear(t.getYear());f.setMonth(t.getMonth());f.setDate(t.getDate());};d.prototype._focusDateExtend=function(D,o,n){var e,L;if(!this._oFocusDateWeek){return b.prototype._focusDateExtend.apply(this,arguments);}e=this.getAggregation("month")[0];L=this._oFocusDateWeek.toLocalJSDate();this._setFocusedDate(this._oFocusDateWeek);e.setDate(L);this._oFocusDateWeek=null;return!n;};d.prototype._dateMatchesVisibleRange=function(D){var i=this.getDays(),o=a.fromLocalJSDate(D),s=a.fromLocalJSDate(this.getStartDate()),e=a.fromLocalJSDate(this.getStartDate());e.setDate(e.getDate()+i);return o.isSameOrAfter(s)&&o.isBefore(e);};return d;},true);
