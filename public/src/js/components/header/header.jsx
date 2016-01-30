import React from 'react';
import BaseReactComponent from 'components/base/baseReactComponent';

class Header extends BaseReactComponent {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <header>
      	<div className="container-fluid">
          <div className="header-top user-settings">
            <div className="row user-name">
              <div className="col-md-12 text-right">{this.state.user.name}</div>
            </div>
          </div>
        </div>
      </header>  
    );
  }
}

export default Header;