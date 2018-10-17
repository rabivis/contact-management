import React from 'react';
import UserList from '../containers/user-list';
import ContactForm from '../containers/contact-form';
import AlertMessage from '../containers/alert';

require('../../css/style.css');

const App = () => (
  <div>
    <div className="jumbotron text-center">
      <h1>Contact book</h1>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-12">
              <AlertMessage />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <ContactForm />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <UserList />
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
    <br/>
    <div className="jumbotron">
    </div>
   </div>
);

export default App;
