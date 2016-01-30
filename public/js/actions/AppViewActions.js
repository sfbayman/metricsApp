import AppDispatcher from 'dispatcher/appDispatcher';
import AppConstants from 'constants/appConstants';

// Define actions object
let AppViewActions = {

// Set current question serial
  setCurrentQuestionIndex: function(index){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_CURRENT_QUESTION_INDEX,
      data: index
    });
  },

// Set active option
	setActiveOption : function(title, index, cqIndex) {
		AppDispatcher.handleViewAction({
      actionType: AppConstants.SET_ACTIVE_OPTION,
      data: {
        title : title,
      	index : index,
      	cqIndex : cqIndex        
      }
    });
	},

  updateOptionStatus : function(cqIndex, result){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_STATUS,
      data: {
        cqIndex : cqIndex,
        optionStatus : result        
      }
    });
  },

  updateActiveScore : function(cqIndex){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_ACTIVE_SCORE,
      data: {
        cqIndex : cqIndex
      }
    });
  },

  updateTotalScore : function(cqIndex) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_TOTAL_SCORE,
      data: {
        cqIndex : cqIndex
      }
    });
  },

  updateAnimationStatus : function(cqIndex, selectedOptionIndex, animationStatus){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_ANIMATION_STATUS,
      data: {
        cqIndex : cqIndex,
        selectedOptionIndex : selectedOptionIndex,
        animationStatus : animationStatus
      }
    });
  },

  updateSecondaryAnimationStatus : function(cqIndex, solutionKeyIndex, secondaryAnimationStatus){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_SECONDARY_ANIMATION_STATUS,
      data: {
        cqIndex : cqIndex,
        solutionKeyIndex : solutionKeyIndex,
        secondaryAnimationStatus : secondaryAnimationStatus
      }
    });
  },

  updateOptionPassed : function (cqIndex,selectedOptionIndex, optionPassed ){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_PASSED,
      data: {
        cqIndex : cqIndex,
        selectedOptionIndex : selectedOptionIndex,
        optionPassed : optionPassed
      }
    });

  },


  updateOptionFailed : function (cqIndex,selectedOptionIndex, optionFailed) {
    
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_FAILED,
      data: {
        cqIndex : cqIndex,
        selectedOptionIndex : selectedOptionIndex,
        optionFailed : optionFailed
      }
    }); 
  },

  updateOptionSuccessOverlayStatus : function (optionSuccessOverlayStatus){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_SUCCESS_OVERLAY_STATUS,
      data: {        
        optionSuccessOverlayStatus : optionSuccessOverlayStatus        
      }
    }); 
  },

  updateOptionFailOverlayStatus : function (optionFailOverlayStatus){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_OPTION_FAIL_OVERLAY_STATUS,
      data: {        
        optionFailOverlayStatus : optionFailOverlayStatus        
      }
    }); 
  }
};

export default AppViewActions;
