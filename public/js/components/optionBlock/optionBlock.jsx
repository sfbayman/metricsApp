import React from 'react';
import AppViewActions from 'actions/appViewActions';
import classNames from 'classnames';

class OptionBlock extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  /*Sets selected option, option index,option selection status in option set and question*/
  setActiveOption(title, index, cqIndex, answered) { 
    if(!answered){
      AppViewActions.setActiveOption(title, index, cqIndex);  
    } else {
      console.log("You answered already");
    }   
  }

  render() {
    return (
      <div className={classNames("col-md-6","option-div",this.props.selected ? "selected" : null, this.props.animationStatus ? "animate" : null,
        this.props.optionPassed ? "passed" : null, this.props.optionFailed ? "failed" : null, this.props.secondaryAnimationStatus ? "solution-animate" : null)}>
        <div className="row">
          <div className="col-md-2 option-serial">{this.props.title}</div>
          <div className="col-md-10 option-text" 
            onClick={this.setActiveOption.bind(this, this.props.title, this.props.index, this.props.cqIndex, this.props.answered)}>
            {this.props.text}
          </div>
        </div>
      </div>
    );
  }
}

export default OptionBlock;