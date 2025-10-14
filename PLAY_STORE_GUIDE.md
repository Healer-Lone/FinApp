# BriefCast - Google Play Store Submission Guide

## 📱 App Information
- **App Name:** BriefCast
- **Package Name:** com.briefcast.app
- **Version:** 1.0.0
- **Version Code:** 1

---

## 🚀 Step 1: Install Expo CLI & EAS CLI

If you don't have them installed, run:
```bash
npm install -g expo-cli eas-cli
```

---

## 🔐 Step 2: Create Expo Account & Login

1. Create an account at: https://expo.dev/signup
2. Login via terminal:
```bash
cd /app/frontend
eas login
```

---

## 📦 Step 3: Configure EAS Build

Create `eas.json` in your project (already done for you):
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "aab"
      }
    }
  }
}
```

---

## 🔨 Step 4: Build Your Android App

### Option A: Build APK (For Testing)
```bash
cd /app/frontend
eas build --platform android --profile preview
```
This creates an APK file you can install directly on Android devices for testing.

### Option B: Build AAB (For Play Store - Recommended)
```bash
cd /app/frontend
eas build --platform android --profile production
```
This creates an Android App Bundle (.aab) file required for Play Store submission.

**Note:** The build happens on Expo's cloud servers. You'll get a download link when it's ready (usually 10-20 minutes).

---

## 📝 Step 5: Prepare Play Store Assets

Before submitting to Play Store, you need:

### Required Assets:
1. **App Icon** (512x512 PNG)
2. **Feature Graphic** (1024x500 PNG)
3. **Screenshots** (Minimum 2, maximum 8)
   - Phone: 16:9 or 9:16 ratio
   - Minimum dimension: 320px
   - Maximum dimension: 3840px
4. **App Description**
   - Short description (max 80 characters)
   - Full description (max 4000 characters)
5. **Privacy Policy URL** (required)
6. **Content Rating** (via Google's questionnaire)

### Sample App Description:

**Short Description:**
"Stay informed with bite-sized financial news and stock market updates"

**Full Description:**
```
BriefCast delivers the latest financial news and stock market updates in a beautiful, easy-to-read format.

KEY FEATURES:
📰 Curated financial news articles
📊 Real-time stock price tracking
💼 Company earnings and market analysis
🔖 Bookmark your favorite articles
🌓 Dark mode support
✨ Clean, intuitive interface

Stay ahead of market trends with BriefCast - your go-to app for financial news on the go.

Perfect for:
- Investors tracking their portfolio
- Financial professionals staying updated
- Anyone interested in business news

Download now and never miss important market updates!
```

---

## 🏪 Step 6: Create Google Play Console Account

1. Go to: https://play.google.com/console
2. Sign up (one-time $25 registration fee)
3. Complete the account setup

---

## 📤 Step 7: Upload to Play Store

### 7.1 Create New App
1. In Google Play Console, click "Create app"
2. Fill in app details:
   - App name: **BriefCast**
   - Default language: English (US)
   - App type: App
   - Free or Paid: Free (or Paid if you want)

### 7.2 Upload Your AAB File
1. Go to **Production** → **Create new release**
2. Upload the `.aab` file you downloaded from EAS
3. Add release notes (describe what's in this version)

### 7.3 Complete Store Listing
1. **Main store listing**
   - Upload app icon
   - Upload feature graphic
   - Upload screenshots (2-8 required)
   - Add app description
   - Select app category: News & Magazines (or Finance)
   - Add contact email

2. **Content rating**
   - Complete the questionnaire
   - BriefCast should get "Everyone" or "Teen" rating

3. **App content**
   - Privacy policy URL (required - you need to host this)
   - Data safety form (describe what data you collect)
   - Target audience

4. **Pricing & distribution**
   - Select countries
   - Confirm content guidelines

### 7.4 Submit for Review
1. Once all sections are complete (green checkmarks)
2. Click "Send for review"
3. Google will review (usually 1-7 days)
4. You'll get an email when approved

---

## 🔄 Step 8: Future Updates

When you want to update your app:

1. Increment version in `app.json`:
```json
"version": "1.0.1",  // Update this
"versionCode": 2,    // Increment this (Android)
```

2. Build new AAB:
```bash
eas build --platform android --profile production
```

3. Upload to Play Console → Production → Create new release

---

## 🎯 Alternative: Build Locally (Advanced)

If you want to build on your own machine instead of using EAS:

### Prerequisites:
- Android Studio installed
- Java JDK installed
- Set ANDROID_HOME environment variable

### Build Commands:
```bash
cd /app/frontend

# For development APK
npx expo run:android

# For production build
npx expo build:android
```

---

## 🆘 Troubleshooting

### Issue: Build fails on EAS
- Check your `app.json` is valid
- Ensure all dependencies in `package.json` are compatible
- Check Expo build logs for specific errors

### Issue: Play Store rejects app
- Ensure you have privacy policy URL
- Complete all required sections in Play Console
- Follow Google's content policies
- Make sure app doesn't crash on launch

### Issue: Can't install APK on device
- Enable "Install from Unknown Sources" in Android settings
- Make sure you're using the correct architecture (most devices use ARM)

---

## 📞 Need Help?

- Expo Documentation: https://docs.expo.dev/
- EAS Build Guide: https://docs.expo.dev/build/introduction/
- Play Console Help: https://support.google.com/googleplay/android-developer/

---

## ✅ Checklist Before Submission

- [ ] App runs without crashes
- [ ] All features work as expected
- [ ] App icon looks good
- [ ] Screenshots are clear and appealing
- [ ] Privacy policy is created and hosted
- [ ] App description is compelling
- [ ] Content rating is completed
- [ ] Data safety form is filled
- [ ] Pricing & distribution is set
- [ ] AAB file is uploaded
- [ ] Release notes are added

---

**Good luck with your Play Store submission! 🚀**
