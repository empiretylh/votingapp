import React, { useState, useEffect, useContext } from 'react';
import database from '../api/database';
import { LoadingContext, CodeContext, NameIMEIContext } from '../context/AppContext';
import { getDeviceId } from '../utils/deviceId';

const Name = () => {
  const [name, setName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const { setShowLoading } = useContext(LoadingContext);
  const { vCode } = useContext(CodeContext);
  const { setNameID } = useContext(NameIMEIContext);

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getDeviceId();
      setDeviceId(id);
    };
    fetchDeviceId();
  }, []);

  const handleRegister = async () => {
    if (!name.trim()) {
      alert('Please Fill Name');
      return;
    }

    setShowLoading(true);
    try {
      await database.registerDevice({
        deviceid: deviceId,
        name: name.trim(),
        votingcode: vCode,
      });

      setNameID({
        device_id: deviceId,
        name: name.trim(),
      });
    } catch (error) {
      console.error('Error registering device:', error);
      alert('Error registering. Please try again.');
    } finally {
      setShowLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="name-screen">
      <label className="input-label">Your Name</label>
      <input
        type="text"
        className="input-field"
        placeholder="Set Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      
      <p className="device-info">
        Your Device ID is {deviceId} {vCode}
      </p>
      
      <button className="btn-primary" onClick={handleRegister}>
        <img src="/assets/shuttle.png" alt="Start" />
        <span>Get Started</span>
      </button>
    </div>
  );
};

export default Name;
