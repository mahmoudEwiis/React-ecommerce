import React, { useState, useEffect } from 'react';
import { Button, Table, Pagination } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import CategoryModal from './CategoryModal';
import { getProductCategories } from '../products/productsAPI';
import {addCategory, updateCategory, deleteCategory } from './ProfileApi';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load categories');
      }
    })();
  }, []);

  const handlePageChange = page => setCurrentPage(page);

  const handleAddClick = () => {
    setEditingCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditClick = category => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleCategorySubmit = async formData => {
    try {
      if (editingCategory) {
        const updated = await updateCategory({ ...formData, id: editingCategory.id });
        setCategories(prev => prev.map(c => (c.id === updated.id ? updated : c)));
        toast.success('Category updated!');
      } else {
        const created = await addCategory(formData);
        setCategories(prev => [created, ...prev]);
        toast.success('Category added!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Operation failed');
    }
    setShowCategoryModal(false);
  };

  const handleDeleteClick = category => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async id => {
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Category deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
    setShowDeleteModal(false);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = categories.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Categories Table</h4>
        <Button  className="btn btn-add"onClick={handleAddClick}>Add Category</Button>
      </div>

      <Table variant="dark" bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td className="text-center">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(category)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteClick(category)}
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

      <CategoryModal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        initialData={editingCategory}
        onSubmit={handleCategorySubmit}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        item={categoryToDelete}
      />
    </div>
  );
}
