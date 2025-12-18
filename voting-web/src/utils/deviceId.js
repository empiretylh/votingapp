import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise = null;

export const getDeviceId = async () => {
  try {
    // Initialize the agent at application startup
    if (!fpPromise) {
      fpPromise = FingerprintJS.load();
    }

    // Get the visitor identifier when you need it
    const fp = await fpPromise;
    const result = await fp.get();

    // This is the visitor identifier
    const visitorId = result.visitorId;
    return visitorId;
  } catch (error) {
    console.error('Error getting device ID:', error);
    // Fallback to a simple ID if fingerprinting fails
    let deviceId = localStorage.getItem('fallback_device_id');
    if (!deviceId) {
      deviceId = 'web-' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('fallback_device_id', deviceId);
    }
    return deviceId;
  }
};
