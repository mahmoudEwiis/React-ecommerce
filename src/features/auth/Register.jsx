
import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { register } from './authAPI';
import toast from 'react-hot-toast';
import ImageUploadBox from '../../components/ImageUploadBox';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    avatar: 'https://picsum.photos/800',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirm: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email);
  const nameValid = form.name.trim().length > 0;
  const passwordValid = form.password.length >= 6;
  const confirmValid = form.confirm.length && form.confirm === form.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });

    if (nameValid && emailValid && passwordValid && confirmValid) {
      try {
        const { confirm, ...payload } = form;
        await register(payload);
        toast.success('Registered successfully');
        navigate('/login');
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4} className="form-outLay">
          <h2 className="mb-4 text-center">Create a New Account</h2>
          <Form noValidate onSubmit={handleSubmit} className="w-100">
            <ImageUploadBox onUpload={(url) => setForm(prev => ({ ...prev, avatar: url }))} />

            <Form.Group controlId="name" className="mb-3 position-relative">
              <Form.Control
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                isInvalid={touched.name && !nameValid}
                isValid={touched.name && nameValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3 position-relative">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                isInvalid={touched.email && !emailValid}
                isValid={touched.email && emailValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                isInvalid={touched.password && !passwordValid}
                isValid={touched.password && passwordValid}
                required
                minLength={6}
              />
              <div
                className="password-toggle-icon"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirm" className="mb-4 position-relative">
              <Form.Control
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                onBlur={() => handleBlur('confirm')}
                isInvalid={touched.confirm && !confirmValid}
                isValid={touched.confirm && confirmValid}
                required
              />
              <div
                className="password-toggle-icon"
                onClick={() => setShowConfirm(prev => !prev)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </div>
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-3">
              Register
            </Button>

            <div className="text-center d-flex justify-content-center align-items-center gap-2">
              Already have an account?{' '}
              <Link to="/login" className="btn btn-link p-0">Login</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
