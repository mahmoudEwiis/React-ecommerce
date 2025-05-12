// import { useState, useEffect } from "react";
// import { Button, Table, Pagination } from "react-bootstrap";
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
// import { getUsers } from "./ProfileApi";

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getUsers();
//         setUsers(data);
//       } catch (err) { }
//     };
//     fetchData();
//   }, []);

//   const handlePageChange = (page) => setCurrentPage(page);

//   const handleDeleteClick = (user) => {
//     setUserToDelete(user);
//     setShowModal(true);
//   };

//   const handleConfirmDelete = (id) => {
//     setUsers((prev) => prev.filter((item) => item.id !== id));
//     setShowModal(false);
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(users.length / itemsPerPage);

//   return (
//     <div className="container mt-4 mx-auto">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h4 className="mb-0">Users Table</h4>
//         <Button className="btn btn-add">Add User</Button>
//       </div>

//       <Table variant="dark" bordered hover responsive>
//       <thead className="table-dark">
//         <tr>
//           <th>ID</th>
//           <th>Avatar</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Role</th>
//           <th className="text-center">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentItems.map((user) => (
//           <tr key={user.id}>
//             <td>{user.id}</td>
//             <td>
//               <img
//                 src={user.avatar || '/avatar.jpg'}
//                 onError={(e) => {
//                   e.currentTarget.onerror = null;
//                   e.currentTarget.src = '/avatar.jpg';
//                 }}
//                 width={40}
//                 height={40}
//                 className="rounded-circle"
//                 alt={user.name}
//               />
//             </td>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>{user.role}</td>
//             <td className="text-center">
//               <Button
//                 variant="outline-light"
//                 size="sm"
//                 className="me-2"
//                 onClick={() => console.log('Edit', user.id)}
//               >
//                 <FaEdit />
//               </Button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>

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

//       <DeleteConfirmationModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={handleConfirmDelete}
//         product={userToDelete}
//       />
//     </div>
//   );
// };

// export default UsersTable;




import React, { useState, useEffect } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { FaTrash, FaEdit } from 'react-icons/fa';
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { getUsers, addUser, updateUser } from "./ProfileApi";
import UserModal from "./UserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);


  const handleAddClick = () => {
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleUserSubmit = async (formData) => {
    try {
      if (editingUser) {
        const updated = await updateUser({ ...formData, id: editingUser.id });
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      } else {
        const created = await addUser(formData);
        setUsers(prev => [created, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
    setShowUserModal(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="container mt-4 mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Users Table</h4>
        <Button variant="primary" onClick={handleAddClick}>Add User</Button>
      </div>

      <Table variant="dark" bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  src={user.avatar || '/avatar.jpg'}
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/avatar.jpg'; }}
                  width={40}
                  height={40}
                  className="rounded-circle"
                  alt={user.name}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(user)}
                >
                  <FaEdit />
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
            variant="light"
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <UserModal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        initialData={editingUser}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
};

export default UsersTable;
