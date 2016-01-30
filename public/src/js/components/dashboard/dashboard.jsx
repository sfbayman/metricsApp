import React from 'react';
import BaseReactComponent from 'components/base/baseReactComponent';
import ScoreBoard from 'components/scoreBoard/scoreBoard';
import Score from 'components/score/score';
import QuestionBlock from 'components/questionBlock/questionBlock';
import OptionSuccessOverlay from 'components/modalOverlays/optionSuccessOverlay';
import OptionFailOverlay from 'components/modalOverlays/optionFailOverlay';

class Dashboard extends BaseReactComponent {
  
  constructor(props) {
    super(props);
  }

  getSolutionKeyIndex (cqIndex, qSet) {
   
   var solutionKey = qSet[cqIndex].solutionKey;
   
    switch(solutionKey){
      case "a" :
        return 0;
      case "b" :
        return 1;
      case "c" :
        return 2;
      case "d" :
        return 3      
    }
  }

  getValue(cqIndex, qSet, key) {
    
    switch(key){
      case "currentQuestion" :
        return qSet[cqIndex];
      case "currentOptions" :
        return qSet[cqIndex].optionSet;
      case "selectedOption" :
        return qSet[cqIndex].selectedOption; 
      case "solutionKey" :
        return qSet[cqIndex].solutionKey; 
      case "optionStatus" :
        return qSet[cqIndex].optionStatus; 
      case "answered" :
        return qSet[cqIndex].answered;
      case "selectedOptionIndex" :
        return qSet[cqIndex].selectedOptionIndex;  
      default :
        return; 
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Score currentScore = {this.state.score.totalScore}/>
        <div className="row">
          <QuestionBlock 
            cqIndex={this.state.cqIndex}
            currentQuestion={this.getValue(this.state.cqIndex, this.state.qSet, "currentQuestion")} 
            currentOptions={this.getValue(this.state.cqIndex, this.state.qSet, "currentOptions")}            
            solutionKey={this.getValue(this.state.cqIndex, this.state.qSet, "solutionKey")}
            solutionKeyIndex={this.getSolutionKeyIndex(this.state.cqIndex, this.state.qSet)}            
            selectedOption={this.getValue(this.state.cqIndex, this.state.qSet, "selectedOption")}
            selectedOptionIndex={this.getValue(this.state.cqIndex, this.state.qSet, "selectedOptionIndex")}                        
            optionStatus={this.getValue(this.state.cqIndex, this.state.qSet, "optionStatus")}
            answered={this.getValue(this.state.cqIndex, this.state.qSet, "answered")}       
          />    
          <ScoreBoard
            scoreData={this.state.score.scoreJson}            
          />
          <OptionSuccessOverlay optionSuccessOverlayStatus={this.state.optionSuccessOverlayStatus} />
          <OptionFailOverlay optionFailOverlayStatus={this.state.optionFailOverlayStatus} />
        </div>
      </div> 
    );
  }
}

export default Dashboard;