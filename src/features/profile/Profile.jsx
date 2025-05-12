import { useState } from 'react';
import { useProfile } from '../../context/AuthContext';
import { updateUser } from './ProfileApi'; 

const Profile = () => {
  const { profile, setProfile } = useProfile();
  if(!profile){
    
  }
  const [formData, setFormData] = useState({
    id: profile.id || 0,
    name: profile.name || '',
    email: profile.email || '',
    avatar: profile.avatar || '',
    role: profile.role || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProfile = await updateUser(formData);  
      setProfile(updatedProfile); 
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="card border">
      <div className="card-header border-bottom">
        <h4 className="card-header-title">Personal Information</h4>
      </div>

      <div className="card-body">
        <form className="row g-3">

          <div className="col-12">
            <label className="form-label">
              Upload your profile photo<span className="text-danger">*</span>
            </label>
            <div className="d-flex align-items-center">
              <label className="position-relative me-4" htmlFor="uploadfile-1" title="Replace this pic">
                <span className="avatar avatar-xl">
                  <img
                    id="uploadfile-1-preview"
                    className="avatar-img rounded-circle border border-white border-3 shadow"
                    src={formData.avatar || "/avatar.jpg"}
                    width={80}
                    alt="avatar"
                  />
                </span>
              </label>
              <label className="btn btn-sm btn-primary-soft mb-0" htmlFor="uploadfile-1">Change</label>
              <input
                id="uploadfile-1"
                className="form-control d-none"
                type="file"
                onChange={(e) => setFormData({ ...formData, avatar: URL.createObjectURL(e.target.files[0]) })}
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="col-md-6">
            <label className="form-label">
              Full Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">
              Email address<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email id"
            />
          </div>

          {/* Role */}
          <div className="col-md-6">
            <label className="form-label">
              Role<span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
            >
              <option>Select your role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-12 text-end">
            <button className="btn btn-primary mb-0" type="button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
