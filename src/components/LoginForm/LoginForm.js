import { useContext } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import useForm from '../../hooks/useForm';
import { validationLogin } from '../../utils/validations';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const initialState = {
  email: '',
  password: ''
}

const LoginForm = ({ show, setShow }) => {
  const history = useHistory();
  const { login, alert } = useContext(AuthContext);
  const { handleChange, handleSubmit, values, errors } = useForm(
    initialState,
    validationLogin,
    submitLogin
  );

  async function submitLogin() {
    await login(values);
    setShow(false);
  }
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Ingrese su email" 
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>
          {
            errors && <h6 className="mt-1 text-danger">{errors.email}</h6>
          }
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Contraseña..."
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Group>
          {
            errors && <h6 className="mt-1 text-danger">{errors.password}</h6>
          }
          {
            alert && <Alert variant="danger">{alert}</Alert>
          }
          <Button type="submit" variant="primary" block>
            Ingresar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
 
export default LoginForm;