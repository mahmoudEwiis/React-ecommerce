import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


export default function ProductFilters({ filtersn ,  categories = [], onFilterChange }) {

  const [filters, setFilters] = useState(filtersn);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  return (
    <Form className="my-5 p-3 rounded shadow-sm filters">
      <Row className="gy-3 align-items-center">
        <Col md={3}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select name="categoryId" value={filters.categoryId} onChange={handleChange}>
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by title"
              name="title"
              value={filters.title}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Form.Label>
            <Slider
              range
              min={0}
              max={1000}
              value={filters.priceRange}
              onChange={handlePriceChange}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="sort">
            <Form.Label>Sort By</Form.Label>
            <Form.Select name="sort" value={filters.sort} onChange={handleChange}>
              <option value="">Default</option>
              <option value="name_asc">Name (A → Z)</option>
              <option value="name_desc">Name (Z → A)</option>
              <option value="price_asc">Price (Low → High)</option>
              <option value="price_desc">Price (High → Low)</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
      </Row>
    </Form>
  );
}
