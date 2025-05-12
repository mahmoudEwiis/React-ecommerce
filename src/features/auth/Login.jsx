import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';
import { Link } from 'react-router-dom';
import { getProfile, login } from './authAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState({ email: false, password: false });
    const [showPassword, setShowPassword] = useState(false);
    const { setProfile } = useProfile();
    const navigate = useNavigate();

    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    const passwordValid = password.length >= 6;

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        if (emailValid && passwordValid) {
            try {
                await login({ email, password });

                const profile = await getProfile()
                console.log(profile)
                if (profile) {
                    setProfile(profile)
                }


                toast.success('Logged in!');
                navigate('/');
            } catch (err) {
                toast.error(err.message);
            }
        }
    };



    return (
        <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={8} md={6} lg={4} className="form-outLay">
                    <h2 className="mb-4 text-center">Login</h2>
                    <Form noValidate onSubmit={handleSubmit} className="w-100">
                        <Form.Group controlId="email" className="mb-3 position-relative">
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
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-4 position-relative">
                            <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onBlur={() => handleBlur('password')}
                                isInvalid={touched.password && !passwordValid}
                                isValid={touched.password && passwordValid}
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

                        <Button type="submit" className="w-100 mb-3">
                            Login
                        </Button>

                        <div className="text-center">
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
