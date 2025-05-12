// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const CLOUD_NAME = 'dfiui980m';
// const UPLOAD_PRESET = 'unsigned_upload';

// const ImageUploadBox = ({ onUpload }) => {
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setPreview(URL.createObjectURL(file));
//     setUploading(true);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', UPLOAD_PRESET);

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
//         formData
//       );
//       const imageUrl = response.data.secure_url;
//       toast.success("Image uploaded successfully!");
//       onUpload(imageUrl);
//     } catch (err) {
//       toast.error("Image upload failed!");
//       console.error('Upload failed', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <Form.Group className="mb-3">
//       <div
//         className="border border-2 border-dashed rounded d-flex flex-column justify-content-center align-items-center"
//         style={{
//           width: 100,
//           height: 100,
//           cursor: 'pointer',
//           backgroundColor: '#f8f9fa',
//           position: 'relative',
//           overflow: 'hidden',
//         }}
//         onClick={() => document.getElementById('imageUploadInput').click()}
//       >
//         {preview ? (
//           <img
//             src={preview}
//             alt="Preview"
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//             }}
//           />
//         ) : (
//           <>
//             <FaCloudUploadAlt size={32} className="text-muted mb-1" />
//             <span className="text-muted" style={{ fontSize: '0.75rem' }}>
//               UPLOAD IMAGE
//             </span>
//           </>
//         )}
//         <Form.Control
//           type="file"
//           id="imageUploadInput"
//           accept="image/*"
//           onChange={handleImageChange}
//           style={{ display: 'none' }}
//         />
//       </div>
//     </Form.Group>
//   );
// };

// export default ImageUploadBox;



import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const CLOUD_NAME = 'dfiui980m';
const UPLOAD_PRESET = 'unsigned_upload';

const ImageUploadBox = ({ onUpload, previewUrl }) => {
  const [preview, setPreview] = useState(previewUrl || null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPreview(previewUrl || null);
  }, [previewUrl]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreview(tempUrl);
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
      toast.success('Image uploaded successfully!');
      onUpload(imageUrl);
    } catch (err) {
      toast.error('Image upload failed!');
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form.Group className="mb-3">
      <div
        className="d-flex flex-column justify-content-center align-items-center rounded"
        style={{
          width: 100,
          height: 100,
          cursor: 'pointer',
          backgroundColor: '#343a40', // dark background
          border: '2px dashed #6c757d', // muted border
          color: '#adb5bd', // light text
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => document.getElementById('imageUploadInput').click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <>
            <FaCloudUploadAlt size={32} className="mb-1 text-muted" />
            <span style={{ fontSize: '0.75rem' }}>UPLOAD IMAGE</span>
          </>
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
