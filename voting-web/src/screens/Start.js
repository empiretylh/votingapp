import React, { useState, useContext } from 'react';
import database from '../api/database';
import { LoadingContext, CodeContext } from '../context/AppContext';
import { storage } from '../utils/storage';

const Start = () => {
  const [code, setCode] = useState('');
  const { setShowLoading } = useContext(LoadingContext);
  const { setVCode } = useContext(CodeContext);

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (value.length <= 5 && /^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const checkCodeAndSetCode = async () => {
    if (!code) {
      alert('Please enter a code');
      return;
    }

    setShowLoading(true);
    try {
      const response = await database.checkCode(code);
      if (response.data === 1) {
        setVCode(code);
        await storage.setItem('temp_code', code);
      } else {
        alert('This Code Is Invalid');
      }
    } catch (error) {
      console.error('Error checking code:', error);
      alert('Error checking code. Please try again.');
    } finally {
      setShowLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkCodeAndSetCode();
    }
  };

  return (
    <div className="start-screen">
      <img
        src="/assets/crown.png"
        alt="Crown Logo"
        className="crown-logo"
      />
      <h1>Youth Choice Voting System</h1>
      <p>Developed By EMPIRE</p>
      <div className="divider" />
      
      {/* QR Code scanning is complex in web, so we'll focus on code entry */}
      <p className="or-text">Enter Voting Code</p>
      
      <label className="input-label">Type Code</label>
      <input
        type="text"
        className="input-field"
        placeholder="Code - XXXXX"
        value={code}
        onChange={handleCodeChange}
        onKeyPress={handleKeyPress}
        maxLength={5}
        inputMode="numeric"
      />
      
      <button className="btn-primary" onClick={checkCodeAndSetCode}>
        <img src="/assets/shuttle.png" alt="Start" />
        <span>Let's Connect</span>
      </button>
    </div>
  );
};

export default Start;
