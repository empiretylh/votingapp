# Voting Web App

This is a React web version of the voting application with the same functionality and UI design as the React Native app.

## Features

- **One Device, One Vote**: Uses device fingerprinting to ensure each device can only vote once
- **QR Code or Manual Entry**: Users can enter a voting code to access the voting system
- **King & Queen Voting**: Separate categories for voting
- **Vote Management**: Users can vote and change their vote (unvote and revote)
- **Time-Limited Voting**: Voting ends at a specified time
- **Real-time Updates**: Live countdown and vote updates
- **Profile View**: View candidate profiles and photos
- **Responsive Design**: Works on desktop and mobile browsers

## Technology Stack

- **React**: Frontend framework
- **React Router**: Navigation
- **Axios**: API communication
- **FingerprintJS**: Device identification
- **LocalStorage**: Client-side data persistence

## Installation

```bash
cd voting-web
npm install
```

## Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

## How It Works

### Device Fingerprinting
The app uses FingerprintJS to generate a unique identifier for each device/browser. This ensures:
- One vote per device
- Persistent voting across sessions
- Fraud prevention

### Voting Flow
1. **Enter Code**: User enters a 5-digit voting code or scans QR code
2. **Register Name**: User registers their name with their device ID
3. **Vote**: User can vote for King and/or Queen candidates
4. **Change Vote**: User can unvote and change their selection
5. **Time Limit**: Voting automatically closes at the specified end time

### API Integration
The app connects to the same backend API as the React Native version:
- `https://csvote.pythonanywhere.com`

## Differences from React Native App

- **Device ID**: Uses browser fingerprinting instead of device hardware ID
- **Storage**: Uses localStorage instead of encrypted storage
- **Navigation**: Uses React Router instead of React Navigation
- **Styling**: Uses CSS instead of React Native StyleSheet
- **UI Components**: Uses standard HTML elements instead of React Native components

## Security Features

- Device fingerprinting for vote integrity
- Session management
- API-based vote verification
- Time-limited voting periods

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This project is part of the Youth Choice Voting System.
