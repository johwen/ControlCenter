/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){'use strict';var N={};var c='sapMNLG';var a='sapMNLB';var b='sapMLIB';var d='sapMNLB-AuthorPicture';var e='sapMNLB-Header';var f='sapMNLG-Header';var g='sapMNLG-Body';var h='sapMNLB-SubHeader';var i='sapMNLG-SubHeader';var j='sapMNLB-CloseButton';var k='sapMNLB-Priority';var l='sapMNLG-Details';var m='sapMNLB-Bullet';var n='sapMNLG-Description';var o='sapMNLG-Collapsed';var p='sapMNLGNoHdrFooter';var q='sapMNLG-MaxNotifications';var r='sapMNLG-NoNotifications';N.render=function(R,C){if(C.getVisible()){var v=C._getVisibleItemsCount();var _=C.getShowEmptyGroup()||(v>0);R.write('<li');R.addClass(c);R.addClass(a);R.addClass(b);if(!_){R.addClass(p);}if(C.getCollapsed()){R.addClass(o);}if(v==0){R.addClass(r);}R.writeClasses();R.writeControlData(C);R.writeAttribute('tabindex','0');R.writeAccessibilityState(C,{labelledby:C._ariaLabbeledByIds});R.write('>');if(_){this.renderHeader(R,C);this.renderSubHeader(R,C);this.renderBody(R,C);}R.write('</li>');}else{this.renderInvisibleItem(R,C);}};N.renderHeader=function(R,C){R.write('<div');R.addClass(e);R.addClass(f);R.writeClasses();R.write('>');this.renderInvisibleInfoText(R,C);this.renderPriorityArea(R,C);this.renderCloseButton(R,C);this.renderTitle(R,C);this.renderDetails(R,C);R.write('</div>');};N.renderTitle=function(R,C){R.renderControl(C._getHeaderTitle());};N.renderCloseButton=function(R,C){if(C.getShowCloseButton()){R.renderControl(C.getAggregation('_closeButton').addStyleClass(j));}};N.renderAuthorPicture=function(R,C){if(!C.getAuthorPicture()){return;}R.write('<div');R.addClass(d);R.writeClasses();R.write('>');R.renderControl(C._getAuthorImage());R.write('</div>');};N.renderDetails=function(R,C){R.write('<div class="'+l+'">');this.renderAuthorPicture(R,C);R.write('<div class="'+n+'">');this.renderAuthorName(R,C);if(C.getAuthorName()!=""&&C.getDatetime()!=""){R.write('<span class="'+m+'">&#x00B7</span>');}this.renderDatetime(R,C);R.write('</div></div>');};N.renderInvisibleInfoText=function(R,C){R.renderControl(C.getAggregation('_ariaDetailsText'));};N.renderAuthorName=function(R,C){R.renderControl(C._getAuthorName());};N.renderSubHeader=function(R,C){var s=C.getButtons();R.write('<div');R.addClass(i);R.addClass(h);R.writeClasses();R.write('>');this.renderPriorityArea(R,C);this.renderCollapseGroupButton(R,C);if(s&&s.length&&C.getShowButtons()){R.renderControl(C.getAggregation('_overflowToolbar'));}R.write('</div>');};N.renderPriorityArea=function(R,C){R.write('<div');var s='';var t=C.getPriority();switch(t){case(sap.ui.core.Priority.Low):s='sapMNLB-Low';break;case(sap.ui.core.Priority.Medium):s='sapMNLB-Medium';break;case(sap.ui.core.Priority.High):s='sapMNLB-High';break;default:s='sapMNLB-None';break;}R.addClass(k);R.addClass(s);R.writeClasses();R.write('>');R.write('</div>');};N.renderCollapseGroupButton=function(R,C){R.renderControl(C.getAggregation('_collapseButton'));};N.renderInvisibleItem=function(R,C){R.write("<li");R.writeInvisiblePlaceholderData(C);R.write(">");R.write("</li>");};N.renderBody=function(R,C){R.write('<ul class='+g+'>');this.renderNotifications(R,C);if(C._maxNumberReached){this.renderMaxNumberReachedMessage(R,C);}R.write('</ul>');};N.renderDatetime=function(R,C){R.renderControl(C._getDateTimeText());};N.renderNotifications=function(R,C){var s=C.getItems();var t=s.length;if(t){for(var u=0;u<C._maxNumberOfNotifications;u++){R.renderControl(s[u]);}}};N.renderMaxNumberReachedMessage=function(R,C){var s='<span>'+C._maxNumberOfNotificationsTitle+'</span> <br>'+C._maxNumberOfNotificationsBody;R.write('<div');R.addClass(q);R.writeClasses();R.write('>');R.write(s);R.write('</div>');};return N;},true);
