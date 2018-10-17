
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {deleteUser,showAlert} from '../actions/index'
import { Button,Modal } from 'react-bootstrap';

class DeleteButton extends Component {

  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteUserButton  = this.deleteUserButton.bind(this);
    this.state = {
      show: false
    };
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  deleteUserButton(user){
    this.props.deleteUser(user,( success )=>{
        this.props.showAlert({message:'Contact deleted successfully',type:'success',show:true})
    },( error )=>{
        this.props.showAlert({message:'Something went wrong',type:'danger',show:true})
    });
  }

  render(){
    const {user} = this.props;
    return(
      <span>
        <span className="btn btn-danger col-md-5" onClick={this.handleShow}>Delete</span>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Do you want to delete this contact ?</h3>
            <p>{user.fullname}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {this.deleteUserButton(user)} } bsClass="btn btn-danger">Delete</Button>
            <Button onClick={this.handleClose} >Close</Button>
          </Modal.Footer>
        </Modal>
      </span>
    )
  }
}
// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
  return bindActionCreators({deleteUser,showAlert}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(null, matchDispatchToProps)(DeleteButton);
