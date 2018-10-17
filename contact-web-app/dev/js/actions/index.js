import axios from 'axios';
const BASE_URL = 'http://localhost:3031/contacts/';

export const selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};
export const showAlert = (data) => {
  return (dispatch) => {
      dispatch({type: 'SHOW_ALERT_MESSAGE',payload: data});
      setTimeout(
          function() {
              const data = [...data,{show:false}];
              dispatch({type: 'SHOW_ALERT_MESSAGE',payload: data});
          }
          .bind(dispatch),
          5000
      );
    }
};


export const updateUser = (user,successCallback,errorCallback) => {
    return (dispatch) => {
      axios.put(BASE_URL,user)
        .then((response) =>{
          dispatch(getUserList())
          successCallback(response)
        }).catch((error) => {
          errorCallback(error)
        })
    }
};
export const insertUser = (user,successCallback,errorCallback) => {
    return (dispatch) => {
      axios.post(BASE_URL,user)
        .then((response) =>{
          dispatch(getUserList())
          successCallback(response)
        }).catch((error) => {
          errorCallback(error)
        })
    }
};

export const getUserList = () => {
  return (dispatch) => {
    axios.get(BASE_URL)
      .then((response) =>{
        dispatch({type: 'GET_USER_LIST',payload: response.data})
      }).catch((error) => {
        dispatch({type: 'GET_USER_LIST',payload: {}})
      })
  }
};

export const deleteUser = (user,successCallback,errorCallback) => {
    return (dispatch) => {
      axios.delete(`${BASE_URL}${user.id}`)
        .then((response) =>{
          dispatch(getUserList())
          successCallback(response)
        }).catch((error) => {
          errorCallback(error)
        })
    }
};
