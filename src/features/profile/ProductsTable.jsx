import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import ProductModal from './modals/ProductModal';
import { getProducts} from '../products/productsAPI';
import { addProduct, deleteProduct, updateProduct } from './ProfileApi';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts({ limit: 100, offset: 0 });
        setProducts(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load products');
      }
    })();
  }, []);

  const handlePageChange = page => setCurrentPage(page);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditClick = product => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleProductSubmit = async formData => {
    try {
      if (editingProduct) {
        const updated = await updateProduct({ ...formData, id: editingProduct.id });
        setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
        toast.success('Product updated!');
      } else {
        const created = await addProduct(formData);
        setProducts(prev => [created, ...prev]);
        toast.success('Product added!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Operation failed');
    }
    setShowProductModal(false);
  };

  const handleDeleteClick = product => {
    setItemToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async id => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
    setShowDeleteModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Products Table</h4>
        <Button className="btn btn-add" onClick={handleAddClick}>Add Product</Button>
      </div>

      <Table variant="dark" bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.category.name}</td>
              <td>{product.price}</td>
              <td className="text-center">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(product)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(product)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={idx + 1 === currentPage}
            onClick={() => handlePageChange(idx + 1)}
            variant="light"
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <ProductModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        initialData={editingProduct}
        onSubmit={handleProductSubmit}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        item={itemToDelete}
      />
    </div>
  );
}
