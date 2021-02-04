import {useEffect, useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import "../styles/colorspallete.css"
import AuthContext from '../context/auth/authContext'
import useForm from '../hooks/useForm'
import clientAxios from '../config/Axios'

const ChangePasswordPage = ({match, props}) => {
    localStorage.setItem('token',match.params.tokenPass)
    const {authUser, isAuth, loading, user, logout} = useContext(AuthContext)
    useEffect(()=>{
        authUser();
    },[])
    const initialState={
        password:'',
        password2:'',
    }
    const validateChange = values  =>{
        let errors = {}
        if(values.password==='')
        {
            errors.password='Password is required'
        } else if(values.password.length<8 || values.password.length>15)
        {
            errors.password='Password must be between 8 to 16 characters'
        }
        if(values.password2===''){
        errors.password2='Password is required'
        } else if(values.password !== values.password2)
        {
            errors.password='Password do not match'
        }
        return errors
    }
    const submitPassword = async () => {
        await clientAxios.put(`/users/changePassword/${user._id}`,values);
        logout()
    }
    const { handleChange, handleSubmit, values, errors } = useForm(
        initialState,
        validateChange,
        submitPassword
    );
    return(
            <Route {...props} 
            render={() => !isAuth && !loading ? (<Redirect to="/"/>):
            (
                <Container className='my-5'>
                    <p className='mb-5'>Hola! Introduce tu nueva contraseña en los siguientes campos. Una vez ingresada, presiona el boton 'Cambiar contraseña'. Luego serás redirigido al inicio donde podrás loguearte con tu nueva contraseña. <b>Debes realizarlo dentro de los proximos 15 minutos, de lo contrario, deberas realizar nuevamente todos los pasos para recuperar la contraseña</b></p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Escribe tu nueva contraseña</Form.Label>
                        <Form.Control
                        size="md" 
                        type="password" 
                        placeholder="Enter your new password"
                        onChange={handleChange}
                        name='password'
                        value={values.password}
                        className='mb-3'
                        ></Form.Control>
                        {errors && <h5 className='text-danger'> {errors.password}</h5>}
                        <Form.Label>Repite tu nueva contraseña</Form.Label>
                        <Form.Control
                        size="md" 
                        type="password" 
                        placeholder="Enter your new password, again"
                        onChange={handleChange}
                        name='password2'
                        value={values.password2}
                        className='mb-3'
                        ></Form.Control>
                        {errors && <h5 className='text-danger'> {errors.password2}</h5>}
                        <Button type='submit' className='btn bg-color4 mt-5'>Cambiar contraseña</Button>
                    </Form>
                </Container>
            ) } />
    );
}

export default ChangePasswordPage