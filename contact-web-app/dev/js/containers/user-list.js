import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectUser,getUserList} from '../actions/index'
import DeleteButton from './delete-button';



class UserList extends Component {

  constructor(props) {
    super(props)
  }
  componentDidMount(){
    this.props.getUserList();
  }

  renderList() {
    if(this.props.users == null){
      return(<div />);
    }
      return this.props.users.map((user) => {
          return (
              <li key={user.id} className="list-group-item">
                <div className="row">
                  <div className="col-md-4">{user.fullname}</div>
                  <div className="col-md-4">{user.phone_number}</div>
                  <div className="col-md-4">

                    <span className="btn btn-primary margin-right col-md-5" onClick={() => this.props.selectUser(user)}>Update</span>
                    <DeleteButton user={user}/>
                  </div>
                </div>
              </li>
          );
      });
  }

  render() {
      return (
        <div>
          <h2>Contacts List</h2>
          <ul className="list-group">
              {this.renderList()}
          </ul>

        </div>
      );
  }
}

// Get apps state and pass it as props to UserList
function mapStateToProps(state) {
    return {
        users: state.users
    };
}

// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
  return bindActionCreators({selectUser,getUserList}, dispatch);
}

// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(UserList);
