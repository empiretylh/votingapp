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
      // Use crypto.getRandomValues for better security
      const array = new Uint8Array(16);
      crypto.getRandomValues(array);
      deviceId = 'web-' + Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('fallback_device_id', deviceId);
    }
    return deviceId;
  }
};
