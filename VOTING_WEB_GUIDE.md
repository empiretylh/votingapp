# Youth Choice Voting System - Web Version

This repository now contains both a React Native mobile app and a React web application with the same functionality and UI design.

## Overview

The Voting System allows users to vote for King and Queen candidates in a secure manner, ensuring one device can only cast one vote. The system includes:

- ✅ **One Device, One Vote**: Device fingerprinting ensures voting integrity
- ✅ **Time-Limited Voting**: Automatic countdown and voting period management
- ✅ **Vote Management**: Users can change their vote before the deadline
- ✅ **Real-time Updates**: Live vote counts and candidate information
- ✅ **Profile Views**: Detailed candidate profiles with photo galleries
- ✅ **Responsive Design**: Works on all screen sizes

## Repository Structure

```
votingapp/
├── App/                    # React Native mobile app source
├── android/                # Android native code
├── ios/                    # iOS native code
├── assets/                 # Shared images and assets
└── voting-web/             # React web application
    ├── public/
    │   └── assets/         # Web assets (copied from root assets)
    └── src/
        ├── api/            # API integration
        ├── components/     # Reusable components
        ├── context/        # React context providers
        ├── screens/        # Page components
        └── utils/          # Utility functions
```

## React Native App (Mobile)

### Setup
```bash
# Install dependencies
npm install

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Features
- Native device ID detection
- QR code scanning
- Encrypted local storage
- Native animations
- Push notifications support

## React Web App

### Setup
```bash
# Navigate to web directory
cd voting-web

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at http://localhost:3000

### Build for Production
```bash
npm run build
```

### Features
- Browser-based device fingerprinting
- LocalStorage for session management
- Responsive CSS design
- Cross-browser compatibility
- PWA-ready architecture

## Key Differences Between Mobile and Web

| Feature | React Native (Mobile) | React Web |
|---------|----------------------|-----------|
| Device ID | Hardware device ID via react-native-device-info | Browser fingerprint via FingerprintJS |
| Storage | Encrypted storage via react-native-encrypted-storage | LocalStorage |
| QR Scanner | Native camera via react-native-qrcode-scanner | Web-based (not implemented due to complexity) |
| Navigation | React Navigation | React Router |
| Styling | StyleSheet | CSS |
| Animations | Animated API + Reanimated | CSS animations |

## Common Functionality

Both versions share:
- Same API endpoints
- Same voting logic
- Same UI design and layout
- Same user flow
- Same security measures

## API Integration

Both apps connect to:
```
https://csvote.pythonanywhere.com
```

### API Endpoints Used
- `GET /api/votingm/` - Get voting data
- `GET /api/checkcode/` - Validate voting code
- `POST /api/registerdevice/` - Register device
- `GET /api/voteking/` - Get king vote status
- `POST /api/voteking/` - Vote for king
- `DELETE /api/voteking/` - Unvote king
- `GET /api/votequeen/` - Get queen vote status
- `POST /api/votequeen/` - Vote for queen
- `DELETE /api/votequeen/` - Unvote queen
- `GET /api/endtime/` - Get voting end time

## Security Features

### One Device, One Vote Implementation

**Mobile (React Native):**
- Uses device hardware ID (IMEI/UUID)
- Cannot be easily spoofed
- Persists across app reinstalls

**Web (React):**
- Uses FingerprintJS for browser fingerprinting
- Combines multiple browser attributes:
  - Canvas fingerprint
  - WebGL fingerprint
  - Audio fingerprint
  - Screen resolution
  - Timezone
  - Language settings
  - Installed fonts
  - And more...
- Fallback to generated ID stored in localStorage

### Vote Validation
- Server-side validation of device ID
- Time-based voting restrictions
- Code validation before access

## User Flow

1. **Enter Voting Code**
   - User enters 5-digit code or scans QR (mobile only)
   - System validates code with backend

2. **Register Name**
   - User provides their name
   - Device ID is generated/retrieved
   - Registration sent to backend

3. **Browse Candidates**
   - View all candidates (King & Queen)
   - Filter and search
   - View detailed profiles

4. **Cast Vote**
   - Select candidate
   - Vote is recorded with device ID
   - Can change vote until deadline

5. **Vote Management**
   - View current votes
   - Unvote to change selection
   - See countdown timer

6. **Voting Ends**
   - System automatically closes voting
   - Users notified
   - Results available from admin

## Development

### Adding New Features

Both versions are designed to be maintainable and extensible:

**React Native:**
```javascript
// Add new screen in App/screens/
// Register in App/MainContainer.js
```

**React Web:**
```javascript
// Add new screen in voting-web/src/screens/
// Register route in voting-web/src/AppContainer.js
```

### Styling Guidelines

**React Native:**
- Use StyleSheet.create()
- Follow existing naming conventions
- Use Roboto font family

**React Web:**
- Add styles in App.css
- Use BEM naming convention
- Maintain mobile-first approach

## Testing

### React Native
```bash
npm test
```

### React Web
```bash
cd voting-web
npm test
```

## Deployment

### Mobile App
- Build APK/IPA using standard React Native build process
- Submit to Google Play Store / Apple App Store

### Web App
- Build production bundle: `npm run build`
- Deploy to any static hosting service:
  - Netlify
  - Vercel
  - GitHub Pages
  - AWS S3 + CloudFront
  - Firebase Hosting

Example deployment to Netlify:
```bash
cd voting-web
npm run build
# Upload build/ directory to Netlify
```

## Browser Support (Web Version)

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## Troubleshooting

### Web App Issues

**Device ID not generating:**
- Check browser console for errors
- Ensure FingerprintJS is loaded
- Fallback ID should be created in localStorage

**API errors:**
- Verify backend is running
- Check CORS settings
- Inspect network tab for failed requests

**Styling issues:**
- Clear browser cache
- Check CSS file is loaded
- Verify asset paths

### Mobile App Issues

**Device ID not working:**
- Check permissions
- Verify react-native-device-info is installed
- Check iOS/Android native code

**QR Scanner not working:**
- Check camera permissions
- Verify react-native-camera is properly linked
- Test on physical device (not simulator)

## Contributing

When contributing to either version:
1. Maintain feature parity between mobile and web
2. Follow existing code style
3. Test on multiple devices/browsers
4. Update documentation

## Credits

- **Developer**: Thura Lin Htut
- **Organization**: EMPIRE
- **Framework**: React Native & React
- **UI Design**: Custom design matching mobile app

## License

[Your License Here]

## Support

For issues or questions:
- Open an issue on GitHub
- Contact developer via Telegram
- Email support team

---

**Note**: This is the web version of the mobile voting app. Both versions maintain the same functionality, UI design, and voting logic while adapting to their respective platforms.
