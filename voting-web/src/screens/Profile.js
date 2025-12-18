import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../api/database';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  if (!data) {
    navigate('/');
    return null;
  }

  const profileImageUrl = data?.profileimage
    ? `${API_URL}${data.profileimage}`
    : '/assets/queen.png';

  // Get gallery images (assuming data has an images array or photos field)
  const galleryImages = data?.photos || [];

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src="/assets/arrow.png" alt="back" className="back-icon" />
        </button>
      </div>

      <div className="profile-main">
        <div className="profile-image-container">
          <img
            src={profileImageUrl}
            alt={data.name}
            className="profile-main-image"
            onError={(e) => {
              e.target.src = '/assets/queen.png';
            }}
          />
        </div>

        <div className="profile-info">
          <h2>{data.name}</h2>
          <p>
            <strong>Year:</strong> {data.year}
          </p>
          <p>
            <strong>Category:</strong> {data.is_male ? 'King' : 'Queen'}
          </p>
          {data.description && (
            <p>
              <strong>About:</strong> {data.description}
          </p>
          )}
        </div>

        {galleryImages.length > 0 && (
          <div className="profile-gallery">
            <h3 className="gallery-title">Photo Gallery</h3>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={`${API_URL}${image.image || image}`}
                  alt={`${data.name} ${index + 1}`}
                  className="gallery-image"
                  onError={(e) => {
                    e.target.src = '/assets/queen.png';
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
