// import React, { useState } from 'react';
// import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (e) => {
//     const form = e.currentTarget;
//     e.preventDefault();
//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//     } else {
//       console.log({ email, password });
//     }
//     setValidated(true);
//   };

//   return (
//     <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
//       <Row className="w-100 justify-content-center">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <h2 className="mb-4 text-center">Login to Your Account</h2>
//           <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-100">
//             <FloatingLabel
//               controlId="floatingEmail"
//               label="Email address"
//               className="mb-3"
//             >
//               <Form.Control
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//                 isInvalid={validated && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter a valid email address.
//               </Form.Control.Feedback>
//             </FloatingLabel>

//             <FloatingLabel
//               controlId="floatingPassword"
//               label="Password"
//               className="mb-4"
//             >
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//                 minLength={6}
//               />
//               <Form.Control.Feedback type="invalid">
//                 Please enter your password (at least 6 characters).
//               </Form.Control.Feedback>
//             </FloatingLabel>

//             <Button variant="primary" type="submit" className="w-100">
//               Login
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }











import React, { useState } from 'react';
import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import './auth.module.css'; 
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const passwordValid = password.length >= 6;

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (emailValid && passwordValid) {
      console.log({ email, password });
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="mb-4 text-center">Login to Your Account</h2>
          <Form noValidate onSubmit={handleSubmit} className="w-100">
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3 form-floating-custom">
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
