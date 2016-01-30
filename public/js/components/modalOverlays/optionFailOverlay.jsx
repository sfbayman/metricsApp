import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Popover from 'react-bootstrap/lib/Popover';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import AppViewActions from 'actions/appViewActions';


class OptionFailOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.showModal = this.props.optionFailOverlayStatus;
  }

  close() {
    console.log("hello")
    this.setState({ showModal: false });
    AppViewActions.updateOptionFailOverlayStatus(false);    
  }

  componentWillReceiveProps (newProps) {
    this.setState({showModal : newProps.optionFailOverlayStatus});
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {    
    return (
        <Modal show={this.state.showModal} className={"option-success"} onHide={this.close.bind(this)} animation={false}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Oops...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="body-title">Wrong Answer</h4>
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </Modal>
    );
  }
}

export default OptionFailOverlay;