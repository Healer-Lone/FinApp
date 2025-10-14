# 🚀 Quick Start Guide - Build Android App in 5 Minutes

## ⚡ Super Fast Method (Recommended)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
cd /app/frontend
eas login
```
*Create account at expo.dev if you don't have one*

### Step 3: Build APK (For Testing)
```bash
eas build --platform android --profile preview
```
✅ This creates an APK you can install on your phone immediately!

### Step 4: Build AAB (For Play Store)
```bash
eas build --platform android --profile production
```
✅ This creates the file you upload to Google Play Store!

---

## 📥 Download Your Build

After the build completes (10-20 minutes):
1. You'll get a download link in the terminal
2. Or visit: https://expo.dev/accounts/[your-username]/projects/briefcast/builds
3. Download the APK or AAB file

---

## 📱 Test APK on Your Phone

1. Download the APK to your Android phone
2. Enable "Install Unknown Apps" in Settings
3. Open the APK file and install
4. Done! Your app is installed

---

## 🏪 Upload to Play Store

1. Go to: https://play.google.com/console
2. Create app (pay $25 one-time fee if first time)
3. Upload the AAB file
4. Complete store listing (description, screenshots, etc.)
5. Submit for review
6. Wait 1-7 days for approval
7. Your app goes live! 🎉

---

## 🔥 That's It!

**For detailed instructions, see:** `PLAY_STORE_GUIDE.md`

---

## 💡 Pro Tips

- Build APK first to test on your device
- Once tested, build AAB for Play Store
- Keep your `eas.json` and `app.json` files safe
- Increment version numbers for updates

---

## ❓ Common Questions

**Q: Do I need to pay anything?**
A: Expo build is free. Google Play Store registration is $25 one-time.

**Q: How long does the build take?**
A: Usually 10-20 minutes on Expo's servers.

**Q: Can I build on my own computer?**
A: Yes, but it's more complex. Using EAS is recommended.

**Q: What's the difference between APK and AAB?**
A: APK = Install directly. AAB = Google Play Store format (smaller size).

**Q: Do I need Android Studio?**
A: No! EAS builds everything in the cloud.

---

**Need more help? Check `PLAY_STORE_GUIDE.md` for detailed instructions!**
