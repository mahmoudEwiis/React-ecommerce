import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import ImageUploadBox from '../../../components/ImageUploadBox';
import { getProductCategories } from '../../products/productsAPI';
import { FaTimes } from 'react-icons/fa';

export default function ProductModal({ show, onHide, onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: []
  });
  const [categories, setCategories] = useState([]);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const cats = await getProductCategories();
        setCategories(cats);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        price: initialData.price?.toString() || '',
        description: initialData.description || '',
        categoryId: initialData.category?.id?.toString() || '',
        images: initialData.images || []
      });
    } else {
      setForm({ title: '', price: '', description: '', categoryId: '', images: [] });
    }
    setTouched({});
    setErrors({});
  }, [initialData, show]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = 'Valid price required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.categoryId) errs.categoryId = 'Category is required';
    if (form.images.length === 0) errs.images = 'At least one image';
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
    setForm(prev => ({ ...prev, images: [...prev.images, url] }));
  };

  const removeImage = idx => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const payload = {
        title: form.title,
        price: Number(form.price),
        description: form.description,
        categoryId: Number(form.categoryId),
        images: form.images
      };
      if (initialData) payload.id = initialData.id;
      onSubmit(payload);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form noValidate onSubmit={handleSubmit} className="p-3">
        <Modal.Header closeButton>
          <Modal.Title>{initialData ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} className="mb-3">
              <ImageUploadBox onUpload={handleImageUpload} />
              {touched.images && errors.images && (
                <div className="text-danger small mt-1">{errors.images}</div>
              )}
              <div className="d-flex flex-wrap mt-2">
                {form.images.map((img, idx) => (
                  <div key={idx} className="position-relative me-2 mb-2">
                    <img src={img} alt="prod" width={60} height={60} style={{ objectFit: 'cover' }} />
                    <FaTimes
                      onClick={() => removeImage(idx)}
                      style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: 'red' }}
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col md={8}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={form.title}
                  onChange={handleChange}
                  onBlur={() => handleBlur('title')}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="price" className="mb-3">
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  onBlur={() => handleBlur('price')}
                  isInvalid={touched.price && !!errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  onBlur={() => handleBlur('description')}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="categoryId" className="mb-3">
                <Form.Select
                  name="categoryId"
                  value={form.categoryId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('categoryId')}
                  isInvalid={touched.categoryId && !!errors.categoryId}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoryId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit">
            {initialData ? 'Save Changes' : 'Add Product'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
