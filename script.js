/**
 * SMA Practical 8 - Google Analytics Event Dispatcher & Telemetry HUD
 */

// 1. Check GA4 Measurement ID Status
document.addEventListener('DOMContentLoaded', () => {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');

  if (typeof GA_MEASUREMENT_ID !== 'undefined' && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && GA_MEASUREMENT_ID.startsWith('G-')) {
    statusIndicator.classList.add('connected');
    statusText.innerHTML = `🟢 Google Tag Active (<strong>${GA_MEASUREMENT_ID}</strong>)`;
    logToTerminal('System', `Connected to Google Analytics ID: ${GA_MEASUREMENT_ID}`);
  } else {
    statusText.innerHTML = `⚠️ Google Tag not set. Replace <code>G-XXXXXXXXXX</code> in <code>index.html</code> with your Measurement ID.`;
    logToTerminal('System', 'Google Tag in Demo Mode (Placeholder ID active). Events will still fire to dataLayer.');
  }
});

/**
 * Universal safe wrapper for gtag
 */
function sendGtagEvent(eventName, eventParams = {}) {
  // Dispatch to Google Analytics gtag
  if (typeof gtag === 'function') {
    gtag('event', eventName, eventParams);
  } else {
    console.warn('gtag is not defined yet.');
  }

  // Also log to the local on-screen HUD for live inspection
  logToTerminal(eventName, JSON.stringify(eventParams));
}

/**
 * Log entries into the on-screen live terminal
 */
function logToTerminal(tag, message) {
  const terminal = document.getElementById('event-terminal');
  if (!terminal) return;

  const entry = document.createElement('div');
  entry.className = 'log-entry';

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

  entry.innerHTML = `
    <span class="log-time">[${timeStr}]</span>
    <span class="log-tag">${tag}</span>
    <span class="log-message">${message}</span>
  `;

  terminal.appendChild(entry);
  terminal.scrollTop = terminal.scrollHeight;
}

/**
 * Clear the local event inspector terminal
 */
function clearEventLogs() {
  const terminal = document.getElementById('event-terminal');
  terminal.innerHTML = `
    <div class="log-entry log-system">
      <span class="log-time">[System]</span>
      <span class="log-message">Event terminal cleared.</span>
    </div>
  `;
}

/**
 * Event 1: Hero Primary CTA Click
 */
function trackCtaClick(ctaName, label) {
  sendGtagEvent('cta_click', {
    cta_name: ctaName,
    button_label: label,
    section: 'hero_section'
  });
}

/**
 * Event 2: File Download Simulation
 */
function trackFileDownload(fileName) {
  sendGtagEvent('file_download', {
    file_name: fileName,
    file_extension: 'pdf',
    link_text: 'Download Sample'
  });
}

/**
 * Event 3: Content / Tab Switch
 */
function trackTabChange(tabName) {
  // Update button active state
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName.toLowerCase().replace(' ', ''));
  });

  // Update content text
  const contentEl = document.getElementById('tab-content');
  const tabDescriptions = {
    'Overview': '<strong>Overview:</strong> Demonstrating fundamental web analytics, tracking sessions and user engagement.',
    'Metrics': '<strong>Metrics:</strong> Tracking Event Count, Users, Engagement Rate, Conversions, and Custom Dimensions.',
    'Event Schema': '<strong>Event Schema:</strong> Custom parameters dispatched include tab_name, interaction_type, and timestamps.'
  };

  contentEl.innerHTML = tabDescriptions[tabName] || `Selected ${tabName}`;

  sendGtagEvent('select_content', {
    content_type: 'tab',
    item_id: tabName
  });
}

/**
 * Event 4: Lead Generation / Form Submission
 */
function trackFormSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('user-name');
  const interestSelect = document.getElementById('user-interest');

  const name = nameInput.value.trim();
  const interest = interestSelect.value;

  sendGtagEvent('generate_lead', {
    lead_name: name,
    topic_of_interest: interest,
    form_id: 'feedback_form'
  });

  alert(`✅ Thank you ${name}! Event 'generate_lead' dispatched to Google Analytics.`);
  nameInput.value = '';
  interestSelect.selectedIndex = 0;
}

/**
 * Event 5: User Rating Interaction
 */
function trackRating(stars) {
  const starButtons = document.querySelectorAll('#rating-stars .star');
  starButtons.forEach((star, index) => {
    if (index < stars) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });

  const statusEl = document.getElementById('rating-status');
  statusEl.innerHTML = `⭐ Rated <strong>${stars} / 5 stars</strong>! Event recorded.`;

  sendGtagEvent('rate_item', {
    item_name: 'Google Analytics Demo Practical',
    rating_value: stars
  });
}

/**
 * Event 6: Outbound Link Click
 */
function trackOutbound(destinationName, url) {
  sendGtagEvent('outbound_click', {
    destination_name: destinationName,
    target_url: url
  });
}
