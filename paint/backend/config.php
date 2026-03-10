<?php
/**
 * Contact Form Configuration
 * 
 * IMPORTANT: Update these settings before hosting your website!
 */

// Email Configuration
define('CONTACT_EMAIL', 'hardycloydnagnal1@gmail.com'); // Replace with your email address
define('WEBSITE_NAME', 'Artisan Gallery');
define('FROM_NAME', 'Artisan Gallery Contact Form');

// Security Settings
define('MAX_SUBMISSIONS_PER_IP', 3); // Maximum submissions per IP address
define('RATE_LIMIT_DURATION', 300); // Time window in seconds (300 = 5 minutes)

// Validation Rules
define('MIN_NAME_LENGTH', 2);
define('MAX_NAME_LENGTH', 100);
define('MAX_EMAIL_LENGTH', 100);
define('MIN_MESSAGE_LENGTH', 10);
define('MAX_MESSAGE_LENGTH', 1000);

// File Paths (relative to contact.php)
define('RATE_LIMIT_DIR', './logs/');
define('LOG_FILE', './logs/contact_log.txt');
define('ERROR_LOG_FILE', './logs/contact_errors.txt');

// Create logs directory if it doesn't exist
if (!is_dir('./logs/')) {
    mkdir('./logs/', 0755, true);
}
?>