import { useState } from 'react';
import { useProfile } from '../../context/AuthContext';
import { updateUser } from './ProfileApi';
import ImageUploadBox from '../../components/ImageUploadBox'; 
import toast from 'react-hot-toast';

const Profile = () => {
  const { profile, setProfile } = useProfile();

  const [formData, setFormData] = useState({
    id: profile?.id || 0,
    name: profile?.name || '',
    email: profile?.email || '',
    avatar: profile?.avatar || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({ ...prev, avatar: imageUrl }));
  };

  const handleSaveChanges = async () => {
    try {
      const updated = await updateUser(formData);
      setProfile(updated);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="card border bg-dark text-white">
      <div className="card-header border-bottom border-secondary">
        <h4 className="card-header-title">Personal Information</h4>
      </div>

      <div className="card-body">
        <form className="row g-3">

          <div className="col-12">
            <label className="form-label">
              Upload your profile photo<span className="text-danger">*</span>
            </label>
            <ImageUploadBox onUpload={handleImageUpload} previewUrl={formData.avatar} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Full Name<span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email address<span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
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
