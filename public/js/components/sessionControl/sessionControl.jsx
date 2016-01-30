import React from 'react';
import AppViewActions from 'actions/appViewActions';
class SessionControl extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  setCurrentQuestionIndex (cqIndex, answered, optionStatus, nxtCtrl) {
    var cqIndex = Number(cqIndex);
    
    if(nxtCtrl) {
      if(answered && optionStatus) {
        if(cqIndex<14){
          AppViewActions.setCurrentQuestionIndex(cqIndex+1);
        }else{
          console.log("Session ended");
        }
      }else{
        console.log("please lock current question")
      }    
    }else {
      if(cqIndex>0){
        AppViewActions.setCurrentQuestionIndex(cqIndex-1);
      }else{
        console.log("You reached first question");
      }
    }
  }




  lockOption(cqIndex, answered, selectedOption, selectedOptionIndex, solutionKey, solutionKeyIndex) {

     if(selectedOption && !answered) {
    AppViewActions.updateAnimationStatus(cqIndex, selectedOptionIndex, true);
    
    setTimeout(function(){
      AppViewActions.updateAnimationStatus(cqIndex, selectedOptionIndex, false);
     
        if(selectedOption == solutionKey) {  
          AppViewActions.updateOptionPassed(cqIndex, selectedOptionIndex, true)        
          AppViewActions.updateActiveScore(cqIndex);
          AppViewActions.updateTotalScore( cqIndex );
          AppViewActions.updateOptionSuccessOverlayStatus(true);
          AppViewActions.updateOptionStatus(cqIndex, true);
          
        }else{
          AppViewActions.updateOptionFailed(cqIndex, selectedOptionIndex, true);
          AppViewActions.updateOptionFailOverlayStatus(true);
          AppViewActions.updateSecondaryAnimationStatus(cqIndex, solutionKeyIndex, true);
          AppViewActions.updateOptionStatus(cqIndex, false);

        }
         },5000)
      }else{
        console.log("please choose option");
      }
  }

  render() {
    return (
      <div className='row user-controls'>
        <div className='col-md-2 col-md-offset-3'>
          <button type="button" className="evn-btn btn btn-primary" 
            onClick={this.setCurrentQuestionIndex.bind(this, this.props.cqIndex, this.props.answered, this.props.optionStatus, false)}>
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-left prev-btn"></span>Previous
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="btn btn-primary evn-btn" 
            onClick={this.lockOption.bind(this,this.props.cqIndex, 
              this.props.answered, 
              this.props.selectedOption,
              this.props.selectedOptionIndex, 
              this.props.solutionKey, 
              this.props.solutionKeyIndex)}>Lock
            <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
          </button>
        </div>
        <div className='col-md-2'>
          <button type="button" className="evn-btn btn btn-primary"
            onClick={this.setCurrentQuestionIndex.bind(this, this.props.cqIndex, this.props.answered, this.props.optionStatus, true)}>Next
            <span aria-hidden="true" className="glyphicon glyphicon-chevron-right next-btn"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default SessionControl;