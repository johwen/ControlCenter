/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/layout/ResponsiveFlowLayout','sap/ui/layout/ResponsiveFlowLayoutData','./FormLayout','sap/ui/layout/library'],function(q,R,a,F,l){"use strict";var b=F.extend("sap.ui.layout.form.ResponsiveLayout",{metadata:{library:"sap.ui.layout"}});sap.ui.core.Control.extend("sap.ui.layout.form.ResponsiveLayoutPanel",{metadata:{aggregations:{"content":{type:"sap.ui.layout.ResponsiveFlowLayout",multiple:false}},associations:{"container":{type:"sap.ui.layout.form.FormContainer",multiple:false},"layout":{type:"sap.ui.layout.form.ResponsiveLayout",multiple:false}}},getLayoutData:function(){var C=sap.ui.getCore().byId(this.getContainer());var L=sap.ui.getCore().byId(this.getLayout());var i;if(L&&C){i=L.getLayoutDataForElement(C,"sap.ui.layout.ResponsiveFlowLayoutData");}return i;},getCustomData:function(){var C=sap.ui.getCore().byId(this.getContainer());if(C){return C.getCustomData();}},refreshExpanded:function(){var C=sap.ui.getCore().byId(this.getContainer());if(C){if(C.getExpanded()){this.$().removeClass("sapUiRLContainerColl");}else{this.$().addClass("sapUiRLContainerColl");}}},renderer:function(r,P){var C=sap.ui.getCore().byId(P.getContainer());var L=sap.ui.getCore().byId(P.getLayout());var i=P.getContent();if(!C||!L){return;}var E=C.getExpandable();var t=C.getTooltip_AsString();var T=C.getToolbar();var j=C.getTitle();r.write("<div");r.writeControlData(P);r.addClass("sapUiRLContainer");if(E&&!C.getExpanded()){r.addClass("sapUiRLContainerColl");}if(T){r.addClass("sapUiFormContainerToolbar");}else if(j){r.addClass("sapUiFormContainerTitle");}if(t){r.writeAttributeEscaped('title',t);}r.writeClasses();L.getRenderer().writeAccessibilityStateContainer(r,C);r.write(">");if(T){r.renderControl(T);}else if(C.getTitle()){L.getRenderer().renderTitle(r,j,C._oExpandButton,E,false,C.getId());}if(i){r.write("<div");r.addClass("sapUiRLContainerCont");r.writeClasses();r.write(">");r.renderControl(i);r.write("</div>");}r.write("</div>");}});b.prototype.init=function(){this.mContainers={};this._defaultLayoutData=new a({margin:false});};b.prototype.exit=function(){var t=this;for(var C in this.mContainers){m(t,C);}if(this._mainRFLayout){this._mainRFLayout.destroy();delete this._mainRFLayout;}this._defaultLayoutData.destroy();delete this._defaultLayoutData;};b.prototype.onBeforeRendering=function(E){var i=this.getParent();if(!i||!(i instanceof sap.ui.layout.form.Form)){return;}i._bNoInvalidate=true;var t=this;_(t,i);o(t,i);i._bNoInvalidate=false;};b.prototype.contentOnAfterRendering=function(i,C){F.prototype.contentOnAfterRendering.apply(this,arguments);if(C.getWidth&&(!C.getWidth()||C.getWidth()=="auto")&&(!C.getFormDoNotAdjustWidth||!C.getFormDoNotAdjustWidth())){C.$().css("width","100%");}};b.prototype.toggleContainerExpanded=function(C){var s=C.getId();if(this.mContainers[s]&&this.mContainers[s][0]){var P=this.mContainers[s][0];P.refreshExpanded();}};b.prototype.onLayoutDataChange=function(E){var s=E.srcControl;var C;var i;var j;if(s instanceof sap.ui.layout.form.FormContainer){if(this._mainRFLayout){this._mainRFLayout.onLayoutDataChange(E);}}else if(s instanceof sap.ui.layout.form.FormElement){i=s.getParent().getId();if(this.mContainers[i]&&this.mContainers[i][1]){this.mContainers[i][1].onLayoutDataChange(E);}}else{var P=s.getParent();if(P instanceof sap.ui.layout.form.FormElement){C=P.getParent();i=C.getId();j=P.getId();if(this.mContainers[i]&&this.mContainers[i][2]&&this.mContainers[i][2][j]){this.mContainers[i][2][j][0].onLayoutDataChange(E);}}}};b.prototype.onsapup=function(E){this.onsapleft(E);};b.prototype.onsapdown=function(E){this.onsapright(E);};b.prototype.getContainerRenderedDomRef=function(C){if(this.getDomRef()){var s=C.getId();if(this.mContainers[s]){if(this.mContainers[s][0]){var P=this.mContainers[s][0];return P.getDomRef();}else if(this.mContainers[s][1]){var r=this.mContainers[s][1];return r.getDomRef();}}}return null;};b.prototype.getElementRenderedDomRef=function(E){if(this.getDomRef()){var C=E.getParent();var s=E.getId();var i=C.getId();if(this.mContainers[i]){if(this.mContainers[i][2]){var r=this.mContainers[i][2];if(r[s]){var j=r[s][0];return j.getDomRef();}}}}return null;};function _(L,j){var C=j.getFormContainers();var r;var s;var t=C.length;var v=0;var P;var u;var i=0;for(i=0;i<t;i++){r=C[i];r._checkProperties();if(r.getVisible()){v++;s=r.getId();P=undefined;u=undefined;if(L.mContainers[s]&&L.mContainers[s][1]){u=L.mContainers[s][1];}else{u=f(L,r,undefined);}var T=r.getTitle();var w=r.getToolbar();if(w||T||r.getExpandable()){if(L.mContainers[s]&&L.mContainers[s][0]){P=L.mContainers[s][0];}else{P=c(L,r,u);g(u,true);}u.removeStyleClass("sapUiRLContainer");}else{if(L.mContainers[s]&&L.mContainers[s][0]){d(L.mContainers[s][0]);g(u,false);}u.addStyleClass("sapUiRLContainer");}var x=e(L,r,u);L.mContainers[s]=[P,u,x];}}var O=p(L.mContainers);if(v<O){for(s in L.mContainers){var y=false;for(i=0;i<t;i++){r=C[i];if(s==r.getId()&&r.getVisible()){y=true;break;}}if(!y){m(L,s);}}}}function c(L,C,r){var s=C.getId();var P=new sap.ui.layout.form.ResponsiveLayoutPanel(s+"--Panel",{container:C,layout:L,content:r});return P;}function d(P){P.setContent("");P.setLayout("");P.setContainer("");P.destroy();}function e(L,C,j){var s=C.getId();var E=C.getFormElements();var r=E.length;var v=0;var t={};if(L.mContainers[s]&&L.mContainers[s][2]){t=L.mContainers[s][2];}var u;var w;var x=-1;var y;var z;var i=0;for(i=0;i<r;i++){y=E[i];if(y.getVisible()){z=y.getId();n(L,C,y,t,j,i);if(t[z]){u=t[z][0];x=j.indexOfContent(u);if(x!=v){j.removeContent(u);j.insertContent(u,v);x=v;}}else{u=f(L,C,y);u.addStyleClass("sapUiRLElement");if(y.getLabel()){u.addStyleClass("sapUiRLElementWithLabel");}t[z]=[u,undefined];x++;j.insertContent(u,x);}var A=y.getFields();if(y.getLabel()&&A.length>1){if(t[z][1]){w=t[z][1];}else{w=f(L,C,y,true);w.addStyleClass("sapUiRLElementFields");t[z][1]=w;}h(L,w,A);}else{if(t[z][1]){w=t[z][1];k(w);t[z][1]=undefined;}}v++;}}var O=p(t);if(v<O){for(z in t){var B=false;for(i=0;i<r;i++){y=E[i];if(z==y.getId()&&y.getVisible()){B=true;break;}}if(!B){if(t[z][1]){w=t[z][1];k(w);}u=t[z][0];j.removeContent(u);k(u);delete t[z];}}}return t;}function f(L,C,E,i){var I;if(E&&!i){I=E.getId()+"--RFLayout";}else if(E&&i){I=E.getId()+"--content--RFLayout";}else if(C){I=C.getId()+"--RFLayout";}else{return false;}var r=new R(I);r.__myParentLayout=L;r.__myParentContainerId=C.getId();if(E){r.__myParentElementId=E.getId();if(!i){r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){var j=[];var s=E.getLabelControl();var t=E.getFields();if(!s||t.length<=1){j=t;if(s){j.unshift(s);}}else{var L=this.__myParentLayout;var u=this.__myParentContainerId;var v=E.getId();if(s){j.push(s);}if(L.mContainers[u]&&L.mContainers[u][2]&&L.mContainers[u][2][v]&&L.mContainers[u][2][v][1]){j.push(L.mContainers[u][2][v][1]);}}return j;}else{return false;}};r._addContentClass=function(j,s){if(s==0){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){var t=E.getLabelControl();if(j==t){return"sapUiFormElementLbl";}}}return null;};}else{r.getContent=function(){var E=sap.ui.getCore().byId(this.__myParentElementId);if(E){return E.getFields();}else{return false;}};}}else if(C){r._getAccessibleRole=function(){var C=sap.ui.getCore().byId(this.__myParentContainerId);var L=this.__myParentLayout;if(L._mainRFLayout&&!C.getToolbar()&&!C.getTitle()&&!C.getExpandable()){return"form";}};}if((E&&!i)||(!E&&!C.getToolbar()&&!C.getTitle()&&!C.getExpandable())){g(r,false);}else{r.setLayoutData(new a({margin:false}));}return r;}function g(r,O){if(O){if(r.__originalGetLayoutData){r.getLayoutData=r.__originalGetLayoutData;delete r.__originalGetLayoutData;}}else if(!r.__originalGetLayoutData){r.__originalGetLayoutData=r.getLayoutData;r.getLayoutData=function(){var L=this.__myParentLayout;var C=sap.ui.getCore().byId(this.__myParentContainerId);var E=sap.ui.getCore().byId(this.__myParentElementId);var i;if(E){i=L.getLayoutDataForElement(E,"sap.ui.layout.ResponsiveFlowLayoutData");}else if(C){i=L.getLayoutDataForElement(C,"sap.ui.layout.ResponsiveFlowLayoutData");}if(i){return i;}else if(E){return L._defaultLayoutData;}};}}function h(L,r,j){var s;var w=0;for(var i=0;i<j.length;i++){var t=j[i];s=L.getLayoutDataForElement(t,"sap.ui.layout.ResponsiveFlowLayoutData");if(s){w=w+s.getWeight();}else{w++;}}s=r.getLayoutData();if(s){s.setWeight(w);}else{r.setLayoutData(new a({weight:w}));}}function k(r){if(r.__myParentContainerId){r.__myParentContainerId=undefined;}if(r.__myParentElementId){r.__myParentElementId=undefined;}r.__myParentLayout=undefined;r.destroy();}function m(L,C){var i=L.mContainers[C];var r;var E=i[2];if(E){for(var s in E){if(E[s][1]){k(E[s][1]);}r=E[s][0];k(r);delete E[s];}}r=i[1];if(r){r.removeAllContent();k(r);}var P=i[0];if(P){d(P);}delete L.mContainers[C];}function n(L,C,E,r,i,I){var s=E.getId();var j=s+"--RFLayout";var t=sap.ui.getCore().byId(j);if(!r[s]&&t){var O=t.__myParentContainerId;r[s]=L.mContainers[O][2][s];i.insertContent(t,I);t.__myParentContainerId=C.getId();if(r[s][1]){r[s][1].__myParentContainerId=C.getId();}delete L.mContainers[O][2][s];}}function o(L,r){var C=r.getFormContainers();var v=[];var s;var t=0;var u=0;var i=0;var j=0;for(i=0;i<C.length;i++){s=C[i];if(s.getVisible()){t++;v.push(s);}}if(t>1){if(!L._mainRFLayout){L._mainRFLayout=new R(r.getId()+"--RFLayout").setParent(L);}else{var w=L._mainRFLayout.getContent();u=w.length;var E=false;for(i=0;i<u;i++){var x=w[i];s=undefined;if(x.getContainer){s=sap.ui.getCore().byId(x.getContainer());}else{s=sap.ui.getCore().byId(x.__myParentContainerId);}if(s&&s.getVisible()){var V=v[j];if(s!=V){E=true;break;}var y=L.mContainers[s.getId()];if(y[0]&&y[0]!=x){E=true;break;}if(!y[0]&&y[1]&&y[1]!=x){E=true;break;}j++;}else{L._mainRFLayout.removeContent(x);}}if(E){L._mainRFLayout.removeAllContent();u=0;}}if(u<t){var S=0;if(u>0){S=u--;}for(i=S;i<t;i++){s=v[i];var z=s.getId();if(L.mContainers[z]){if(L.mContainers[z][0]){L._mainRFLayout.addContent(L.mContainers[z][0]);}else if(L.mContainers[z][1]){L._mainRFLayout.addContent(L.mContainers[z][1]);}}}}}}function p(O){var L=0;if(!Object.keys){q.each(O,function(){L++;});}else{L=Object.keys(O).length;}return L;}return b;},true);
