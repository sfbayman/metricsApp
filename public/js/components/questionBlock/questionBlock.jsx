import React from 'react';
import OptionBlock from 'components/optionBlock/optionBlock';
import SessionControl from 'components/sessionControl/sessionControl';

class QuestionBlock extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="col-md-7 question-section">        
        <div className="row q-div">
          <div className="col-md-2 q-serial">
            <span>{this.props.currentQuestion.serial}</span>
          </div>
          <div className="col-md-10 q-text">
            {this.props.currentQuestion.text}
          </div>
        </div>
        <div className="row option-section">
          {
            this.props.currentOptions.map((optObj, index)=>{
              return (
                <OptionBlock 
                  key={index} 
                  index={index}
                  title={optObj.title}
                  text={optObj.text}  
                  cqIndex={this.props.cqIndex}                  
                  selected={optObj.selected}
                  answered={this.props.answered}
                  optionStatus={this.props.optionStatus}                  
                  animationStatus={optObj.animationStatus}
                  secondaryAnimationStatus={optObj.secondaryAnimationStatus}
                  optionPassed={optObj.optionPassed}
                  optionFailed={optObj.optionFailed}
                />
              )
            })
          }
        </div>
        <SessionControl
          cqIndex={this.props.cqIndex}
          solutionKey={this.props.solutionKey}
          solutionKeyIndex={this.props.solutionKeyIndex}
          selectedOption={this.props.selectedOption}
          selectedOptionIndex={this.props.selectedOptionIndex}
          answered={this.props.answered}
          optionStatus={this.props.optionStatus}
        />
      </div>
    );
  }
}

export default QuestionBlock;