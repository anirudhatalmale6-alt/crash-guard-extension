# Crash Guard — Chrome Extension

Silently intercepts `chrome://crash` and redirects to a configurable homepage. Manifest V3, no UI.

## Install (side-load)

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this folder
4. Done — the extension is now active

## Usage

Type `chrome://crash` in any tab. Instead of crashing, Chrome navigates to the homepage (default: google.com).

## Configuration

Edit `HOMEPAGE` at the top of `background.js` to change the redirect target.
