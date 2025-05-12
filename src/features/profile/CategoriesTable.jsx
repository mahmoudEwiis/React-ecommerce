import { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { getProductCategories } from "../products/productsAPI";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductCategories();
        setCategories(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Categories Table</h4>
        <Button className="btn btn-add">Add Category</Button>
      </div>
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  Details
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(category)}
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
        product={categoryToDelete}
      />
    </div>
  );
};

export default CategoriesTable;
