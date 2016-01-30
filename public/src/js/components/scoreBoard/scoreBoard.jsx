import React from 'react';
import ScoreNode from 'components/scoreNode/scoreNode';

class ScoreBoard extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="col-md-3 col-md-offset-2">
        <div className="score-board-header">
          <h1>Score Board</h1>
        </div>
        <div className="score-board">
          <div className="score-list">
            <ul>
              {
                this.props.scoreData.map((nodeObj)=>{
                  return (
                    <ScoreNode
                      key={nodeObj.serial}
                      active={nodeObj.active}
                      serial={nodeObj.serial}
                      value={nodeObj.value}                     
                    />
                  );
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;