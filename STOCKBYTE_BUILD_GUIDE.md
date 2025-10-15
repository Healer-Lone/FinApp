# 📱 StockByte - Complete Build & Deployment Guide

## 🎯 App Overview
**Name**: StockByte  
**Bundle ID (iOS)**: com.stockbyte.app  
**Package Name (Android)**: com.stockbyte.app  
**URL Scheme**: stockbyte  
**Version**: 1.0.0

---

## ✅ Configuration Complete

Your app is now fully configured with:
- ✓ App name: **StockByte**
- ✓ Custom app icon (1024x1024)
- ✓ Adaptive icon for Android with orange background (#FFA500)
- ✓ Splash screen configured
- ✓ Favicon for web
- ✓ Bundle identifiers set for iOS and Android
- ✓ URL scheme: stockbyte

---

## 🚀 Development & Testing

### Start Development Server
```bash
cd /app/frontend
npx expo start
```

This will give you options to:
- Press `i` - Open in iOS simulator
- Press `a` - Open in Android emulator  
- Press `w` - Open in web browser
- Scan QR code with Expo Go app on your phone

### Run on Specific Platform
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

---

## 📦 Building for Production

### Prerequisites
1. **Install EAS CLI** (if not already installed):
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure your project**:
   ```bash
   cd /app/frontend
   eas build:configure
   ```

### Build Commands

#### 🍎 iOS Build
```bash
# Development build
eas build --platform ios --profile development

# Production build (for App Store)
eas build --platform ios --profile production
```

#### 🤖 Android Build
```bash
# APK for testing (can be installed directly)
eas build --platform android --profile preview

# AAB for Google Play Store
eas build --platform android --profile production
```

#### 📱 Both Platforms
```bash
eas build --platform all --profile production
```

---

## 📤 Submitting to App Stores

### Apple App Store
1. Build production iOS app:
   ```bash
   eas build --platform ios --profile production
   ```

2. Submit to App Store:
   ```bash
   eas submit --platform ios
   ```

3. You'll need:
   - Apple Developer Account ($99/year)
   - App Store Connect access
   - App-specific password

### Google Play Store
1. Build production Android app:
   ```bash
   eas build --platform android --profile production
   ```

2. Submit to Play Store:
   ```bash
   eas submit --platform android
   ```

3. You'll need:
   - Google Play Developer Account ($25 one-time)
   - Play Console access

---

## 🎨 Icon Requirements Met

### iOS Icon
- ✅ 1024x1024 PNG (no alpha channel)
- ✅ Located at: `./assets/images/icon.png`

### Android Icon
- ✅ Adaptive Icon: 1024x1024 PNG
- ✅ Background Color: #FFA500 (orange to match your icon)
- ✅ Located at: `./assets/images/adaptive-icon.png`

### Web Favicon
- ✅ 48x48 PNG
- ✅ Located at: `./assets/images/favicon.png`

### Splash Screen
- ✅ 200x200 PNG centered on black background
- ✅ Located at: `./assets/images/splash-icon.png`

---

## 📋 Pre-Submission Checklist

### Before Publishing:
- [ ] Test app thoroughly on iOS simulator/device
- [ ] Test app thoroughly on Android emulator/device
- [ ] Verify all features work as expected
- [ ] Test authentication flows
- [ ] Check app icon displays correctly on all platforms
- [ ] Verify splash screen appears properly
- [ ] Test deep linking with `stockbyte://` URL scheme
- [ ] Review and update app description
- [ ] Prepare app store screenshots (required sizes vary by platform)
- [ ] Create app privacy policy (required by both stores)
- [ ] Prepare promotional graphics

### iOS Specific:
- [ ] Screenshots: 6.5", 5.5" iPhone displays
- [ ] App Preview video (optional but recommended)
- [ ] Age rating questionnaire
- [ ] Export compliance information

### Android Specific:
- [ ] Feature graphic: 1024x500
- [ ] Screenshots: Phone (16:9), 7-inch tablet, 10-inch tablet
- [ ] Content rating questionnaire
- [ ] Target API level 34+ (Android 14)

---

## 🔧 Configuration Files

All configuration is in `/app/frontend/app.json`:
```json
{
  "name": "StockByte",
  "slug": "stockbyte",
  "version": "1.0.0",
  "icon": "./assets/images/icon.png",
  "scheme": "stockbyte",
  "ios": {
    "bundleIdentifier": "com.stockbyte.app"
  },
  "android": {
    "package": "com.stockbyte.app"
  }
}
```

---

## 📱 Testing on Physical Device

### Using Expo Go (Development)
1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Start dev server: `npx expo start`
3. Scan QR code with Expo Go app

### Using Development Build
```bash
# Build development version
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on device and use with dev server
npx expo start --dev-client
```

---

## 🐛 Troubleshooting

### Clear Cache
```bash
cd /app/frontend
npx expo start -c
```

### Reset Metro Bundler
```bash
watchman watch-del-all
rm -rf node_modules
yarn install
npx expo start -c
```

### Icon Not Updating
```bash
# Clear Expo cache
rm -rf .expo
npx expo start -c
```

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)

---

## 🎉 Your App is Ready!

Your **StockByte** app is now fully configured with:
- Professional branding
- Custom icon with modern gradient design
- Proper bundle identifiers
- Ready for development and production builds

**Next Steps**:
1. Test the app with `npx expo start`
2. Build for your platform of choice
3. Submit to app stores

Good luck with your launch! 🚀
