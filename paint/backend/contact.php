<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

try {
    // Get and sanitize input data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON data');
    }
    
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $message = trim($input['message'] ?? '');
    
    // Validation using config constants
    if (empty($name) || strlen($name) < MIN_NAME_LENGTH || strlen($name) > MAX_NAME_LENGTH) {
        throw new Exception('Please enter a valid name (' . MIN_NAME_LENGTH . '-' . MAX_NAME_LENGTH . ' characters)');
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > MAX_EMAIL_LENGTH) {
        throw new Exception('Please enter a valid email address');
    }
    
    if (empty($message) || strlen($message) < MIN_MESSAGE_LENGTH || strlen($message) > MAX_MESSAGE_LENGTH) {
        throw new Exception('Please enter a message (' . MIN_MESSAGE_LENGTH . '-' . MAX_MESSAGE_LENGTH . ' characters)');
    }
    
    // Additional security checks
    $suspicious_patterns = [
        '/bcc:/i', '/cc:/i', '/to:/i', '/content-type:/i',
        '/mime-version:/i', '/x-mailer:/i', '/boundary=/i'
    ];
    
    foreach ($suspicious_patterns as $pattern) {
        if (preg_match($pattern, $name . $email . $message)) {
            throw new Exception('Suspicious content detected');
        }
    }
    
    // Rate limiting
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_limit_file = RATE_LIMIT_DIR . 'rate_limit_' . md5($ip) . '.txt';
    $current_time = time();
    
    if (file_exists($rate_limit_file)) {
        $submissions = json_decode(file_get_contents($rate_limit_file), true);
        $submissions = array_filter($submissions, function($time) use ($current_time) {
            return ($current_time - $time) < RATE_LIMIT_DURATION;
        });
        
        if (count($submissions) >= MAX_SUBMISSIONS_PER_IP) {
            throw new Exception('Too many submissions. Please wait before sending another message.');
        }
        
        $submissions[] = $current_time;
    } else {
        $submissions = [$current_time];
    }
    
    file_put_contents($rate_limit_file, json_encode($submissions));
    
    // Prepare email
    $subject = "New Contact Form Message from " . WEBSITE_NAME;
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Date: " . date('Y-m-d H:i:s') . "\n";
    $email_body .= "IP Address: " . $ip . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "This message was sent from the contact form on " . WEBSITE_NAME;
    
    // Email headers
    $headers = [
        'From: ' . FROM_NAME . ' <noreply@' . $_SERVER['HTTP_HOST'] . '>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'X-Priority: 3',
        'X-MSMail-Priority: Normal'
    ];
    
    $headers_string = implode("\r\n", $headers);
    
    // Send email
    if (mail(CONTACT_EMAIL, $subject, $email_body, $headers_string)) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - SUCCESS - Email: $email, Name: $name, IP: $ip\n";
        file_put_contents(LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
    } else {
        throw new Exception('Failed to send email. Please try again later.');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    
    // Log error
    $log_entry = date('Y-m-d H:i:s') . " - ERROR - " . $e->getMessage() . " - IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
    file_put_contents(ERROR_LOG_FILE, $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>