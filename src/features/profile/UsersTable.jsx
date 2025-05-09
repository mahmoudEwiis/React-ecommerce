import { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { getUsers } from "./ProfileApi";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) { }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    setUsers((prev) => prev.filter((item) => item.id !== id));
    setShowModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Users Table</h4>
        <Button variant="primary">Add User</Button>
      </div>
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img src={user.avatar || "/avatar.jpg" } width={40} alt="user.name" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  Details
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(user)}
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
        product={userToDelete}
      />
    </div>
  );
};

export default UsersTable;
