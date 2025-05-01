










import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import './auth.module.css'; 
import { Link } from 'react-router-dom';
import { login } from './authAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ userName: false, password: false });
  const navigate = useNavigate();

  const passwordValid = password.length >= 6;
  const userNameValid = userName.length > 0; 

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ userName: true, password: true });
    if (userNameValid && passwordValid) {
      try {
        const credentials = {
          username: userName,
          password: password,
        };
        const data = await login(credentials);
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!');
        navigate('/');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };



  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="mb-4 text-center">Login to Your Account</h2>
          <Form noValidate onSubmit={handleSubmit} className="w-100">
            {/* <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3 form-floating-custom">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                isInvalid={touched.email && !emailValid}
                isValid={touched.email && emailValid}

              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </FloatingLabel> */}

            <FloatingLabel controlId="floatingUserName" label="User Name" className="mb-3 form-floating-custom">
              <Form.Control
                type="text"
                placeholder="User Name"
                value={userName}
                onBlur={() => handleBlur('userName')}
                onChange={e => setUserName(e.target.value)}
                isInvalid={touched.userName && !userNameValid}
                isValid={touched.userName && userNameValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid User Name.
              </Form.Control.Feedback>
            </FloatingLabel>


            

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4 form-floating-custom">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                isInvalid={touched.password && !passwordValid}
                isValid={touched.password && passwordValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="mt-3 text-center d-flex justify-content-center align-items-center gap-1">
              Don't have an account?{' '}
              <Link to="/register" className="btn btn-link p-0">
                Register
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
