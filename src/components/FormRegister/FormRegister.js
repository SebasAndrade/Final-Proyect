import { useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { validationRegister } from '../../utils/validations';
import AuthContext from '../../context/auth/authContext';
import useForm from '../../hooks/useForm';

const initialValues = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

const FormRegister = () => {
    
    const { handleChange, handleSubmit, values, errors } = useForm(
        initialValues,
        validationRegister,
        submitForm
    );
        
    const { register, alert } = useContext(AuthContext);
    
    async function submitForm()  {
        await register(values);
    }
    return(
        <>
            <Form onSubmit={handleSubmit} noValidate className="mb-3">
                <Form.Control
                    className="mt-3"
                    size="lg"
                    type="text"
                    placeholder="Enter username"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    />
                {errors.name && <h6 className="mt-1 text-danger">{errors.name}</h6>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        className="mt-3"
                        size="lg"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <h6 className="mt-1 text-danger">{errors.email}</h6>}
                    <Form.Text className="text-muted my-2">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        size="lg"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    {errors.password && <h6 className="mt-1 text-danger">{errors.password}</h6>}
                    <Form.Control
                        className="mt-3"
                        size="lg"
                        type="password"
                        placeholder="Repeat Password"
                        name="password2"
                        value={values.password2}
                        onChange={handleChange}
                    />
                    {errors.password2 && <h6 className="mt-1 text-danger">{errors.password2}</h6>}
                </Form.Group>
                <Button className="col-12" variant="primary" type="submit">
                    Enviar
                </Button>
                <a className="m-5" href="#"></a>
                <Link to="/recoverpassword">Have you forgotten the password?</Link>
                {
                    alert &&
                    <Alert variant="danger">{alert}</Alert>
                }
            </Form>
        </>
    );
}

export default FormRegister