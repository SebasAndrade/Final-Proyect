import { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clientAxios from '../../config/Axios';
import authToken from '../../config/token';
import { useHistory } from 'react-router-dom';
import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  ERROR_TOKEN,
  AUTH_TOKEN,
  LOGOUT,
  LOGIN,
  ERROR_LOGIN,
  CLEAR_MSG
} from '../../types'

const AuthState = ({ children }) => {
  const history = useHistory();
  const initialState = {
    token: localStorage.getItem("token") || null,
    user: null,
    alert: '',
    isAuth: false,
    loading: true
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const clearAlert = () => {
    dispatch({
      type: CLEAR_MSG
    })
  }

  const register = async user => {
    try {
      const response = await clientAxios.post('/users', user);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data
      })
      history.push('/subscriptions');
    } catch (error) {
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response.data.msg
      })
      console.log(error.response);
      setTimeout(() => {
        clearAlert();
      }, 2000)
    }
  }

  const authUser = async () => {
    const token = localStorage.getItem('token');
    authToken(token);
    try {
      const response = await clientAxios.get('/auth');
      dispatch({
        type: AUTH_TOKEN,
        payload: response.data.user
      })
    } catch (error) {
      dispatch({
        type: ERROR_TOKEN,
        payload: false
      })
    }
  }

  const logout = () =>{
    dispatch({
      type:LOGOUT
    })
  }

  const login = async data => {
    try {
      const response = await clientAxios.post('/auth', data);
      dispatch({
        type: LOGIN,
        payload: response.data
      })
      history.push('/home')
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
        payload: error.response.data.msg
      })
      setTimeout(() => {
        clearAlert();
      }, 2000)
    }
  }


  return (
    <AuthContext.Provider value={{
      token: state.token,
      user: state.user,
      isAuth: state.isAuth,
      alert: state.alert,
      loading: state.loading,
      register,
      authUser,
      logout,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthState;
