import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Alert} from 'react-bootstrap';

class AlertMessage extends Component{

  render(){
    let {alert} = this.props;
    if(alert == undefined){
      alert = {show:false};
    }
    return (
      <div>
        {(alert.show)?
        <Alert bsStyle={alert.type}>
          <strong>{alert.message}</strong>
        </Alert>
        : ''
        }
      </div>

    )
  }
}


// Get apps state and pass it as props to UserList
function mapStateToProps(state) {
    return {
        alert: state.alertData
    };
}


// We don't want to return the plain UserList (component) anymore, we want to return the smart Container
//      > UserList is now aware of state and actions
export default connect(mapStateToProps, null)(AlertMessage);
