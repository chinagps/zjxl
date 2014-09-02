var CTFO=window.CTFO||{},cLog=window.cLog||null;CTFO.cache={cLogInfo:{},systemType:1,user:{},auth:{},menu:{},menuMap:{},alarmType:{},tmpl:{},data:{},generalCode:{},userCorps:{},schedulePreMessage:{},alarmLevel:{},alarmTypeDesc:{},frame:null,orgTrees:{},selectedVehicleIds:[],selectedVehicleNos:[],allVehicleNos:{},commandSeqs:[],universalTreeInitData:{},batchTrackingLocationData:{},vehicleMarkerType:1,zIndex:2e3,oilWearRatio:{vehicleRatio10:"1.0",vehicleRatio11:"1.2",vehicleRatio21:"1.4",vehicleRatio31:"1.6",vehicleRatio41:"1.7",vehicleRatio51:"1.8",vehicleRatioTown:"1.3",vehicleRatioVillage:"1.2",vehicleRatioCounty:"1.1",vehicleRatioProvice:"1.0",vehicleRatioState:"1.0"}},CTFO.config={globalObject:{isLoadAlarmTypeDesc:!0,isLoadCorpList:!0,isLoadSchedulePreMessage:!0,isSupportMultiLabel:!1,addMarkerFinishedFlag:!0,alarmVoice:!0,terminalType:"",commandStatusContainer:$("#footer").find(".commandReturnStatus"),batchMonitorWinIdCache:[],vehicleLatestStatusWindows:{},trackAnalysisModel:null},scriptTemplateArr:[{name:"corpNewsTmpl",value:"#corp_news_tmpl"},{name:"vehicleRankingTmpl",value:"#vehicle_ranking_tmpl"},{name:"vehicleTeamRankingTmpl",value:"#vehicle_team_ranking_tmpl"},{name:"systemNoticeTmpl",value:"#system_notice_tmpl"},{name:"messageListTmpl",value:"#message_tmpl"},{name:"questionListTmpl",value:"#question_tmpl"},{name:"trafficTmpl",value:"#traffic_tmpl"},{name:"vehicleDashBoardTmpl",value:"#vehicle_dashboard_tmpl"},{name:"vehicleBasicInfoTmpl",value:"#vehicle_detail_basic_tmpl"},{name:"carInfoTmpl",value:"#vehicle_detail_car_tmpl"},{name:"driverInfoTmpl",value:"#vehicle_detail_driver_tmpl"},{name:"corpInfoTmpl",value:"#vehicle_detail_corp_tmpl"},{name:"lineInfoTmpl",value:"#vehicle_detail_line_tmpl"},{name:"terminalInfoTmpl",value:"#vehicle_detail_terminal_tmpl"},{name:"fenceSettingTmpl",value:"#fence_setting_window_tmpl"},{name:"vehicleStatisticTmpl",value:"#vehicle_statistic_bar_tmpl"},{name:"sendedMessageListTmpl",value:"#vehicle_schedule_msglist_tmpl"},{name:"vehicleAroundPoiTmpl",value:"#vehicle_poi_box_tmpl"},{name:"routeConfig",value:"#route_config_tmpl"},{name:"routeVehicleBindingSetting",value:"#route_vehicle_config_tmpl"},{name:"routeSubsetionConfig",value:"#route_subsetion_config_tmpl"},{name:"systemAlarmSpeedTmpl",value:"#system_parameter_alarm_speed_tmpl"},{name:"systemAlarmTiredTmpl",value:"#system_parameter_alarm_tired_tmpl"},{name:"insuranceAddTmpl",value:"#insure_manage_add_update_tmpl"},{name:"accidentAddTmpl",value:"#accident_manage_add_update_tmpl"},{name:"accidentDetailTmpl",value:"#accident_manage_detail_tmpl"},{name:"repairAddTmpl",value:"#repair_manage_add_update_tmpl"},{name:"repairModTmpl",value:"#repair_manage_modefy_update_tmpl"},{name:"fuelManageTmpl",value:"#vehicle_fuelManage_tml"},{name:"stationAddTmpl",value:"#station_manage_add_update_tmpl"},{name:"dealStatTmpl",value:"#deal_stat_tmpl"},{name:"lineManageDetailTmpl",value:"#line_manage_detail_tmpl"}],scriptTemplate:{},sources:{updateCustomColumns:"customReportColumn/addOrUpdateCustomColumn.action",getConfig:"util/getConfiguratorInfo.action",userInfo:"homepage/findOperatorfromMem.action",menuList:"",auth:"homepage/findSpRoleFun.action",generalCode:"baseinfo/findInitSysGeneralCode.action",logout:"portal/logout.action",passwordModify:"portal/retPassword.action",customColumns:"customReportColumn/findReportColumn.action",findPageDisColumn:"customReportColumn/findPageDisColumn.action",delCustomColumns:"customReportColumn/deleteUserCustomColumnsByReportId.action",commandStatusCode:"monitor/findCommandStatusCode.action",commandType:"monitor/findCommandTypeCode.action",alarmLevel:"monitor/findAlarmLevel.action",alarmTypeDesc:"entbusiness/findAllSysAlarmType.action",preMessage:"systemmng/findPredefinedMsgByParam.action",commitLog:"monitor/findCommandByOpId.action",updateSpOperstorStyle:"systemmng/updateSpOperstorStyle.action",commitLogExport:"monitor/exportExcelDataActionRecord.action",findMediaUri:"monitor/findMediaUri.action",vehicleDetail:"operationmanagement/findViewVehicleInfoByVid.action",vehicleDetailalarmId:"operationmanagement/getAlarmDealNum.action",orgTreeInit:"commonTrees/findOrgTreeOnlyCorp.action",orgTreeOnlySearch:"commonTrees/searchOrgTreeOnlyCorp.action",teamTreeInit:"commonTrees/findTeamTree.action",teamTreeOnlySearch:"commonTrees/searchTeamTree.action",getVehiclesFromTeam:"commonTrees/findVehicleFromTeam.action",vehicleTreeOnlySearch:"commonTrees/searchVehicleTree.action",lineTreeInit:"commonTrees/findCorpAndLineTree.action",lineTreeOnlySearch:"commonTrees/searchCorpAndLineTree.action",orgTree2:"operationmanagement/findOrgTree.action",lineTree2:"operationmanagement/findGroupEntClassline.action",getVehicleLatestInfo:"monitor/findVehicleInfo.action",getMatchingVehicles:"operationmanagement/findVehicleByNo.action",findTrackByVid:"tbAreaManager/findTrackByVid.action",drivdingCorpList:"baseinfo/selectVehicleForName.action",enterpriseStatistic:"memcache/memcache!getStatisticsVehicleOperationState.action",alarmStatistic:"memcache/memcache!getMemAlarmInfo.action",alarmStatisticShowType:"homepage/findAlarmShowTypeByEntId.action",vehicleOnOffLine:"monitor/findVehicleOnOffLine.action",findRemindByEntId:"homepage/findRemindByEntId.action",corpNews:"memcache/memcache!getTbComPublishInfo.action",corpNewDetail:"homepage/findTbPublishInfoById.action",corpNewGridList:"homepage/findTbPublishInfoGrid.action",vehicleRanking:"memcache/memcache!getVehicleTop.action",vehicleTeamRanking:"memcache/memcache!getVehicleTeamTop.action",systemNotice:"memcache/memcache!getSystemAnnouncement.action",systemNoticeDetail:"homepage/findTbPublishInfoById.action",messageList:"memcache/memcache!getTbFeedback.action",messageDetail:"homepage/findFeedbackParent.action",messageListAll:"homepage/findFeedbackGrid.action",questionList:"homepage/findFeedbackQuestion.action",questionDetail:"",question:"homepage/addQuestion.action",traffic:"memcache/memcache!getRoadConditionByProvince.action",trafficMore:"memcache/memcache!getRoadConditionPage.action",trafficDetail:"",moreTraffic:"memcache/memcache!getRoadConditionPage.action",alarmShowType:"homepage/findAlarmShowTypeByEntId.action",alarmRealTime:"operationmanagement/getAlarmRealTime.action",activeAlarmCount:"monitor/findMonitorAlarmPageCount.action",activeAlarmCountOrg:"monitor/findOrgVehicleHandlerCount.action",vehicleStatistic:"baseinfo/structureOrgMonitor!vehicleMonitoStatistics.action",activeVehicleInfoExport:"monitor/exportExcelDataFindPositions.action",latestPosition:"monitor/findPositions.action",orgTree:"baseinfo/structureOrgMonitor!structureOrgMonitorTree.action",inspectiveVehicles:"tbAreaManager/operatorVehicle!findByParam.action",getVehiclesByEntId:"monitor/findTreeMarkers.action",addInspectiveVehicle:"tbAreaManager/operatorVehicle!add.action",removeInspectiveVehicle:"tbAreaManager/operatorVehicle!remove.action",activeAlarm:"monitor/findMonitorAlarmPage.action",activeAlarmOrg:"monitor/findOrgVehicleHandler.action",activeAlarmExport:"monitor/exportExcelAlarmPage.action",activeAlarmExportOrg:"monitor/exportExcelOrgDataAlarm.action",findLatestPictures:"monitor/findMediaUrl.action",unchainAlarm:"monitor/removeAlarms.action",processAlarm:"operationmanagement/processAlarm.action",findAddressBySync:"tbAreaManager/findAddressBySync.action",singleMessageCommand:"monitor/sendMessageCommand.action",batchMessageCommand:"monitor/sendBatchMessageCommand.action",photoCommand:"monitor/sendPhotoCommand.action",batchPhotoCommand:"monitor/sendBatchPhotoCommand.action",callingCommand:"monitor/sendMonitorCommand.action",tapingCommand:"monitor/sendRecordCommand.action",emphasisCommand:"monitor/sendEmphasisCommand.action",checkrollCommand:"monitor/sendCallNameCommand.action",videoCommand:"monitor/sendVidioCommand.action",downloadVideoWidget:"monitor/downloadVideo.action",videoOverloadInfo:"monitor/saveVidioOverload.action",commandStatus:"monitor/findCommandStatus.action",findDataByArea:"accord/findDataByArea.action",findSpannedStatistics:"accord/findSpannedStatistics.action",vehicleInfo:"monitor/getVehicleInfoByVid.action",driverInfo:"monitor/findEmployeeByVid.action",corpInfo:"monitor/findCorpByVid.action",lineInfo:"monitor/findLineByVid.action",terminalInfo:"monitor/getTerminalInfo.action",vehiclePath:"monitor/findTrack.action",vehicleEvents:"monitor/findEventPositions.action",scheduleMessageList:"monitor/vehicleCommandManage!findByParamThVehicleCommand.action",scheduleMessageReSend:"monitor/vehicleCommandManage!repeatSendThVehicleCommand.action",vehiclePhotoList:"monitor/findMediaUrl.action",findPoiTypeByParam:"monitor/findPoiTypeByParam.action",addPoiInfoUrl:"monitor/addPoi.action",findPoiInfo:"monitor/findPoiById.action",removePoiInfo:"monitor/removePoi.action",modifyPoiInfo:"monitor/modifyPoi.action",delPoiTypeUrl:"monitor/removePoiType.action",isUsePoiTypeUrl:"monitor/isUsePoiType.action",getPoiInfoByTypeUrl:"monitor/findPoiByParam.action",addPoiType:"monitor/addPoiType.action",featureSearch:"monitor/featureSearch.action",fenceGrid:"tbAreaManager/findAreaByParamPage.action",bindedVehicleGrid:"tbAreaManager/findBindAreaByParamPage.action",vehicleToBeBinding:"operationmanagement/selectVehicleColForArea.action",getFenceOverlays:"tbAreaManager/findVehicleAreaByAreaIds.action",addFense:"tbAreaManager/addArea.action",modifyFence:"tbAreaManager/modifyArea.action",fenceDetail:"tbAreaManager/findAreaByParam.action",isBindedFence:"tbAreaManager/isBindVehicle.action",deleteFence:"tbAreaManager/removeArea.action",feceBindingAuth:"tbAreaManager/getVehicleCount.action",bindVehicle:"tbAreaManager/addBindArea.action",modifyBindedVehicle:"tbAreaManager/modifyAreaBind.action",deleteUnchainedFence:"tbAreaManager/removeBindArea.action",stationList:"operationmanagement/findLineStationListPage.action",findStationList:"operationmanagement/findStationList.action",addStation:"operationmanagement/addLineStation.action",updateStation:"operationmanagement/modifyLineStation.action",deleteStation:"operationmanagement/deleteLineStation.action",findBindLineList:"operationmanagement/findBindLineList.action",findStationCodeCount:"operationmanagement/findStationCodeCount.action",bindLineStation:"operationmanagement/bindLineStation.action",findBindStationList:"operationmanagement/findBindStationList.action",routeList:"operationmanagement/findClassLineList.action",routeBindedVehicleList:"operationmanagement/trLineVehicle!findByParamPage.action",routeLevelConfigList:"operationmanagement/findSpeedLimitForListPage.action",getRouteSettingDetail:"operationmanagement/findTbClassLineById.action",deleteRoute:"operationmanagement/removeTbClassLine.action",addRoute:"operationmanagement/addTbClassLine.action",modifyRoute:"operationmanagement/modifyTbClassLine.action",unchainRoute:"operationmanagement/removeLineVehicle.action",rebindRoute:"operationmanagement/rebindClasslineAndVehicle.action",routeConfigCreate:"operationmanagement/addSpeedLimit.action",routeConfigDelete:"operationmanagement/delSpeedLimit.action",routeConfigModify:"operationmanagement/modifySpeedLimit.action",routeLevelUnBindVehicleList:"operationmanagement/findByParmaPageBind.action",routeLevelBindedVehicle:"operationmanagement/findSpeedLimitBindForListPage.action",routeBindingSetting:"operationmanagement/trLineVehicle!findByParam.action",routeUnBindVehicleList:"operationmanagement/trServiceunit!findForListPage.action",saveBindedVehicle:"operationmanagement/modifyTrVehicleSectioncfg.action",queryTrackData:"monitor/findTrackAnalyze.action",exportTrackData:"monitor/exportExcelDataTrack.action",queryPhotoConfListByPage:"tbAreaManager/findPhotoSettingByParam.action",addPhotoConf:"tbAreaManager/triggerPhotosSet.action",detailPhotoConf:"tbAreaManager/findSettingByVid.action",resetPhotoConf:"tbAreaManager/resetPhotoSetting.action",cannelPhotoConf:"tbAreaManager/canclePhotoSetting.action",issuedGrid:"entbusiness/findIssuedForListPage.action",ieportGrid:"entbusiness/findReportForListPage.action",exportExcelDataDispatchIssued:"entbusiness/exportExcelDataDispatchIssued.action",exportExcelDataDispatchReport:"entbusiness/exportExcelDataDispatchReport.action",issuedGridStat:"entbusiness/findIssuedForListStatPage.action",exportIssuedGridStat:"entbusiness/exportIssuedForListStatPage.action",mediaInfoGrid:"operationmanagement/media!findVehicleMediaForListPage.action",overManInfoGrid:"operationmanagement/media!findPhotoForListPage.action",delMediaInfo:"operationmanagement/media!delPhoto.action",modifyMedia:"operationmanagement/media!modifyVehicleMedia.action",updateImgState:"operationmanagement/media!updateImgState.action",photoZip:"operationmanagement/createPhotoZip.action",alarmStatisticGrid:"alarmStatistics/queryStatInfo.action",alarmStatisticExport:"alarmStatistics/exportStatInfo.action",alarmStatisticDetail:"alarmStatistics/findAlarmEventList.action",alarmDetail:"operationmanagement/queryAlarmTrackCount.action",alarmDetailHis:"tbAreaManager/findInfoPageByParam.action",alarmDetailExport:"operationmanagement/exportExcelDataQueryAlarmTrack.action",alarmDetailHisExport:"tbAreaManager/exportExcelVehicleAlarmEventHis.action",alarmDetailCount:"operationmanagement/queryAlarmDetailCount.action",drivdingHistoryList:"viewfilelog/viewFileLogAction!queryLogByTime.action",drivdingHistoryExport:"viewfilelog/viewFileLogAction!exportAllLogByTime.action",drivdingVehicleList:"baseinfo/searchVehiclesByAlert.action",gpsSignalLost:"viewfilelog/gpsSignalLostAction!queryGpsSignalLost.action",exportExcelGpsSignalLost:"viewfilelog/exportExcelGpsSignalLost.action",findVehicleSpeedAnomalous:"safetymanagement/findVehicleSpeedAnomalous.action",exportExcelVehicleSpeedAnomalous:"safetymanagement/exportExcelVehicleSpeedAnomalous.action",searchByParamOnLine:"baseinfo/searchByParamOnLine.action",searchByParamOnLineExport:"baseinfo/exportDataToExcel.action",vehicleMonthOnlineList:"baseinfo/findVehicleMonthOnlineList.action",vehicleMonthOnlineExport:"baseinfo/findVehicleMonthOnlineList.action",vehicleLoginStatistics:"operationmanagement/queryVehicleLineRateCount.action",vehicleTripDayStatistics:"",vehicleLoginStatisticsExport:"operationmanagement/exportExcelDataVehiclelinerate.action",searchByParamOnLineDetail:"baseinfo/searchByParamOnLineDetail.action?requestParam.equal.flag",queryVehicleOnlineCount:"operationmanagement/queryVehicleOnlineCount.action",queryVehicleOnlineCountExport:"operationmanagement/exportExcelDataVehileOnlineCount.action",findOperateLog:"tbAreaManager/findOperateLogForPage.action?requestParam.equal.newLogSystemType=1",findOperateLogExport:"tbAreaManager/exportExcelDataOperateLog.action?requestParam.equal.newLogSystemType=1",findUserOnline:"operationstat/findUserOnlineForPage.action",findUserOnlineExport:"operationstat/exportExcelDataUserOnline.action",findVehicleOverSpeedInfo:"tbAreaManager/findOverSpeedInfoPage.action",vehicleOverSpeedInfoExport:"tbAreaManager/exportOverSpeedInfo.action",findSpeedDeInfoPage:"tbAreaManager/findSpeedDeInfoPage.action",vehicleSpeedDeInfoExport:"tbAreaManager/exportOverSpeedDeInfoPage.action",dangerousDrivingGrid:"dangerousDrivingStat/queryStatInfo.action",dangerousDrivingExport:"dangerousDrivingStat/exportStatInfo.action",eventSafeGrid:"dangerousDrivingStat/findEventSafeList.action",accidentAnalysisExcel:"drivingRecord/exportDataToExcel.action",accidentAnalysisInfo:"drivingRecord/queryMainInfoList.action",getVehicleNo:"drivingRecord/getVehicleNo.action",fetchData:"drivingRecord/fetchData.action",isPermission:"drivingRecord/isPermission.action",accidentAnalysisStopTime:"drivingRecord/getStopTime.action",accidentAnalysisDetailInfo:"drivingRecord/showDetailInfo.action",fuelMonitorList:"oilMassMon/queryMDataInfo.action",fuelVolumeGrid:"oilMassMon/queryDataInfo.action",fuelVolumeSum:"oilMassMon/querySumDataInfo.action",fuelVolumeExport:"oilMassMon/exportStatInfo.action",fuelVolumeAnalysedExport:"oilMassMon/exportAnalysisStatInfo.action",oilMapInfo:"oilMassMon/findOilDetailMapInfo",oilFileLog:"oilMassMon/findOilDetailByFileLog.action",oilVehicleConf:"oilMassMon/findOilVehicleConfig.action",oilDetailInfo:"oilMassMon/findOilDetailInfo.action",oilDetailExport:"oilMassMon/exportOilDetailInfo.action",findOilTrackById:"oilMassMon/findOilDetailMapInfo.action",fuelMassAnalysed:"vehiclestat/findSingleVehicleOil.action",violateStatisticsSum:"illOperating/querySumDataInfo.action",exportStatInfo:"illOperating/exportStatInfo.action",violateStatisticsGrid:"illOperating/queryDataInfo.action",violateStatisticsLine:"illOperating/getXmlData.action",oillOperateDetailList:"illOperating/findOillOperateDetailList.action",mileageList:"operationmanagement/queryMealCount.action",mileageEventSafeList:"operationmanagement/exportExcelDataMealCount.action",drivingAnalysedInfo:"fuelsavingDrivingStat/queryStatInfo.action",drivingAnalysedInfoExport:"fuelsavingDrivingStat/exportStatInfo.action",drivingAnalysedWin:"fuelsavingDrivingStat/findEventSafeList.action",vehicleRunTimeStatisticsSum:"operationstat/getVehicleReportTotle.action",vehicleRunTimeStatisticsGrid:"operationstat/getVehicleReportList.action",vehicleRunTimeExportGrid:"operationstat/exportVehicleReportList.action",vehicleRunTimeStatisticslineSum:"operationstat/getSumChartXml.action",vehicleRunTimeStatisticslinePup:"operationstat/getChartXmlData.action",vehicleDoorOpenList:"operationstat/getDoorOpenList.action",oilMassInfo:"vehiclestat/queryStatInfo.action",oliMassExport:"vehiclestat/exportStatInfo.action",vehicleTeamGrid:"operationmanagement/findForListPage.action",deleteVehicleTeam:"operationmanagement/removeOrg.action",orgDetail:"operationmanagement/findOrgById.action",updateVehicleTeam:"operationmanagement/modifyOrg.action",insertVehicleTeam:"operationmanagement/addOrgCorp.action",exportExcelDataCorp:"operationmanagement/exportExcelDataCorp.action",checkEntNameExist:"operationmanagement/checkEntNameExist.action",vehicleManageGrid:"operationmanagement/findVehicleForListPage.action",modifyVehicleInfo:"operationmanagement/modifyVehicle.action",findVehicleInfoById:"operationmanagement/findVehicleById.action",validateVehicleNoAndPlateColor:"operationmanagement/isUniqueForVehicleNoAndPlateColor.action",findProductType:"baseinfo/findProductTypeByParam.action",findEproductType:"operationmanagement/findEproductTypeByParam.action",vehicleOrgChange:"operationmanagement/trServiceunit!modifyTransferVehicle.action",exportExcelDataVehicle:"operationmanagement/exportExcelDataVehicle.action",vehicleAudit:"operationmanagement/updateVehicleAnnualAudit.action",findAllVstatusRefId:"operationmanagement/findAllVstatusRefId.action",driverManageGrid:"operationmanagement/findByParamString.action",driverVechileGrid:"operationmanagement/findVehicleForThreeTab.action",driverSelectVechileGrid:"operationmanagement/findVehicle.action",driverSelectICCardGrid:"operationmanagement/findIcCardByParamString.action",findVidsByDriverId:"operationmanagement/searchVehicleForEmployee.action",findDriverInfoById:"operationmanagement/findById.action",employeeCheck:"operationmanagement/isEmployee.action",findOrgInfo:"operationmanagement/findOrgSonTree.action",addDriverInfo:"operationmanagement/addCustomer.action",modifyDriverInfo:"operationmanagement/modifyCustomer.action",delDriverById:"operationmanagement/removeCustomer.action",uploadDriverImgInfo:"operationmanagement/upEmployeeImg.action",exportCustomerExcelData:"operationmanagement/exportCustomerExcelData.action",driverICManageGrid:"operationmanagement/findIcCardByParamString.action",queryDriverInfoList:"operationmanagement/findByParamString.action",addIcCard:"operationmanagement/addIcCard.action",modifyIcCard:"operationmanagement/modifyIcCard.action",delIcCard:"operationmanagement/removeIcCard.action",addIcCardContinue:"operationmanagement/addIcCardContinue.action",findIcCardById:"operationmanagement/findByIds.action",checkCardExist:"operationmanagement/checkCardExist.action",exportExcelDataQueryIcCard:"operationmanagement/exportExcelDataQueryIcCard.action",driverssoltcardGrid:"operationmanagement/queryDriverSoltCardList.action",driverssoltcardExport:"operationmanagement/exportDriverSoltCardList.action",transPortManageGrid:"operationmanagement/findTransPortListByParam.action",addTransPort:"operationmanagement/addTransPort.action",findTransPortById:"operationmanagement/findTransPortById.action",modifyTransPort:"operationmanagement/modifyTransPort.action",delTransPort:"operationmanagement/delTransPort.action",exportListUrl:"operationmanagement/exportListInfo.action",corpMsgList:"systemmng/publish!findPublishForListPage.action",addCorpMsg:"systemmng/publish!addPublishInfo.action",modifyCorpMsg:"systemmng/publish!updatePublishInfo.action",delCorpMsg:"systemmng/publish!removePublishByParam.action",moveToTop:"systemmng/publish!moveToTop.action",cancelToTop:"systemmng/publish!cancelToTop.action",publishing:"systemmng/publish!publishing.action",cancelPublish:"systemmng/publish!cancelPublish.action",findCorpMsgById:"systemmng/publish!findPublishByParam.action",fuelManagesearch:"energymanagement/searchVehicle.action",fuelManagesearchExport:"energymanagement/exportOilGrid.action",findRecordById:"energymanagement/findRecordById.action",updateOilRecord:"energymanagement/updateOilRecord.action",deleteOilRecord:"energymanagement/deleteOilRecord.action?autoId=",searchVehiclesInfo:"energymanagement/searchVehiclesInfo.action",addOilRecord:"energymanagement/addOilRecord.action",uploadActionUrl:"energymanagement/fileUpLoad.action",downloadTmpUrl:"model/energy/AddOilInfo.xls",findRoleList:"systemmng/findRoleList.action",findSpOperator:"systemmng/findSpOperator.action",revokeEditSpOperator:"systemmng/revokeEditSpOperator.action",findSpOperatorById:"systemmng/findSpOperatorById.action",addSpOperator:"systemmng/addSpOperator.action",isExistSpOperator:"systemmng/isExistSpOperator.action",modifySpOperator:"systemmng/modifySpOperator.action",removeUser:"systemmng/removeSpOperator.action",modifySpOperatorPassWord:"systemmng/modifySpOperatorPassWord.action",findSpRoleForList:"systemmng/findSpRoleForList.action",findSpRoletById:"systemmng/findSpRoletById.action",findSysFunForTreeByParam:"systemmng/findSysFunForTreeByParam.action",findSysFunForTree:"systemmng/findSysFunForTree.action",modifySpRolet:"systemmng/modifySpRolet.action",addSpRole:"systemmng/addSpRole.action",isExistSysRole:"systemmng/isExistSysRole.action",findSpRoletDetailInfoById:"systemmng/findSpRoletDetailInfoById.action",findByParamPage:"systemmng/findByParamPage.action",getAlarmLevel:"systemmng/getAlarmLevel.action",getAlarmType:"systemmng/getEntAlarmType.action",getVoiceAlarm:"systemmng/getTbAlarmNotice.action",updateVoiceAlarm:"systemmng/updateTbAlarmNotice.action",addVoiceAlarm:"systemmng/addTbAlarmNotice.action",delVoiceAlarm:"systemmng/deleteTbAlarmNotice.action",isNotConfig:"systemmng/isNotConfig.action",findMouthsetMngList:"baseinfo/findMouthsetMngList.action",findMouthOrgTreeOnlyCorp:"operationmanagement/findOrgTreeOnlyCorp.action",findByIdMouthset:"baseinfo/findByIdMouthset.action",modifyMonth:"baseinfo/modifyMonth.action",addMouthset:"baseinfo/addMouthset.action",isFindMonth:"baseinfo/isFindMonth.action",findVehicleScoreForListPage:"operationmanagement/findVehicleScoreForListPage.action",delMouthset:"baseinfo/delMouthset.action",getAssessoilSetList:"baseinfo/getAssessoilSetList.action",exportAssessoilSet:"baseinfo/export.action",findByParamEntId:"baseinfo/findByParamEntId.action",modifyAssessoilSet:"baseinfo/modifyAssessoilSet.action",removeAssessoilSet:"baseinfo/removeAssessoilSet.action",addSelectAllVehicleSet:"baseinfo/assessoilSetAction!selectAllVehicleSet.action",addNewSetAssessoilSetAction:"baseinfo/assessoilSetAction!addNewSet.action",getVehicleScore:"operationmanagement/getVehicleScore.action",updateVehicleScore:"operationmanagement/updateVehicleScore.action",addVehicleScore:"operationmanagement/addVehicleScore.action",removeVehicleScore:"operationmanagement/removeVehicleScore.action",findDefaultSet:"operationmanagement/vehicleScoreAction!findDefaultSet.action",saveNewDefalutSet:"operationmanagement/vehicleScoreAction!saveNewDefalutSet.action",findCorpLogo:"systemmng/findCorpLogo.action",addCorpLogoAction:"systemmng/addCorpLogoAction.action",defaultImgLogo:"systemmng/defaultImg.action",addCorpdefaultLogo:"systemmng/addCorpdefaultLogo.action",findPredefinedMsgForListPage:"systemmng/findPredefinedMsgForListPage.action",addPredefinedMsg:"systemmng/addPredefinedMsg.action",findPredefinedMsgById:"systemmng/findPredefinedMsgById.action",modifyPredefinedMsg:"systemmng/modifyPredefinedMsg.action",removePredefinedMsg:"systemmng/removePredefinedMsg.action",addEntAlarmSetAction:"systemmng/addEntAlarmSetAction.action",findEntAlarmSetAction:"systemmng/findEntAlarmSetAction.action",findTacticsSetByParam:"systemmng/findTacticsSetByParam.action",addAlarmTacticsSet:"systemmng/addAlarmTacticsSet.action",modifyAlarmTacticsSet:"systemmng/modifyAlarmTacticsSet.action",saveSysBindedVehicle:"systemmng/saveSysBindedVehicle.action",sysBindedVehicle:"systemmng/findTacticsSetBindForListPage.action",findOrgListByEntIdParam:"systemmng/findOrgListByEntIdParam.action",queryExamineSetByEntIdAction:"systemmng/queryExamineSetByEntIdAction.action",updatePhotoExamineSetByParam:"systemmng/updatePhotoExamineSetByParam.action",addPhotoExamineSetByParam:"systemmng/addPhotoExamineSetByParam.action",findOnlineVehicleTimeById:"systemmng/findOnlineVehicleTimeById.action",modifyOnlineVehicleTime:"systemmng/modifyOnlineVehicleTime.action",findVehicleByCorpId:"commonTrees/findVehicleListByCorpIdParam.action",getTerminalParamCmd:"operationmanagement/sendFetchTerminalParamCommand.action",findTermianlParamByVids:"operationmanagement/findTerminalParamAction.action",findTerminalParamView:"operationmanagement/findTerminalParamView.action",exportExcelTerminalParamView:"operationmanagement/exportExcelTerminalParamView.action",findCommandSendStatusBySeqs:"operationmanagement/findCommandSendStatusBySeqs.action",addTerminalParamCmd:"operationmanagement/addTerminalParamReturnAction.action",devicestatusInfo:"devicestatus/findInfo.action",exportDataVehicleAlarm:"devicestatus/exportDataVehicleAlarm.action",errorInfo:"devicestatus/selectDeviceStatusStaByParam.action",viewDevicestatus:"devicestatus/viewDevicestatus.action",errorDetai:"tbAreaManager/searchByParam.action",findVehicleReport:"vehicleanalysis/findReport.action",downloadVehicleReport:"vehicleanalysis/fileExits.action",createReportAgain:"vehicleanalysis/createReportAgain.action",removeReportInfo:"vehicleanalysis/removeReportInfo.action",fileExits:"vehicleanalysis/fileExits.action",searchSelectedVehiclesInfo:"vehicleanalysis/searchSelectedVehiclesInfo.action",findVehicleInfo:"vehicleanalysis/findVehicleInfo.action",createReport:"vehicleanalysis/createReport.action",showChart:"drivingRecord/showChart.action",findIntegrationScoreList:"operationmanagement/findIntegrationScoreList.action",exportIntegrationScoreGrid:"operationmanagement/exportIntegrationScoreGrid.action",findOilScoreList:"operationmanagement/findOilScoreList.action",exportOilScoreGrid:"operationmanagement/exportOilScoreGrid.action",findSafeScoreList:"operationmanagement/findSafeScoreList.action",exportSafeScoreGrid:"operationmanagement/exportSafeScoreGrid.action",findOilWearScoreList:"operationmanagement/findOilWearScoreList.action",exportOilWearScoreGrid:"operationmanagement/exportOilWearScoreGrid.action",operationmanagement:"operationmanagement/queryRowData.action",findMaintainClassList:"maintain/findMaintainClassList.action",findAllClassByEntId:"maintain/findAllClassByEntId.action",createMaintainClass:"maintain/createMaintainClass.action",editMaintainClass:"maintain/editMaintainClass.action",findMaintainClassById:"maintain/findMaintainClassById.action",deleteMaintainClass:"maintain/deleteMaintainClass.action",selectMainTainPlanList:"maintain/selectMainTainPlanList.action",insertMainTainPlan:"maintain/insertMainTainPlan.action",singleMainTainPlan:"maintain/singleMainTainPlan.action",updateMainTainPlan:"maintain/updateMainTainPlan.action",deleteMainTainPlan:"maintain/deleteMainTainPlan.action",searchVehiclesMaintain:"maintain/searchVehiclesMaintain.action",searchUnSelectedVehicles:"maintain/searchUnSelectedVehicles.action",editVehiclesMaintain:"maintain/editVehiclesMaintain.action",mainTainRecordList:"maintain/mainTainRecordList.action",updateMaintainDateRecord:"maintain/updateMaintainDateRecord.action",changeMaintainStatR:"maintain/changeMaintainStatR.action",mainTainRecordUpdateList:"maintain/mainTainRecordUpdateList.action",exportMaintain:"maintain/exportMaintain.action",findMainTainStatisRecordList:"maintain/findMainTainStatisRecordList.action",mainTainStatisticsGraphData:"maintain/mainTainStatisticsGraphData.action",exportMaintainStatistics:"maintain/exportMaintainStatistics.action",findGpsInspectByParamString:"baseinfo/findGpsInspectByParamString.action",exportExcelDataQueryGpsInspect:"baseinfo/exportExcelDataQueryGpsInspect.action",findBusConsumeSumByParamString:"busconsume/findBusConsumeSumByParamString.action",findThBusConsumeSumAmount:"busconsume/findThBusConsumeSumAmount.action",exportExcelDataQueryBusConsumeSum:"busconsume/exportExcelDataQueryBusConsumeSum.action",findBusConsumeDetailByParamString:"busconsume/findBusConsumeDetailByParamString.action",findThBusConsumeDetailAmount:"busconsume/findThBusConsumeDetailAmount.action",exportExcelDataQueryBusConsumeDetail:"busconsume/exportExcelDataQueryBusConsumeDetail.action",findPlatInfos:"accord/findThPlatInfosByObjectId.action",inspectModify:"accord/modify.action",insureList:"operationmanagement/findVehicleInsuranceList.action",addInsure:"operationmanagement/addVehicleInsurance.action",updateInsure:"operationmanagement/modifyVehicleInsurance.action",deleteInsure:"operationmanagement/deleteVehicleInsurance.action",renewalInsure:"operationmanagement/addRenewVehicleInsurance.action",insureDetail:"operationmanagement/findVehicleInsuranceDetail.action",exportInsurance:"operationmanagement/exportExcelInsurance.action",accidentList:"operationmanagement/findTrafficAccidentList.action",addAccident:"operationmanagement/addTrafficAccident.action",updateAccident:"operationmanagement/modifyTrafficAccident.action",deleteAccident:"operationmanagement/deleteTrafficAccident.action",accidentDetail:"operationmanagement/findTrafficAccidentDetail.action",exportAccident:"operationmanagement/exportExcelAccident.action",uploadAttachmentInfo:"operationmanagement/upTrafficAccidentFile.action",deleteAttachmentInfo:"operationmanagement/deleteAccidentFile.action",repairList:"operationmanagement/findVehicleRepairList.action",addRepair:"operationmanagement/addVehicleRepair.action",updateRepair:"operationmanagement/modifyVehicleRepair.action",deleteRepair:"operationmanagement/deleteVehicleRepair.action",repairDetail:"operationmanagement/findVehicleRepairDetail.action",tripSummryStatList:"operationmanagement/queryDataInfo.action",exportTransSumInfo:"operationmanagement/exportTransSumInfo.action",tripDetailStatList:"operationmanagement/getDetailDataInfo.action",exportTransDayInfo:"operationmanagement/exportTransDayInfo.action",transInfoDetailList:"operationmanagement/getTransInfoDetail.action",exportTransDeList:"operationmanagement/exportTransDeList.action",findLock:"systemmng/findLockByParamPage.action",findLockVehicleParam:"systemmng/findLockVehicleParam.action",findCommandSendStatusBySeqs:"operationmanagement/findCommandSendStatusBySeqs.action",findCountByPassword:"systemmng/findCountByPassword.action",sendLockVehicleCommand:"systemmng/sendLockVehicleCommand.action",findLockExcel:"systemmng/exportExcelLockVehicle.action",test:""},template:{exportWindow:"model/template/exportWin.html",messageDetail:"model/template/message.htm",roadDetail:"model/template/roadDetail.htm",passwordModify:"model/template/password.htm",commitLog:"model/template/commitLog.html",eurocargo:"model/template/eurocargo.html",myQuestion:"model/template/myQuestion.html",myQuestionWin:"model/template/myQuestionWin.html",photoConfigView:"model/template/photographConfigView.html",photoConfigAdd:"model/template/photographConfigAdd.html",mediaDetail:"model/monitor/mediaDetail.html",drivdingVehicle:"model/safe/drivdingVehicle.html",veSpeedDetailWin:"model/template/veSpeedDetailWin.html",transInfoDetail:"model/template/transInfoDetail.html",vehicleSearch:"model/template/vehicleSearch.html",universalTree:"model/template/universalTree.html",monitorTree:"model/template/monitorTree.html",activeMonitor:"model/template/activeMonitor.html",activeAlarm:"model/template/activeAlarm.html",poiType:"model/template/poiType.html",addPoiType:"model/template/addPoiType.html",customPoiSearch:"model/template/poiSearch.html",batchVehicleTracking:"model/template/trackingWindow.html",oilTipGridBox:"model/template/oilTipGridBox.html",vehicleDetail:"model/template/vehicleDashBoard/vehicleDetail.html",vehiclePath:"model/template/vehicleDashBoard/vehiclePath.html",vehicleSchedule:"model/template/vehicleDashBoard/vehicleSchedule.html",vehiclePhoto:"model/template/vehicleDashBoard/vehiclePhoto.html",vehicleVideo:"model/template/vehicleDashBoard/vehicleVideo.html",vehicleAround:"model/template/vehicleDashBoard/vehicleAround.html",vehicleTaping:"model/template/vehicleDashBoard/vehicleTaping.html",vehicleTracking:"model/template/vehicleDashBoard/vehicleTracking.html",electronFenceVehicleBingding:"model/template/electronFenceVehicleBinding.html",trackAnalysisReplayPanel:"model/template/pathPlayPanel.html",routeVehicleBinding:"model/template/routeVehicleBinding.html",routeSetting:"model/template/routeSetting.html",stationSetting:"model/template/stationSetting.html",routeHistory:"model/template/routeHistory.html",routeAnchorPoint:"model/template/routeAnchorPoint.html",fuelManage:"model/template/fuelManage.html",vehicleOnlineOperating:"model/template/vehicleOnlineOperating.html",vehicleOnlineInfo:"model/template/vehicleOnlineInfo.html",RetPassWordPage:"model/template/RetPassWordPage.html",roleManageInfo:"model/template/roleManage.html",PredefinedMsgTemplate:"model/template/PredefinedMsgTemplate.html",AVMsgTemplate:"model/template/avMsgTemplate.html",systemVehicleBinding:"model/template/systemVehicleBinding.html",accidentAnalysisWin:"model/template/accidentAnalysisWin.html",monthExaminTemplate:"model/template/monthExaminTemplate.html",deviceStatusTemplate:"model/template/deviceStatusTemplate.html",maintainClassOper:"model/template/maintainClassOper.html",selectVehicle:"model/template/selectVehicle.html",vehicleAnalysedReportChoose:"model/template/vehicleAnalysedReportChoose.html",vehicleAnalysedReportChooseQuery:"model/template/vehicleAnalysedReportChooseQuery.html",importTemplate:"model/template/importWin.html",lockCarTemplate:"model/template/lockCarTemplate.html",test:""},modelNames:{homePage:"CTFO.Model.HomePage",monitor:"CTFO.Model.VehicleMonitor",fencing:"CTFO.Model.ElectronFence",route:"CTFO.Model.RouteManager",station:"CTFO.Model.StationManager",mediaInfo:"CTFO.Model.MediaInfo",trackAnalysis:"CTFO.Model.TrackAnalysis",trafficHistory:"CTFO.Model.TrafficHistory",crossDomainStatics:"CTFO.Model.CrossDomainStatics",alarmDetail:"CTFO.Model.AlarmDetail",alarmDetailHis:"CTFO.Model.AlarmDetailHis",alarmStatistic:"CTFO.Model.AlarmStatistic",drivdingHistory:"CTFO.Model.DrivdingHistory",gpsSignalLost:"CTFO.Model.GpsSignalLost",dangerousDriving:"CTFO.Model.DangerousDriving",accidentAnalysis:"CTFO.Model.AccidentAnalysis",vehicleSpeedAnomalous:"CTFO.Model.VehicleSpeedAnomalous",oilMass:"CTFO.Model.oilMass",fuelVolume:"CTFO.Model.FuelVolume",fuelVolumeAnalysed:"CTFO.Model.FuelVolumeAnalysed",fuelMassAnalysed:"CTFO.Model.FuelMassAnalysed",drivingAnalysed:"CTFO.Model.drivingAnalysed",fuelManage:"CTFO.Model.FuelManage",vehicleTeamManage:"CTFO.Model.VehicleTeamManage",corpMessageManage:"CTFO.Model.CorpMessageManage",systemParamManage:"CTFO.Model.SystemParamManage",terminalParamManage:"CTFO.Model.TerminalParamManage",photographConfig:"CTFO.Model.PhotographConfig",attemperInfo:"CTFO.Model.AttemperInfo",vehicleOnlineStatistics:"CTFO.Model.VehicleOnlineStatistics",vehicleMonthOnline:"CTFO.Model.VehicleMonthOnline",vehicleLoginStatistics:"CTFO.Model.VehicleLoginStatistics",vehicleTripStatistics:"CTFO.Model.VehicleTripStatistics",onlineVehicleQuery:"CTFO.Model.OnlineVehicleQuery",operationLog:"CTFO.Model.OperationLog",userOnline:"CTFO.Model.UserOnline",overSpeedStat:"CTFO.Model.VehicleOverSpeedStatistics",violationStatistics:"CTFO.Model.ViolationStatistics",mileageStatistics:"CTFO.Model.MileageStatistics",vehicleRunTimeStatistics:"CTFO.Model.VehicleRunTimeStatistics",monthExamineSettings:"CTFO.Model.monthExamineSettings",examineFuelMassSettings:"CTFO.Model.examineFuelMassSettings",examineScoreSettings:"CTFO.Model.ExamineScoreSettings",vehicleManage:"CTFO.Model.VehicleManager",querydriverssoltcard:"CTFO.Model.DriversSoltCard",gpsInspect:"CTFO.Model.gpsInspect",insureManage:"CTFO.Model.VehicleInsureManager",accidentManage:"CTFO.Model.VehicleAccidentManager",vehicleMaintain:"CTFO.Model.VehicleMaintainManager",driverManage:"CTFO.Model.DriverManage",driverICManage:"CTFO.Model.DriverICManage",transPortManage:"CTFO.Model.TransPortManage",userManage:"CTFO.Model.userManage",remoteLock:"CTFO.Model.remoteLock",vehicleAnalysedReport:"CTFO.Model.VehicleAnalysedReport",roleManage:"CTFO.Model.roleManage",vehicleMaintenance:"CTFO.Model.VehicleMaintenance",deviceStatus:"CTFO.Model.deviceStatus",operationExamine:"CTFO.Model.operationExamine",busconsumeSum:"CTFO.Model.busconsumeSum",busconsumeDetail:"CTFO.Model.busconsumeDetail",mReport:"CTFO.Model.mReport",tripStatistics:"CTFO.Model.tripStatistics",travelPage:"CTFO.Model.travelPage"},colors:["#62becf","#ffa651","#6ea6ec","#ff866e","#ffd92c","#60cb60","#9e9bf2","#fff275","#4bcbcb","#aad54b"],nodatPngUrl:"url(img/global/nodata.png)"},CTFO.utilFuns={codeManager:null,commandFuns:null,cMap:null,mapTool:null,tipWindow:null,commonFuns:null,poiSearch:null,treeManager:{}},CTFO.Model={},CTFO.Util={},location.href.indexOf("/WebContent/")>0&&$.each(CTFO.config.sources,function(e,t){CTFO.config.sources[e]="json/"+CTFO.config.sources[e]});