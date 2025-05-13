import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ImageUploadBox from '../../../components/ImageUploadBox';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function UserModal({ show, onHide, onSubmit, initialData }) {
  const [form, setForm] = useState({
    avatar: '',
    name: '',
    email: '',
    role: 'customer',
    password: ''
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        avatar: initialData.avatar || '',
        name: initialData.name || '',
        email: initialData.email || '',
        role: initialData.role || 'customer',
        password: ''
      });
      setTouched({});
      setErrors({});
    } else {
      setForm({ avatar: '', name: '', email: '', role: 'customer', password: '' });
      setTouched({});
      setErrors({});
    }
  }, [initialData, show]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.role) errs.role = 'Role is required';
    if (!initialData && form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleImageUpload = url => {
    setForm(prev => ({ ...prev, avatar: url }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const submitData = { ...form };
      if (initialData) delete submitData.password; 
      onSubmit(submitData);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form noValidate onSubmit={handleSubmit} className="p-3">
        <Modal.Header closeButton>
          <Modal.Title>{initialData ? 'Update User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageUploadBox onUpload={handleImageUpload} previewUrl={form.avatar} />

          <Form.Group controlId="name" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {!initialData && (
            <Form.Group controlId="password" className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                isInvalid={touched.password && !!errors.password}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0.75rem',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group controlId="role" className="mb-3">
            <Form.Select
              name="role"
              value={form.role}
              onChange={handleChange}
              onBlur={() => handleBlur('role')}
              isInvalid={touched.role && !!errors.role}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Add User'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
