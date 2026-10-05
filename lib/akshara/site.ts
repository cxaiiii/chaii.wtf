export const APP = 'https://akshara.chaii.wtf';
export const APPLY = 'https://akshara.chaii.wtf/?apply';
const releases = 'https://github.com/cxaiiii/akshara-releases/releases';
// Android and desktop can ship on different releases: each points at its latest published build.
export const ANDROID_VERSION = '0.1.0-alpha.16';
export const DESKTOP_VERSION = '0.1.0-alpha.16';
export const ANDROID = `${releases}/download/v${ANDROID_VERSION}/Akshara-${ANDROID_VERSION}-android.apk`;
export const WIN = `${releases}/download/v${DESKTOP_VERSION}/Akshara-${DESKTOP_VERSION}-win-x64-setup.exe`;
export const MAC = `${releases}/download/v${DESKTOP_VERSION}/Akshara-${DESKTOP_VERSION}-mac-arm64.dmg`;
export const RELEASE = `${releases}/tag/v${ANDROID_VERSION}`;
export const ISSUES = 'https://github.com/cxaiiii/akshara-releases/issues';
// The published desktop build has the 3D tools (flip with DESKTOP_VERSION when a 3D build ships).
export const DESKTOP_HAS_3D = true;
