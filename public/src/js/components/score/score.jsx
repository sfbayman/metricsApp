import React from 'react';

class Score extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
    	<div className="row score-comp">
        <div className="col-md-4 col-md-offset-4 total-score">
          <span>{this.props.currentScore}</span>
        </div>
      </div>  
    );
  }
}

export default Score;