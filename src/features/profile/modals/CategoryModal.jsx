import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ImageUploadBox from '../../components/ImageUploadBox';

export default function CategoryModal({ show, onHide, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: '', image: '' });
  const [touched, setTouched] = useState({ name: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ name: initialData.name || '', image: initialData.image || '' });
    } else {
      setForm({ name: '', image: '' });
    }
    setTouched({ name: false });
    setErrors({});
  }, [initialData, show]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = field => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = url => {
    setForm(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const submitData = { ...form };
      if (initialData) submitData.id = initialData.id;
      onSubmit(submitData);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form noValidate onSubmit={handleSubmit} className="p-3">
        <Modal.Header closeButton>
          <Modal.Title>{initialData ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageUploadBox onUpload={handleImageUpload} previewUrl={form.image} />

          <Form.Group controlId="categoryName" className="mt-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Category Name"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              isInvalid={touched.name && !!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Add Category'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
