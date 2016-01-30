import React from 'react';
import classNames from 'classnames';

class ScoreNode extends React.Component {
  
  constructor(props) {
    super(props);
  }

  checkActiveScoreStatus(qIndex, optionStatus){



  }
  
  render() {
    let activeScoreArrow = ((currentComponent)=>{
      if(currentComponent.props.active){
        return <span aria-hidden="true" className="glyphicon glyphicon-chevron-right"></span>;
      } else {
       return null;
      }
    })(this);  

    return (
      <li className={classNames("score-node",this.props.active ? 'active':'')}>
        <div className="row">
          <div className="col-md-1">
             {activeScoreArrow}
          </div>
          <div className="col-md-1">{this.props.serial}</div>
          <div className="col-md-8">{this.props.value}</div>
        </div>
      </li>
    );
  }
}

export default ScoreNode;