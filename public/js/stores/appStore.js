
import AppDispatcher from 'dispatcher/appDispatcher';
import AppConstants from 'constants/appConstants';
import dataJson from 'dataJson';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var appData = {
  user: {
    name: "Ram Polishetti"  
  },
  session: {
    id: "AA12"
  },
  score : {
    totalScore : 0,
    scoreJson : dataJson.score.scoreJson.reverse()
  },
  qSet: dataJson.qSet,
  cqIndex: 0,
  qElapsed: 0,
  optionSuccessOverlayStatus : false,
  optionFailOverlayStatus : false
}; 

function setCurrentQuestionIndex(data) { 
  appData.cqIndex = data;
}

function setQuestionsElapsed(data) {
  appData.qElapsed = data
}

function setActiveOption (data) {
  
  for(var i=0; i<appData.qSet[data.cqIndex].optionSet.length; i++){
    appData.qSet[data.cqIndex].optionSet[i].selected = false;    
  }

  appData.qSet[data.cqIndex].optionSet[data.index].selected = true;  
  appData.qSet[data.cqIndex].selectedOption = data.title;
  appData.qSet[data.cqIndex].selectedOptionIndex = data.index;

}

function updateOptionStatus(data){
  appData.qSet[data.cqIndex].optionStatus = data.optionStatus;
  appData.qSet[data.cqIndex].answered = true;
  if(appData.qElapsed < 15){
    appData.qElapsed =  appData.qElapsed + 1;
  }
}

function updateActiveScore (data) {
  /*Update active score node*/
  appData.score.scoreJson[appData.score.scoreJson.length-1-data.cqIndex].active = true;
}

function updateTotalScore (data) {
  var currentScore = Number(appData.score.scoreJson[appData.score.scoreJson.length-1-data.cqIndex].value);
  appData.score.totalScore = currentScore;
}

function updateAnimationStatus (data) {
  appData.qSet[data.cqIndex].optionSet[data.selectedOptionIndex].animationStatus = data.animationStatus;
}

function updateSecondaryAnimationStatus(data) {
  appData.qSet[data.cqIndex].optionSet[data.solutionKeyIndex].secondaryAnimationStatus = data.secondaryAnimationStatus;
}

function updateOptionPassed (data) {
 appData.qSet[data.cqIndex].optionSet[data.selectedOptionIndex].optionPassed = data.optionPassed; 
}

function updateOptionFailed(data){
  appData.qSet[data.cqIndex].optionSet[data.selectedOptionIndex].optionFailed = data.optionFailed; 
}

function updateOptionSuccessOverlayStatus (data) {
  appData.optionSuccessOverlayStatus = data.optionSuccessOverlayStatus;
}

function updateOptionFailOverlayStatus (data) {
  appData.optionFailOverlayStatus = data.optionFailOverlayStatus;
}

var AppStore = assign({}, EventEmitter.prototype, {
  
  getAll: function() {
    return appData;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

    addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

 

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var actionType = payload.action.actionType,
      data = payload.action.data;

    switch(actionType) {
      case AppConstants.SET_CURRENT_QUESTION_INDEX :
        
        setCurrentQuestionIndex(data)
        AppStore.emitChange();
        break;

      case AppConstants.SET_QUESTIONS_ELAPSED :
        AppStore.emitChange();
        break;

      case AppConstants.SET_ACTIVE_OPTION :
        setActiveOption(data);
        AppStore.emitChange();
        break;

      case AppConstants.UPDATE_OPTION_STATUS :
        updateOptionStatus(data);
        AppStore.emitChange();
        break;

      case AppConstants.UPDATE_ACTIVE_SCORE :
        updateActiveScore(data);
        break;

      case AppConstants.UPDATE_TOTAL_SCORE :
        updateTotalScore(data);
        break;

      case AppConstants.UPDATE_ANIMATION_STATUS :
        updateAnimationStatus(data);
        AppStore.emitChange();
        break;

      case AppConstants.UPDATE_OPTION_PASSED :
        updateOptionPassed(data);        
        break;

      case AppConstants.UPDATE_OPTION_FAILED :
        updateOptionFailed(data);        
        break;

      case AppConstants.UPDATE_OPTION_SUCCESS_OVERLAY_STATUS :
        updateOptionSuccessOverlayStatus(data);
        break;

      case AppConstants.UPDATE_OPTION_FAIL_OVERLAY_STATUS :
        updateOptionFailOverlayStatus(data);
        break;         

      case AppConstants.UPDATE_SECONDARY_ANIMATION_STATUS :
        updateSecondaryAnimationStatus(data);
        break;          
    



    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AppStore;