import {useState} from 'react'
import clientAxios from './../config/Axios'
import { Form } from 'react-bootstrap'
import Button  from 'react-bootstrap/Button'
import useForm from './../hooks/useForm'
import "../styles/colors-palette.css"
import ModalRecoverPassword from '../components/Modals/ModalRecoverPassword'

const RecoverPasswordPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const initialState={
        email:''
    }
    const validateRecover = values  =>{
        let errors = {}
        if(values.email==='')
        {
            errors.email='Email is required'
        } else if(!/\S+@\S+\.\S+/.test(values.email))
        {
            errors.email='Email adress invalid'
        }
        return errors
    }
    const submitEmail = async () => {
        await clientAxios.post('/users/recoverPassword',values);
        setShow(true);
    }
    const { handleChange, handleSubmit, values, errors } = useForm(
        initialState,
        validateRecover,
        submitEmail
    );
    return(
        <>
            <div className="bg-color1">
                <div className="container vh-75">
                    <div className="row d-flex justify-content-center">
                        <div className="p-0 text-center">
                            <h1 className="col-12 my-4 pb-4 border-bottom border-primary">I forgot my password</h1>
                            <h4 className="col-12 mb-0">Enter your email to receive instructions on how to set a new password</h4>
                        </div>
                        <Form onSubmit={handleSubmit} className="col-11 col-md-8 col-lg-5 my-5 bg-color3 border rounded border-dark p-4">
                            <Form.Label><h5 className="text-white">Email address</h5></Form.Label>
                            <Form.Control 
                            size="lg" 
                            type="email" 
                            placeholder="Enter email"
                            onChange={handleChange}
                            name='email'
                            value={values.email}
                            // required
                            />
                            <Form.Text className="text-white">
                                For example: akademy@akademy.com
                            </Form.Text>
                            <Button type='submit' className="col-s-11 my-3 bg-color4  p-2">
                                Send instructions
                            </Button>
                            {errors && <h5 className='text-danger'> {errors.email}</h5>}
                            <ModalRecoverPassword
                            show={show} 
                            onHide={handleClose} 
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RecoverPasswordPage