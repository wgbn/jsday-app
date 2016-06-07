#!/usr/bin/env bash
rm jsday-app.apk
ionic build android --release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore wgbn.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk wgbn
~/Android/Sdk/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk jsday-app.apk
