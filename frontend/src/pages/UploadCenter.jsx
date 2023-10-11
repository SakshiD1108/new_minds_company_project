import { useEffect, useState } from 'react';
import axios from 'axios';

const UploadCenter = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [authorized, setAuthorized] = useState(false); // User authorization state
  const token = localStorage.getItem('token');

  // Check user authorization using the token
  useEffect(() => {
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [token]);

  const url = 'http://localhost:8000/uploadedFile';

  const addFile = async () => {
    try {
      if (fileUpload === null || !authorized) return;

      const formData = new FormData();
      formData.append('file', fileUpload);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const uploadedFile = response.data; 

      if (uploadedFile.success) {
        // Add the uploaded file to the list for display
        setFileList([...fileList, uploadedFile.data]);
      } else {
        console.error('Error uploading file: ', uploadedFile.message);
      }
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  const deleteFile = async (fileToDelete) => {
    try {
      if (!fileToDelete._id) {
        console.error('Missing id for file to delete');
        return;
      }

      const response = await axios.delete(`http://localhost:8000/uploadedFile/${fileToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { originalname: fileToDelete.originalname, id: fileToDelete._id }, // Include the necessary data
      });

      if (response.data.success) {
        // Remove the deleted file from the fileList
        setFileList(fileList.filter((file) => file._id !== fileToDelete._id));
        console.log('File deleted successfully', fileToDelete.originalname);
      } else {
        console.error('Failed to delete the file: ', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting file: ', error);
    }
  };

  return (
    <div className="bg-gray-200 w-full flex">
      {/* Your Sidebar component */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
          disabled={!authorized}
        />

        <button
          className="bg-teal-600 text-white font-semibold px-3 w-fit py-2 my-2 rounded-md hover-bg-teal-700 shadow-2xl"
          onClick={addFile}
          disabled={!authorized}
        >
          Upload
        </button>

        <div className="flex flex-wrap gap-2">
          <h4>Uploaded files:</h4>
          {fileList.map((file, i) => (
            <div key={i} className="relative">
              <div
                className="absolute top-0 right-0 text-white cursor-pointer bg-teal-600"
                onClick={() => deleteFile(file)}
              >
                X
              </div>
              {file.originalname.endsWith('.pdf') ? (
                <embed
                  src={file.originalname}
                  type="application/pdf"
                  width="200"
                  height="250"
                />
              ) : (
                <img
                  src={file.originalname}
                  alt=""
                  className="shadow-md shadow-gray-500 rounded-lg w-20 h-24 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadCenter;
