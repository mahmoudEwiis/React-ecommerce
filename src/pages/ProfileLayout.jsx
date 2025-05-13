import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useProfile } from "../context/AuthContext";
import '../features/profile/profile.css';
import { logout } from "../features/auth/authAPI";

export default function ProfileLayout() {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!profile) {
    return (
      <main className="py-5 my-4 bg-dark text-light" style={{ minHeight: '100vh' }}>
        <div className="container text-center pt-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5 my-4 bg-dark text-light" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <div className="card bg-secondary text-light w-100 p-3">
              <div className="text-center mb-3">
                <div className="avatar avatar-xl mb-2">
                  <img
                    className="avatar-img rounded-circle border border-2 border-light"
                    src={profile.avatar || '/avatar.jpg'}
                    alt="Profile"
                    width={80}
                  />
                </div>
                <h6 className="mb-0">{profile.name}</h6>
                <p className="small text-muted text-light">{profile.email}</p>
              </div>

              <ul className="nav flex-column nav-pills">
                {[
                  { to: '', icon: 'fa-user', label: 'My Profile' },
                  { to: 'favorites', icon: 'fa-heart', label: 'Favorites' },
                  { to: 'Carts', icon: 'fa-cart-plus', label: 'Carts' },
                  { to: 'products', icon: 'fa-box-open', label: 'Products', adminOnly: true },
                  { to: 'categories', icon: 'fa-list', label: 'Categories', adminOnly: true },
                  { to: 'users', icon: 'fa-users', label: 'Users', adminOnly: true },
                ]
                  .filter(item => !item.adminOnly || profile?.role === 'admin')
                  .map((item) => (
                    <li className="nav-item" key={item.to}>
                      <NavLink
                        to={item.to}
                        end
                        className={({ isActive }) =>
                          `nav-link d-flex align-items-center text-light ${isActive ? 'active text-white' : 'hover-light'}`
                        }
                      >
                        <i className={`fa-solid ${item.icon} me-2`}></i>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}

                <li className="nav-item px-3">
                  <button
                    className="nav-link text-danger d-flex align-items-center bg-transparent border-0 px-0"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-power-off me-2"></i>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8 col-xl-9">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
