import React from 'react';

const Developer = () => {
  return (
    <div className="profile-screen" style={{ padding: '20px' }}>
      <div className="profile-info">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Developer Info</h2>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="/assets/i.png"
            alt="Developer"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '75px',
              objectFit: 'cover',
              margin: '0 auto',
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold' }}>
          Thura Lin Htut
        </p>
        <p style={{ textAlign: 'center', fontSize: '14px', color: '#666' }}>
          Full Stack Developer
        </p>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '15px' }}>Contact & Social Media</h3>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src="/assets/facebook.png"
                alt="Facebook"
                style={{ width: '40px', height: '40px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src="/assets/ig.png"
                alt="Instagram"
                style={{ width: '40px', height: '40px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src="/assets/github.png"
                alt="GitHub"
                style={{ width: '40px', height: '40px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block' }}
            >
              <img
                src="/assets/linkedin.png"
                alt="LinkedIn"
                style={{ width: '40px', height: '40px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
          <h3 style={{ marginBottom: '10px' }}>About This App</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
            Youth Choice Voting System is a secure and user-friendly voting application
            that ensures one device can cast one vote. Built with modern web technologies
            to provide a seamless voting experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Developer;
