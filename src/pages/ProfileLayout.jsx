import { NavLink, Outlet } from "react-router-dom";
import { useProfile } from "../context/AuthContext";
import '../features/profile/profile.css';

export default function ProfileLayout() {
  const { profile } = useProfile();

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
                  { to: 'products', icon: 'fa-box-open', label: 'Products', adminOnly: true },
                  { to: 'categories', icon: 'fa-list', label: 'Categories', adminOnly: true },
                  { to: 'users', icon: 'fa-users', label: 'Users', adminOnly: true }
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
