// import { useState, useEffect } from "react";
// import { Button, Table, Pagination } from "react-bootstrap";
// import { getProducts } from "../products/productsAPI";

// const ProductsTable = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const data = await getProducts({
//           limit: 100,
//           offset: 0,
//         });
//         setProducts(data);
//       } catch (err) {
//         // setError(err.message || "Something went wrong");
//       }
//     };

//     fetchData();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(products.length / itemsPerPage);

//   const handleDelete = (id) => {
//     setProducts((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div className="container mt-4 mx-auto">
//       <h4 className="mb-3">Products Table</h4>
//       <Table bordered hover responsive>
//         <thead className="table-light">
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Price ($)</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((product) => (
//             <tr key={product.id}>
//               <td>{product.id}</td>
//               <td>{product.title}</td>
//               <td>{product.category.name}</td>
//               <td>{product.price}</td>
//               <td>
//                 <Button
//                   variant="info"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => alert(`Details of product ID: ${product.id}`)}
//                 >
//                   Details
//                 </Button>
//                 <Button
//                   variant="danger"
//                   size="sm"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination */}
//       <Pagination className="justify-content-center">
//         {[...Array(totalPages)].map((_, index) => (
//           <Pagination.Item
//             key={index}
//             active={index + 1 === currentPage}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>
//     </div>
//   );
// };

// export default ProductsTable;




import { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { getProducts } from "../products/productsAPI";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts({ limit: 100, offset: 0 });
        setProducts(data);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Products Table</h4>
        <Button variant="primary">
          Add Product
        </Button>
      </div>
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category.name}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => alert(`Details of product ID: ${product.id}`)}
                >
                  Details
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <DeleteConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </div>
  );
};

export default ProductsTable;

