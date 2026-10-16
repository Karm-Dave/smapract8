# SMA Practical 8: Web Telemetry & Google Analytics (GA4) Demo

A lightweight, modern web project built for **SMA (Social Media & Web Analytics) Practical 8**. It demonstrates hosting a static web application on **GitHub Pages**, attaching a **Google Tag (GA4)**, and tracking custom user events.

---

## 🌟 Features Included

1. **GitHub Pages Ready**: 100% static HTML, CSS, and JS with zero build steps or external bundler dependencies.
2. **Google Analytics 4 (gtag.js)**: Pre-configured snippet with `debug_mode: true` enabled.
3. **Interactive Event Triggers**:
   - 🎯 **Primary CTA Click** (`cta_click`)
   - 📥 **Simulated PDF Download** (`file_download`)
   - 📂 **Tab / Category Switcher** (`select_content`)
   - ✉️ **Lead / Feedback Form Submission** (`generate_lead`)
   - ⭐ **Interactive Star Rating** (`rate_item`)
   - 🔗 **Outbound Link Tracking** (`outbound_click`)
4. **Live On-Screen Telemetry HUD**: An in-browser terminal showing event payloads in real-time as you click elements, alongside sending them to Google Analytics.

---

## 🛠️ Step-by-Step Guide

### Step 1: Get Your Google Analytics 4 (GA4) Tag

1. Go to [Google Analytics](https://analytics.google.com/) and sign in with your Google account.
2. Click **Admin** (gear icon in the bottom-left corner).
3. Under **Account**, click **Create Account** (or select your existing account) and give it a name (e.g., `SMA Practicals`).
4. Under **Property**, click **Create Property**:
   - Property Name: `SMA Pract 8`
   - Select your Timezone & Currency -> click **Next**.
5. Choose **Web** as the platform.
6. In **Set up data stream**:
   - Website URL: Enter your GitHub Pages URL (e.g., `https://karm-dave.github.io/smapract8/`) or `https://example.com` for now.
   - Stream Name: `SMA Pract8 Web Stream`.
   - Click **Create stream**.
7. Copy your **Measurement ID** (it looks like `G-XXXXXXXXXX`).

---

### Step 2: Add Your Measurement ID to `index.html`

Open [index.html](index.html) and locate lines 12–23:

```html
<!-- Replace G-XXXXXXXXXX in BOTH places with your Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());

  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // <-- Put your ID here
  gtag('config', GA_MEASUREMENT_ID, {
    debug_mode: true
  });
</script>
```

Commit and push your change:
```bash
git add index.html
git commit -m "Configure GA4 Measurement ID"
git push origin main
```

---

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository: [https://github.com/Karm-Dave/smapract8](https://github.com/Karm-Dave/smapract8).
2. Click on **Settings** (tab at the top).
3. In the left sidebar, click on **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
5. Wait 1–2 minutes. Refresh the page to see your live site link:
   > 🌐 **`https://karm-dave.github.io/smapract8/`**

---

### Step 4: How to View Analytics in Google Analytics

1. Open your live GitHub Pages site in your browser.
2. Open [Google Analytics](https://analytics.google.com/).
3. In the left-hand navigation, click **Reports** > **Realtime**:
   - **Users in Last 30 Minutes**: You will see **1** active user on the world map.
   - **Users by First User Source**: Shows direct or referral.
   - **Event Count by Event Name**:
     - `page_view`
     - `session_start`
     - `first_visit`
4. Now, go back to your website and click the buttons (e.g., click *Trigger "Explore Features"*, submit the feedback form, or click star rating).
5. Switch back to Google Analytics Realtime:
   - You will see custom events like `cta_click`, `generate_lead`, `rate_item`, and `select_content` incrementing in real time under **Event Count by Event Name**!
6. **Bonus (GA4 DebugView)**:
   - In Google Analytics, click **Admin** > **DebugView** (under *Data display*).
   - Because `debug_mode: true` is configured in our code, you can see a second-by-second timeline of every single event and its exact parameters.

---

## 📂 Project Structure

```
smapract8/
├── index.html       # Main landing page with GA4 script & interactive triggers
├── style.css        # Sleek dark-mode glassmorphic styling
├── script.js        # Event dispatching and live HUD telemetry logger
└── README.md        # Comprehensive documentation & practical instructions
```
