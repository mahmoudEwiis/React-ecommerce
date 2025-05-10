import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const CLOUD_NAME = 'dfiui980m';
const UPLOAD_PRESET = 'unsigned_upload';

const ImageUploadBox = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      const imageUrl = response.data.secure_url;
      toast.success("Image uploaded successfully!");
      onUpload(imageUrl);
    } catch (err) {
      toast.error("Image upload failed!");
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form.Group className="mb-3">
      <div
        className="border border-2 border-dashed rounded d-flex justify-content-center align-items-center"
        style={{
          height: 200,
          cursor: 'pointer',
          backgroundColor: '#f8f9fa',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => document.getElementById('imageUploadInput').click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div className="text-center text-muted">
            <FaCloudUploadAlt size={50} className="mb-2" />
            <div>{uploading ? 'Uploading...' : 'Click to upload image'}</div>
          </div>
        )}
        <Form.Control
          type="file"
          id="imageUploadInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    </Form.Group>
  );
};

export default ImageUploadBox;
