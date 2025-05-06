// // import React, { useState } from 'react';
// // import { Form, Row, Col, Button } from 'react-bootstrap';

// // const ProductFilters = ({
// //     categories = [],
// //     onFilterChange,
// // }) => {
// //     const [category, setCategory] = useState('');
// //     const [minPrice, setMinPrice] = useState('');
// //     const [maxPrice, setMaxPrice] = useState('');
// //     const [search, setSearch] = useState('');
// //     const [sort, setSort] = useState('');

// //     const handleApplyFilters = () => {
// //         onFilterChange({
// //             category,
// //             minPrice,
// //             maxPrice,
// //             search,
// //             sort,
// //         });
// //     };

// //     return (
// //         <div className="border p-3 rounded bg-light mb-4">
// //             <Row className="gy-3">
// //                 <Col md={3}>
// //                     <Form.Label>Category</Form.Label>
// //                     <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
// //                         <option value="">All</option>
// //                         {categories.map(cat => (
// //                             <option key={cat.id} value={cat.id}>{cat.name}</option>
// //                         ))}
// //                     </Form.Select>
// //                 </Col>

// //                 <Col md={3}>
// //                     <Form.Label>Min Price</Form.Label>
// //                     <Form.Control
// //                         type="number"
// //                         value={minPrice}
// //                         onChange={e => setMinPrice(e.target.value)}
// //                         placeholder="Min"
// //                     />
// //                 </Col>

// //                 <Col md={3}>
// //                     <Form.Label>Max Price</Form.Label>
// //                     <Form.Control
// //                         type="number"
// //                         value={maxPrice}
// //                         onChange={e => setMaxPrice(e.target.value)}
// //                         placeholder="Max"
// //                     />
// //                 </Col>

// //                 <Col md={3}>
// //                     <Form.Label>Search Title</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         value={search}
// //                         onChange={e => setSearch(e.target.value)}
// //                         placeholder="Search by title"
// //                     />
// //                 </Col>

// //                 <Col md={3}>
// //                     <Form.Label>Sort By</Form.Label>
// //                     <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
// //                         <option value="">Default</option>
// //                         <option value="price_asc">Price (Low → High)</option>
// //                         <option value="price_desc">Price (High → Low)</option>
// //                         <option value="title_asc">Title (A → Z)</option>
// //                         <option value="title_desc">Title (Z → A)</option>
// //                     </Form.Select>
// //                 </Col>

// //                 <Col md={3} className="d-flex align-items-end">
// //                     <Button variant="primary" onClick={handleApplyFilters}>
// //                         Apply Filters
// //                     </Button>
// //                 </Col>
// //             </Row>
// //         </div>
// //     );
// // };

// // export default ProductFilters;




// import React, { useEffect, useState } from 'react';
// import { Form, Row, Col } from 'react-bootstrap';

// export default function ProductFilters({ categories = [], onFilterChange }) {
//   const [filters, setFilters] = useState({
//     categoryId: '',
//     title: '',
//     priceRange: [0, 1000],
//     sort: '',
//   });

//   useEffect(() => {
//     onFilterChange(filters);
//   }, [filters, onFilterChange]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSliderChange = (e, index) => {
//     const newValue = [...filters.priceRange];
//     newValue[index] = Number(e.target.value);
//     setFilters(prev => ({ ...prev, priceRange: newValue }));
//   };

//   return (
//     <Form className="mb-4 p-3 bg-light rounded shadow-sm">
//       <Row className="gy-3">
//         <Col md={3}>
//           <Form.Group controlId="category">
//             <Form.Label>Category</Form.Label>
//             <Form.Select name="categoryId" value={filters.categoryId} onChange={handleChange}>
//               <option value="">All</option>
//               {categories.map(cat => (
//                 <option key={cat.id} value={cat.id}>{cat.name}</option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>

//         <Col md={3}>
//           <Form.Group controlId="title">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Search by title"
//               name="title"
//               value={filters.title}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Col>

//         <Col md={3}>
//           <Form.Group>
//             <Form.Label>Price Range</Form.Label>
//             <div className="d-flex flex-column">
//               <Form.Range
//                 value={filters.priceRange[0]}
//                 min={0}
//                 max={filters.priceRange[1]}
//                 onChange={(e) => handleSliderChange(e, 0)}
//               />
//               <span>Min: ${filters.priceRange[0]}</span>

//               <Form.Range
//                 value={filters.priceRange[1]}
//                 min={filters.priceRange[0]}
//                 max={5000}
//                 onChange={(e) => handleSliderChange(e, 1)}
//               />
//               <span>Max: ${filters.priceRange[1]}</span>
//             </div>
//           </Form.Group>
//         </Col>

//         <Col md={3}>
//           <Form.Group controlId="sort">
//             <Form.Label>Sort By</Form.Label>
//             <Form.Select name="sort" value={filters.sort} onChange={handleChange}>
//               <option value="">Default</option>
//               <option value="name_asc">Name (A → Z)</option>
//               <option value="name_desc">Name (Z → A)</option>
//               <option value="price_asc">Price (Low → High)</option>
//               <option value="price_desc">Price (High → Low)</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   );
// }





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
    <Form className="mb-4 p-3 bg-light rounded shadow-sm">
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
