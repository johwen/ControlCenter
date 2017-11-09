/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./AnalyticalColumn','./Table','./TreeTable','./library','sap/ui/model/analytics/ODataModelAdapter','sap/ui/model/SelectionModel','sap/ui/model/Sorter','sap/ui/base/ManagedObject','sap/ui/core/Popup','sap/ui/unified/Menu','sap/ui/unified/MenuItem','./TableUtils'],function(q,A,T,a,b,O,S,c,M,P,d,e,f){"use strict";var G=b.GroupEventType,g=b.SelectionBehavior,h=b.SelectionMode,k=b.SortOrder,m=b.TreeAutoExpandMode;var n=T.extend("sap.ui.table.AnalyticalTable",{metadata:{library:"sap.ui.table",properties:{sumOnTop:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},numberOfExpandedLevels:{type:"int",group:"Misc",defaultValue:0,deprecated:true},autoExpandMode:{type:"string",group:"Misc",defaultValue:"Bundled",deprecated:true},columnVisibilityMenuSorter:{type:"any",group:"Appearance",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true},dirty:{type:"boolean",group:"Appearance",defaultValue:null,deprecated:true}},designTime:true},renderer:"sap.ui.table.TableRenderer"});n.prototype._getFixedBottomRowContexts=function(){var B=this.getBinding("rows");if(B){return[B.getGrandTotalNode()];}};n.prototype._getContexts=a.prototype._getContexts;n.prototype.init=function(){T.prototype.init.apply(this,arguments);this.addStyleClass("sapUiAnalyticalTable");this.attachBrowserEvent("contextmenu",this._onContextMenu);this.setSelectionMode(h.MultiToggle);this.setShowColumnVisibilityMenu(true);this.setEnableColumnFreeze(true);this.setEnableCellFilter(true);this._aGroupedColumns=[];this._bSuspendUpdateAnalyticalInfo=false;f.Grouping.setGroupMode(this);};n.prototype.exit=function(){this._cleanupGroupHeaderMenu();T.prototype.exit.apply(this,arguments);};n.prototype._adaptLocalization=function(r,l){T.prototype._adaptLocalization.apply(this,arguments);if(l){this._cleanupGroupHeaderMenu();}};n.prototype.setFixedRowCount=function(){q.sap.log.error("The property fixedRowCount is not supported by control sap.ui.table.AnalyticalTable!");return this;};n.prototype.setFixedBottomRowCount=function(){q.sap.log.error("The property fixedBottomRowCount is managed by control sap.ui.table.AnalyticalTable!");return this;};n.prototype.setDirty=function(D){q.sap.log.error("The property dirty of control sap.ui.table.AnalyticalTable is deprecated. Please use showOverlay instead.");this.setProperty("dirty",D,true);this.setShowOverlay(this.getDirty());return this;};n.prototype.setEnableGrouping=function(E){q.sap.log.error("The property enableGrouping is not supported by control sap.ui.table.AnalyticalTable!");return this;};n.prototype.getModel=function(N){var o=T.prototype.getModel.apply(this,arguments);var r=this.getBindingInfo("rows");if(o&&r&&r.model==N){O.apply(o);}return o;};n.prototype._onBindingChange=function(E){T.prototype._onBindingChange.apply(this,arguments);var r=typeof(E)==="object"?E.getParameter("reason"):E;if(r!=="sort"){this._invalidateColumnMenus();}};n.prototype.bindRows=function(B){var o=this._sanitizeBindingInfo.apply(this,arguments);var r=T.prototype.bindRows.call(this,o);this._updateTotalRow(true);return r;};n.prototype._bindAggregation=function(N,p,t,s,F){if(N==="rows"){this.setProperty("firstVisibleRow",0,true);this._sanitizeBindingInfo.call(this,p,t,s,F);}return T.prototype._bindAggregation.apply(this,arguments);};n.prototype._initSelectionModel=function(s){this._oSelection=new S(s);return this;};n.prototype.setSelectionMode=function(s){if(s===h.None){q.sap.log.fatal("SelectionMode 'None' is not supported by the AnalyticalTable.");return this;}var B=this.getBinding("rows");if(B&&B.clearSelection){B.clearSelection();}s=f.sanitizeSelectionMode(this,s);this.setProperty("selectionMode",s);return this;};n.prototype.setSelectionBehavior=function(B){if(B===g.RowOnly){q.sap.log.fatal("SelectionBehavior 'RowOnly' is not supported by the AnalyticalTable.");return this;}else{return T.prototype.setSelectionBehavior.apply(this,arguments);}};n.prototype._sanitizeBindingInfo=function(B){var p,t,s,F;if(typeof B=="string"){p=arguments[0];t=arguments[1];s=arguments[2];F=arguments[3];B={path:p,sorter:s,filters:F};if(t instanceof M){B.template=t;}else if(typeof t==="function"){B.factory=t;}}var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getSorted()){B.sorter=B.sorter||[];B.sorter.push(new c(C[i].getSortProperty()||C[i].getLeadingProperty(),C[i].getSortOrder()===k.Descending));}}B.parameters=B.parameters||{};B.parameters.analyticalInfo=this._getColumnInformation();if(!B.parameters.hasOwnProperty("sumOnTop")){B.parameters.sumOnTop=this.getSumOnTop();}if(!B.parameters.hasOwnProperty("numberOfExpandedLevels")){B.parameters.numberOfExpandedLevels=this.getNumberOfExpandedLevels();}if(B.parameters.numberOfExpandedLevels>this._aGroupedColumns.length){B.parameters.numberOfExpandedLevels=0;}if(!B.parameters.hasOwnProperty("autoExpandMode")){var E=this.getAutoExpandMode();if(E!=m.Bundled&&E!=m.Sequential){E=m.Bundled;}B.parameters.autoExpandMode=E;}var o=this.getModel(B.model);if(o){O.apply(o);}return B;};n.prototype._attachBindingListener=function(){var B=this.getBinding("rows");if(B&&!B.hasListeners("selectionChanged")){B.attachSelectionChanged(this._onSelectionChanged,this);}T.prototype._attachDataRequestedListeners.apply(this);};n.prototype._getColumnInformation=function(){var C=[],t=this.getColumns();for(var i=0;i<this._aGroupedColumns.length;i++){var o=sap.ui.getCore().byId(this._aGroupedColumns[i]);if(!o){continue;}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}for(var i=0;i<t.length;i++){var o=t[i];if(q.inArray(o.getId(),this._aGroupedColumns)>-1){continue;}if(!o instanceof A){q.sap.log.error("You have to use AnalyticalColumns for the Analytical table");}C.push({name:o.getLeadingProperty(),visible:o.getVisible(),grouped:o.getGrouped(),total:o.getSummed(),sorted:o.getSorted(),sortOrder:o.getSortOrder(),inResult:o.getInResult(),formatter:o.getGroupHeaderFormatter()});}return C;};n.prototype._updateTableContent=function(){var B=this.getBinding("rows"),F=this.getFirstVisibleRow(),j=this.getFixedBottomRowCount(),C=this.getVisibleRowCount(),o=this.getColumns();var r=this.getRows();if(!B){for(var i=0;i<r.length;i++){f.Grouping.cleanupTableRowForGrouping(this,r[i]);}return;}var p=this.getBindingInfo("rows");for(var R=0,l=Math.min(C,r.length);R<l;R++){var I=R>(C-j-1)&&B.getLength()>C,s=I?(B.getLength()-1-(C-1-R)):F+R,t=r[R],$=t.$(),u=this.$().find("div[data-sap-ui-rowindex="+$.attr("data-sap-ui-rowindex")+"]");var v;if(I&&B.bProvideGrandTotals){v=B.getGrandTotalContextInfo();}else{v=this.getContextInfoByIndex(s);}var L=v?v.level:0;if(!v||!v.context){f.Grouping.cleanupTableRowForGrouping(this,t);if(v&&!v.context){$.addClass("sapUiAnalyticalTableDummy");u.addClass("sapUiAnalyticalTableDummy");}continue;}if(B.nodeHasChildren&&B.nodeHasChildren(v)){f.Grouping.updateTableRowForGrouping(this,t,true,v.nodeState.expanded,v.nodeState.expanded&&!p.parameters.sumOnTop,false,L,B.getGroupName(v.context,v.level));}else{f.Grouping.updateTableRowForGrouping(this,t,false,false,false,v.nodeState.sum,L,v.nodeState.sum&&v.level>0?B.getGroupName(v.context,v.level):null);}var w=t.getCells();for(var i=0,x=w.length;i<x;i++){var y=w[i].data("sap-ui-colindex");var z=o[y];var D=q(w[i].$().closest("td"));if(B.isMeasure(z.getLeadingProperty())){D.addClass("sapUiTableMeasureCell");D.toggleClass("sapUiTableCellHidden",v.nodeState.sum&&!z.getSummed());}else{D.removeClass("sapUiTableMeasureCell");}}}};n.prototype._onContextMenu=function(E){if(q(E.target).closest('tr').hasClass('sapUiTableGroupHeader')||q(E.target).closest('.sapUiTableRowHdr.sapUiTableGroupHeader').length>0){this._iGroupedLevel=q(E.target).closest('[data-sap-ui-level]').data('sap-ui-level');var o=this._getGroupHeaderMenu();var i=P.Dock;var l=E.pageX||E.clientX;var L=E.pageY||E.clientY;o.open(false,E.target,i.LeftTop,i.LeftTop,document,(l-2)+" "+(L-2));E.preventDefault();E.stopPropagation();return;}return true;};n.prototype._getGroupHeaderMenu=function(){var t=this;function j(){var i=t._iGroupedLevel-1;if(t._aGroupedColumns[i]){var l=t.getColumns().filter(function(C){if(t._aGroupedColumns[i]==C.getId()){return true;}})[0];return{column:l,index:i};}else{return undefined;}}if(!this._oGroupHeaderMenu){this._oGroupHeaderMenu=new d();this._oGroupHeaderMenuVisibilityItem=new e({text:this._oResBundle.getText("TBL_SHOW_COLUMN"),select:function(){var o=j();if(o){var C=o.column,s=C.getShowIfGrouped();C.setShowIfGrouped(!s);t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:(!s?G.showGroupedColumn:G.hideGroupedColumn)});}}});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMenuVisibilityItem);this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_UNGROUP"),select:function(){var l=t.getColumns(),F=0,L=-1,u=-1,C;t.suspendUpdateAnalyticalInfo();for(var i=0;i<l.length;i++){C=l[i];if(C.getGrouped()){F++;if(F==t._iGroupedLevel){C.setGrouped(false);u=i;t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.ungroup});}else{L=i;}}}if(L>-1&&u>-1&&u<L){var U=l[u];var H=U.getHeaderSpan();if(q.isArray(H)){H=H[0];}var r=[];for(var i=u;i<u+H;i++){r.push(l[i]);}q.each(r,function(I,C){t.removeColumn(C);t.insertColumn(C,L);});}t.resumeUpdateAnalyticalInfo();t._getRowContexts();}}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_UNGROUP_ALL"),select:function(){var l=t.getColumns();t.suspendUpdateAnalyticalInfo();for(var i=0;i<l.length;i++){l[i].setGrouped(false);}t.resumeUpdateAnalyticalInfo();t._getRowContexts();t.fireGroup({column:undefined,groupedColumns:[],type:G.ungroupAll});}}));this._oGroupHeaderMoveUpItem=new e({text:this._oResBundle.getText("TBL_MOVE_UP"),select:function(){var o=j();if(o){var C=o.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i>0){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i-1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveUp});}}},icon:"sap-icon://arrow-top"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveUpItem);this._oGroupHeaderMoveDownItem=new e({text:this._oResBundle.getText("TBL_MOVE_DOWN"),select:function(){var o=j();if(o){var C=o.column;var i=q.inArray(C.getId(),t._aGroupedColumns);if(i<t._aGroupedColumns.length){t._aGroupedColumns[i]=t._aGroupedColumns.splice(i+1,1,t._aGroupedColumns[i])[0];t.updateAnalyticalInfo();t.fireGroup({column:C,groupedColumns:C.getParent()._aGroupedColumns,type:G.moveDown});}}},icon:"sap-icon://arrow-bottom"});this._oGroupHeaderMenu.addItem(this._oGroupHeaderMoveDownItem);this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_SORT_ASC"),select:function(){var o=j();if(o){var C=o.column;C.sort(false);}},icon:"sap-icon://up"}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_SORT_DESC"),select:function(){var o=j();if(o){var C=o.column;C.sort(true);}},icon:"sap-icon://down"}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_COLLAPSE_LEVEL"),select:function(){t.getBinding("rows").collapseToLevel(t._iGroupedLevel-1);t.setFirstVisibleRow(0);t.clearSelection();}}));this._oGroupHeaderMenu.addItem(new e({text:this._oResBundle.getText("TBL_COLLAPSE_ALL"),select:function(){t.getBinding("rows").collapseToLevel(0);t.setFirstVisibleRow(0);t.clearSelection();}}));}var o=j();if(o){var C=o.column;if(C.getShowIfGrouped()){this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_HIDE_COLUMN"));}else{this._oGroupHeaderMenuVisibilityItem.setText(this._oResBundle.getText("TBL_SHOW_COLUMN"));}this._oGroupHeaderMoveUpItem.setEnabled(o.index>0);this._oGroupHeaderMoveDownItem.setEnabled(o.index<this._aGroupedColumns.length-1);}else{this._oGroupHeaderMoveUpItem.setEnabled(true);this._oGroupHeaderMoveDownItem.setEnabled(true);}return this._oGroupHeaderMenu;};n.prototype._cleanupGroupHeaderMenu=function(){if(this._oGroupHeaderMenu){this._oGroupHeaderMenu.destroy();this._oGroupHeaderMenu=null;this._oGroupHeaderMenuVisibilityItem=null;this._oGroupHeaderMoveUpItem=null;this._oGroupHeaderMoveDownItem=null;}};n.prototype.expand=function(r){var B=this.getBinding("rows");if(B){B.expand(r);}};n.prototype.collapse=function(r){var B=this.getBinding("rows");if(B){B.collapse(r);}};n.prototype.collapseAll=function(){var B=this.getBinding("rows");if(B){B.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};n.prototype.isExpanded=function(r){var B=this.getBinding("rows");if(B){return B.isExpanded(r);}return false;};n.prototype.getContextByIndex=function(i){var B=this.getBinding("rows");return i>=0&&B?B.getContextByIndex(i):null;};n.prototype.getContextInfoByIndex=function(i){var B=this.getBinding("rows");return i>=0&&B?B.getNodeByIndex(i):null;};n.prototype.suspendUpdateAnalyticalInfo=function(){this._bSuspendUpdateAnalyticalInfo=true;};n.prototype.resumeUpdateAnalyticalInfo=function(s,F){this._bSuspendUpdateAnalyticalInfo=false;this._updateColumns(s,F);};n.prototype.addColumn=function(C,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.addColumn.call(this,o,s);this._updateColumns(s);return this;};n.prototype.insertColumn=function(C,i,s){var o=this._getColumn(C);if(o.getGrouped()){this._addGroupedColumn(o.getId());}T.prototype.insertColumn.call(this,o,i,s);this._updateColumns(s);return this;};n.prototype.removeColumn=function(C,s){var r=T.prototype.removeColumn.apply(this,arguments);if(!this._bReorderInProcess){this._aGroupedColumns=q.grep(this._aGroupedColumns,function(v){if(C.getId){return v!=C.getId();}else{return v==C;}});}this.updateAnalyticalInfo(s);return r;};n.prototype.removeAllColumns=function(s){this._aGroupedColumns=[];var r=T.prototype.removeAllColumns.apply(this,arguments);this._updateColumns(s);return r;};n.prototype._getColumn=function(C){if(typeof C==="string"){var o=new A({leadingProperty:C,template:C,managed:true});return o;}else if(C instanceof A){return C;}else{throw new Error("Wrong column type. You need to define a string (property) or pass an AnalyticalColumnObject");}};n.prototype._updateColumns=function(s,F){if(!this._bSuspendUpdateAnalyticalInfo){this._updateTableColumnDetails();this.updateAnalyticalInfo(s,F);}};n.prototype.updateAnalyticalInfo=function(s,F){if(this._bSuspendUpdateAnalyticalInfo){return;}var B=this.getBinding("rows");if(B){var C=this._getColumnInformation();var N=B.getNumberOfExpandedLevels()||0;if(N>this._aGroupedColumns.length){B.setNumberOfExpandedLevels(0);}B.updateAnalyticalInfo(C,F);this._updateTotalRow(s);}};n.prototype.refreshRows=function(){sap.ui.table.Table.prototype.refreshRows.apply(this,arguments);this._updateTotalRow();};n.prototype._updateTotalRow=function(s){var B=this.getBinding("rows");var F=this.getFixedBottomRowCount();if(B&&(B.providesGrandTotal()&&B.hasTotaledMeasures())){if(F!==1){this.setProperty("fixedBottomRowCount",1,s);}}else{if(F!==0){this.setProperty("fixedBottomRowCount",0,s);}}};n.prototype._updateTableColumnDetails=function(){if(this._bSuspendUpdateAnalyticalInfo){return;}var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult();if(r){var C=this.getColumns(),l=[],u=[],D=[],p={},t,v;for(var i=0;i<C.length;i++){t=C[i];t._isLastGroupableLeft=false;t._bLastGroupAndGrouped=false;t._bDependendGrouped=false;if(!t.getVisible()){continue;}var L=t.getLeadingProperty();v=r.findDimensionByPropertyName(L);if(v){var w=v.getName();if(!p[w]){p[w]={dimension:v,columns:[t]};}else{p[w].columns.push(t);}if(t.getGrouped()&&q.inArray(w,l)==-1){l.push(w);}if(q.inArray(w,D)==-1){D.push(w);}}}u=q.grep(D,function(s){return(q.inArray(s,l)==-1);});if(l.length>0){q.each(l,function(i,s){q.each(p[s].columns,function(j,o){if(!o.getGrouped()){o._bDependendGrouped=true;}});});if(l.length==D.length){v=r.findDimensionByPropertyName(sap.ui.getCore().byId(this._aGroupedColumns[this._aGroupedColumns.length-1]).getLeadingProperty());var x=p[v.getName()].columns;q.each(x,function(i,o){o._bLastGroupAndGrouped=true;});}}if(u.length==1){q.each(p[u[0]].columns,function(j,o){o._isLastGroupableLeft=true;});}}};n.prototype._getFirstMeasureColumnIndex=function(){var B=this.getBinding("rows"),r=B&&B.getAnalyticalQueryResult(),C=this._getVisibleColumns();if(!r){return-1;}for(var i=0;i<C.length;i++){var o=C[i],l=o.getLeadingProperty();if(r.findMeasureByName(l)||r.findMeasureByPropertyName(l)){return i;}}};n.prototype.getTotalSize=function(){var B=this.getBinding("rows");if(B){return B.getTotalSize();}return 0;};n.prototype._onPersoApplied=function(){T.prototype._onPersoApplied.apply(this,arguments);this._aGroupedColumns=[];var C=this.getColumns();for(var i=0,l=C.length;i<l;i++){if(C[i].getGrouped()){this._addGroupedColumn(C[i].getId());}}this._updateColumns();};n.prototype._addGroupedColumn=function(C){if(this._aGroupedColumns.indexOf(C)===-1){this._aGroupedColumns.push(C);}};n.prototype._removeGroupedColumn=function(C){var i=this._aGroupedColumns.indexOf(C);if(i>=0){this._aGroupedColumns.splice(i,1);}};n.prototype.getGroupedColumns=function(){return this._aGroupedColumns;};n.prototype.setCollapseRecursive=function(C){var B=this.getBinding("rows");if(B){if(B.setCollapseRecursive){B.setCollapseRecursive(C);}}this.setProperty("collapseRecursive",!!C,true);return this;};n.prototype._getSelectableRowCount=function(){var B=this.getBinding("rows");if(B){var r=B.getGrandTotalContextInfo();return r?r.totalNumberOfLeafs:0;}};n.prototype.isIndexSelected=a.prototype.isIndexSelected;n.prototype.setSelectedIndex=a.prototype.setSelectedIndex;n.prototype.getSelectedIndices=a.prototype.getSelectedIndices;n.prototype.setSelectionInterval=a.prototype.setSelectionInterval;n.prototype.addSelectionInterval=a.prototype.addSelectionInterval;n.prototype.removeSelectionInterval=a.prototype.removeSelectionInterval;n.prototype.selectAll=a.prototype.selectAll;n.prototype.getSelectedIndex=a.prototype.getSelectedIndex;n.prototype.clearSelection=a.prototype.clearSelection;n.prototype._isRowSelectable=function(r){var B=this.getBinding("rows");if(B){return B.isIndexSelectable(r);}else{return false;}};n.prototype._getSelectedIndicesCount=a.prototype._getSelectedIndicesCount;n.prototype.getAnalyticalInfoOfRow=function(r){if(!this._validateRow(r)){return null;}var B=this.getBindingInfo("rows");var o=this.getBinding("rows");if(!B||!o){return null;}var C=r.getBindingContext(B.model);if(!C){return null;}var I=C===o.getGrandTotalContext();var j=null;var l=-1;if(I){j=o.getGrandTotalContextInfo();l=0;}else{j=this.getContextInfoByIndex(r.getIndex());if(j){l=j.level;}}var p=j&&o.nodeHasChildren&&o.nodeHasChildren(j);var s=!p&&!I&&j&&j.nodeState&&j.nodeState.sum;var t=[];if(s||p){var u=this.getGroupedColumns();if(u.length>0&&l>0&&l<=u.length){for(var i=0;i<l;i++){t.push(u[i]);}}}return{grandTotal:I,group:p,groupTotal:s,level:l,context:C,groupedColumns:t};};return n;});
