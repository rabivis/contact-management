import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import {selectUser,updateUser,insertUser,showAlert} from '../actions/index'
import {bindActionCreators} from 'redux';
import axios from 'axios';

class ContactForm extends React.Component
{
  constructor(props) {
    super(props)
    this.submitData = this.submitData.bind(this)
    this.resetCallback  = this.resetCallback.bind(this);
  }
  submitData(values){
    if(values.id !== undefined){
      this.props.updateUser(values,(response) => {
        this.resetCallback()
        this.props.showAlert({message:'Contact update successfully',type:'success',show:true})
      },(error)=>{
        this.props.showAlert({message:'Something went wrong',type:'danger',show:true})
      });
    } else {
      this.props.insertUser(values,(response) => {
        this.resetCallback()
        this.props.showAlert({message:'Contact create successfully',type:'success',show:true})
      },(error)=>{
        this.props.showAlert({message:'Something went wrong',type:'danger',show:true})
      });
    }
  }
  resetCallback () {
    this.props.reset();
    this.props.selectUser({});
  }

  render(){
  const { handleSubmit, pristine, reset, submitting,initialValues } = this.props;
  return (
    <div>
      <h2>{ (initialValues == null) ? 'Insert New Contact' :'Update Contact'}</h2>
      <form onSubmit={handleSubmit(this.submitData)} className="contact-from">
        <Field name="fullname"
          component={renderField}
          type="text"
          placeholder="name"
          label="Name"
        />
        <Field
          name="phone_number"
          component={renderField}
          type="number"
          placeholder="Phone number"
          label="Phone number"
        />

        <div className="form-group">
          <div className="row">
            <div className="col-md-6">
              <button type="submit" className="btn btn-success" disabled={pristine || submitting}>Submit</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="btn btn-primary pull-right" onClick={this.resetCallback}>Clear Values</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
  }

}

const renderField = (field) => (
  <div className="form-group">
    <label htmlFor={field.name}>{field.label}:</label>
    <input {...field.input} type="text" className="form-control"/>
    {field.meta.touched && field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>
)


function mapStateToProps(state) {
  console.log('state.form',state.form);
    return {
        initialValues: state.activeUser
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({selectUser,updateUser,insertUser,showAlert}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(reduxForm({form: 'ContactForm',enableReinitialize:true})(ContactForm));
