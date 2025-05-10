// // import React, { useState } from 'react';
// // import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
// // import { Link, useNavigate } from 'react-router-dom';
// // import './auth.css';
// // import { register } from './authAPI';
// // import toast from 'react-hot-toast';

// // export default function Register() {
// //   const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', avatar: "https://picsum.photos/800" });
// //   const [touched, setTouched] = useState({ name: false, email: false, password: false, confirm: false });
// //   const navigate = useNavigate();

// //   const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email);
// //   const nameValid = form.name.trim().length > 0;
// //   const passwordValid = form.password.length >= 6;
// //   const confirmValid = form.confirm.length && form.confirm === form.password;

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleBlur = (field) => {
// //     setTouched(prev => ({ ...prev, [field]: true }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setTouched({ name: true, email: true, password: true, confirm: true });
// //     if (nameValid && emailValid && passwordValid && confirmValid) {
// //       console.log('Register data:', form);
// //       try {
// //         const { confirm, ...payload } = form;
// //         await register(payload);
// //         toast.success('Registered successfully');
// //         navigate('/login');
// //       } catch (err) {
// //         toast.error(err.message);
// //       }
// //     }
// //   };

// //   return (
// //     <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
// //       <Row className="w-100 justify-content-center">
// //         <Col xs={12} sm={8} md={6} lg={4}>
// //           <h2 className="mb-4 text-center">Create a New Account</h2>
// //           <Form noValidate onSubmit={handleSubmit} className="w-100">
// //             <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3 form-floating-custom">
// //               <Form.Control
// //                 type="text"
// //                 name="name"
// //                 placeholder="Full Name"
// //                 value={form.name}
// //                 onChange={handleChange}
// //                 onBlur={() => handleBlur('name')}
// //                 isInvalid={touched.name && !nameValid}
// //                 isValid={touched.name && nameValid}
// //                 required
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 Please enter your name.
// //               </Form.Control.Feedback>
// //             </FloatingLabel>

// //             <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3 form-floating-custom">
// //               <Form.Control
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email address"
// //                 value={form.email}
// //                 onChange={handleChange}
// //                 onBlur={() => handleBlur('email')}
// //                 isInvalid={touched.email && !emailValid}
// //                 isValid={touched.email && emailValid}
// //                 required
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 Please enter a valid email address.
// //               </Form.Control.Feedback>
// //             </FloatingLabel>

// //             <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 form-floating-custom">
// //               <Form.Control
// //                 type="password"
// //                 name="password"
// //                 placeholder="Password"
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 onBlur={() => handleBlur('password')}
// //                 isInvalid={touched.password && !passwordValid}
// //                 isValid={touched.password && passwordValid}
// //                 required
// //                 minLength={6}
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 Password must be at least 6 characters.
// //               </Form.Control.Feedback>
// //             </FloatingLabel>

// //             <FloatingLabel controlId="floatingConfirm" label="Confirm Password" className="mb-4 form-floating-custom">
// //               <Form.Control
// //                 type="password"
// //                 name="confirm"
// //                 placeholder="Confirm Password"
// //                 value={form.confirm}
// //                 onChange={handleChange}
// //                 onBlur={() => handleBlur('confirm')}
// //                 isInvalid={touched.confirm && !confirmValid}
// //                 isValid={touched.confirm && confirmValid}
// //                 required
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 Passwords do not match.
// //               </Form.Control.Feedback>
// //             </FloatingLabel>

// //             <Button variant="success" type="submit" className="w-100 mb-3">
// //               Register
// //             </Button>

// //             <div className="text-center d-flex justify-content-center align-items-center gap-2">
// //               Already have an account?{' '}
// //               <Link to="/login" className="btn btn-link p-0">
// //                 Login
// //               </Link>
// //             </div>
// //           </Form>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }




// import React, { useState } from 'react';
// import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import './auth.css';
// import { register, uploadFiles } from './authAPI'; // تأكد إنك ضايف uploadFiles هنا
// import toast from 'react-hot-toast';

// export default function Register() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirm: '',
//     avatar: ''
//   });

//   const [uploading, setUploading] = useState(false);
//   const [touched, setTouched] = useState({
//     name: false, email: false, password: false, confirm: false, avatar: false
//   });

//   const navigate = useNavigate();

//   const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email);
//   const nameValid = form.name.trim().length > 0;
//   const passwordValid = form.password.length >= 6;
//   const confirmValid = form.confirm.length && form.confirm === form.password;
//   const avatarValid = !!form.avatar;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBlur = (field) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       const uploaded = await uploadFiles(formData);
//       setForm(prev => ({ ...prev, avatar: uploaded.location }));
//       toast.success("Image uploaded");
//     } catch (err) {
//       toast.error("Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({
//       name: true, email: true, password: true, confirm: true, avatar: true
//     });

//     if (nameValid && emailValid && passwordValid && confirmValid && avatarValid) {
//       try {
//         const { confirm, ...payload } = form;
//         await register(payload);
//         toast.success('Registered successfully');
//         navigate('/login');
//       } catch (err) {
//         toast.error(err.message);
//       }
//     }
//   };

//   return (
//     <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
//       <Row className="w-100 justify-content-center">
//         <Col xs={12} sm={8} md={6} lg={4}>
//           <h2 className="mb-4 text-center">Create a New Account</h2>
//           <Form noValidate onSubmit={handleSubmit} className="w-100">

//             {/* Name */}
//             <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur('name')}
//                 isInvalid={touched.name && !nameValid}
//                 isValid={touched.name && nameValid}
//               />
//               <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Email */}
//             <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur('email')}
//                 isInvalid={touched.email && !emailValid}
//                 isValid={touched.email && emailValid}
//               />
//               <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Password */}
//             <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur('password')}
//                 isInvalid={touched.password && !passwordValid}
//                 isValid={touched.password && passwordValid}
//                 minLength={6}
//               />
//               <Form.Control.Feedback type="invalid">Password must be at least 6 characters.</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Confirm */}
//             <FloatingLabel controlId="floatingConfirm" label="Confirm Password" className="mb-3">
//               <Form.Control
//                 type="password"
//                 name="confirm"
//                 value={form.confirm}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur('confirm')}
//                 isInvalid={touched.confirm && !confirmValid}
//                 isValid={touched.confirm && confirmValid}
//               />
//               <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Avatar Upload */}
//             <Form.Group controlId="formFile" className="mb-3">
//               <Form.Label>Upload Profile Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 isInvalid={touched.avatar && !avatarValid}
//               />
//               <Form.Control.Feedback type="invalid">Please upload an image.</Form.Control.Feedback>
//               {form.avatar && <img src={form.avatar} alt="Avatar preview" className="mt-2 w-100 rounded" />}
//             </Form.Group>

//             <Button variant="success" type="submit" className="w-100 mb-3" disabled={uploading}>
//               {uploading ? 'Uploading...' : 'Register'}
//             </Button>

//             <div className="text-center">
//               Already have an account? <Link to="/login">Login</Link>
//             </div>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }




import React, { useRef, useState } from 'react';
import { Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { register, uploadFiles } from './authAPI';
import toast from 'react-hot-toast';

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

  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef(null);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const isUnder2MB = file.size < 2 * 1024 * 1024;

      if (!isImage) {
        setAvatarError('File must be an image.');
        return;
      }

      if (!isUnder2MB) {
        setAvatarError('Image must be under 2MB.');
        return;
      }

      setAvatarError('');
      const formData = new FormData();
      formData.append('file', file);

      try {
        const { location } = await uploadFiles(formData);
        setForm((prev) => ({ ...prev, avatar: location }));
        toast.success('Image uploaded successfully');
      } catch (err) {
        toast.error('Image upload failed');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });

    if (nameValid && emailValid && passwordValid && confirmValid && !avatarError) {
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
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="mb-4 text-center">Create a New Account</h2>
          <Form noValidate onSubmit={handleSubmit} className="w-100">

            {/* Avatar Upload */}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Avatar</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <Button variant="outline-primary" onClick={() => fileInputRef.current.click()}>
                  Choose Image
                </Button>
                {form.avatar && (
                  <img
                    src={form.avatar.trim()}
                    alt="avatar preview"
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                  />
                )}
              </div>
              {avatarError && <Form.Text className="text-danger">{avatarError}</Form.Text>}
            </Form.Group>

            {/* Name */}
            <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3 form-floating-custom">
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
              <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
            </FloatingLabel>

            {/* Email */}
            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3 form-floating-custom">
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
              <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
            </FloatingLabel>

            {/* Password */}
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 form-floating-custom">
              <Form.Control
                type="password"
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
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </FloatingLabel>

            {/* Confirm Password */}
            <FloatingLabel controlId="floatingConfirm" label="Confirm Password" className="mb-4 form-floating-custom">
              <Form.Control
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                onBlur={() => handleBlur('confirm')}
                isInvalid={touched.confirm && !confirmValid}
                isValid={touched.confirm && confirmValid}
                required
              />
              <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
            </FloatingLabel>

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
