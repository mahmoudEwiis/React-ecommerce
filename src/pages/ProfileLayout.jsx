import { NavLink, Outlet } from "react-router-dom";
import { useProfile } from "../context/AuthContext";
import '../features/profile/profile.css';

export default function ProfileLayout() {
    const { profile } = useProfile();
    return (
        // <main className="py-5 my-4">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-lg-4 col-xl-3">
        //                 <div className="card bg-light w-100 p-3">
        //                     <div className="text-center mb-3">
        //                         <div className="avatar avatar-xl mb-2">
        //                             <img
        //                                 className="avatar-img rounded-circle border border-2 border-white"
        //                                 src={profile.avatar || "/avatar.jpg"}
        //                                 alt="Profile"
        //                                 width={80}
        //                             />
        //                         </div>
        //                         <h6 className="mb-0">{profile.name}</h6>
        //                         <p className="small text-muted">{profile.email}</p>
        //                     </div>
        //                     <ul className="nav flex-column nav-pills-primary-soft">
        //                         <li className="nav-item">
        //                             <NavLink to=""
        //                             className={({ isActive }) => `nav-link text-muted ${isActive ? 'active' : ''}`} >
        //                                 <i className="fa-regular fa-user me-2"></i>
        //                                 My Profile
        //                             </NavLink>
        //                         </li>
        //                         <li className="nav-item">
        //                             <NavLink to="favorites" className={({ isActive }) => `nav-link text-muted ${isActive ? 'active' : ''}`} >
        //                                 <i className="fa-solid fa-heart text-danger me-2"></i>
        //                                 Favorites
        //                             </NavLink>
        //                         </li>
        //                         <li className="nav-item">
        //                             <NavLink to="products"  className={({ isActive }) => `nav-link text-muted ${isActive ? 'active' : ''}`} >
        //                                 <i className="fa-solid fa-box-open  me-2"></i>
        //                                 Products
        //                             </NavLink>
        //                         </li>
        //                         <li className="nav-item">
        //                             <NavLink to="categories"  className={({ isActive }) => `nav-link text-muted ${isActive ? 'active' : ''}`} >
        //                                 <i className="fa-solid fa-list  me-2"></i>
        //                                 Categories
        //                             </NavLink>
        //                         </li>
        //                         <li className="nav-item">
        //                             <NavLink to="users"  className={({ isActive }) => `nav-link text-muted ${isActive ? 'active' : ''}`} >
        //                                 <i className="fa-solid fa-users  me-2"></i>
        //                                 Users
        //                             </NavLink>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>

        //             <div className="col-lg-8 col-xl-9">
        //                 <Outlet />
        //             </div>
        //         </div>
        //     </div>
        // </main>

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
                    { to: 'products', icon: 'fa-box-open', label: 'Products' },
                    { to: 'categories', icon: 'fa-list', label: 'Categories' },
                    { to: 'users', icon: 'fa-users', label: 'Users' }
                  ].map((item) => (
                    <li className="nav-item" key={item.to}>
                      <NavLink
                        to={item.to}
                        end
                        className={({ isActive }) =>
                          `nav-link d-flex align-items-center text-light ${isActive ? 'active text-white' : 'hover-light'}`
                        }
                      >
                        <i className={`fa-solid fa-${item.icon} me-2`}></i>
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
