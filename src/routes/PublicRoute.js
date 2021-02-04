import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';


const PublicRoute = ({component:Component, ...props}) => {
  const { loading, isAuth, authUser } = useContext(AuthContext);

  useEffect(() => {
    authUser();
  }, [])

  if(loading) return 'Cargando...';
  return(
      <Route {...props} 
      render={props => isAuth && !loading ? (<Redirect to="/home"/>):(<Component {...props}/>) } />
  )
}
  export default PublicRoute