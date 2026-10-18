<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Form Data
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$location = $_POST['location'] ?? '';
$date = $_POST['date'] ?? '';
$url = $_POST['url'] ?? '';
$message = $_POST['message'] ?? '';

// Server-side validation: Disallow links & URLs in the message field
$urlPattern = '/(?:[a-zA-Z]+:\/\/|www\.)[^\s]*|(?<!@)\b[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.(?:com|org|net|in|co|io|ai|biz|info|xyz|me|online|site|tech|store|app|dev|cloud|pro|link|top|vip|icu|live|click|mobi|ly|gl|be|tv|to|cc|edu|gov)\b(?:\/[^\s]*)?/i';
if (!empty($message) && preg_match($urlPattern, $message)) {
    echo "<script>
        alert('Links and website URLs are not allowed in the message field. Please go back and remove them.');
        window.history.back();
    </script>";
    exit();
}

$dpdpConsent = isset($_POST['dpdp_consent']) ? 'Yes (Consented under DPDP Act, 2023)' : 'Not recorded';

// Build message with date/page info if provided
$fullMessage = $message;
$extra = [];
if (!empty($date)) {
    $extra[] = "Preferred Date: " . $date;
}
if (!empty($url)) {
    $extra[] = "Page: " . $url;
}
$extra[] = "DPDP Consent: " . $dpdpConsent;
if (!empty($extra)) {
    $fullMessage = !empty($fullMessage) ? $fullMessage . " | " . implode(" | ", $extra) : implode(" | ", $extra);
}

// ================= CRM API =================

$crmData = [
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'location' => $location,
    'message' => $fullMessage,
    'consent' => $dpdpConsent,
];

try {
    $ch = curl_init('https://software.dermatales.com/api/leads');

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($crmData));

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json',
    ]);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $crmResponse = curl_exec($ch);
    $crmHttpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);
} catch (\Throwable $th) {
    // CRM API call failed gracefully without interrupting email flow
}

// ================= END CRM API =================


$mail = new PHPMailer(true);

$body = "";
$body .= '<h4>New Lead DermaTales Website</h4>';
$body .= '<h5>Client Details:</h5>';
$body .= 'Name: ' . htmlspecialchars($name) . "<br>";
$body .= 'Phone Number: ' . htmlspecialchars($phone) . "<br>";
$body .= 'Email: ' . htmlspecialchars($email) . "<br>";
$body .= 'Location: ' . htmlspecialchars($location) . "<br>";
$body .= 'Date: ' . htmlspecialchars($date) . "<br>";
$body .= 'Url: ' . htmlspecialchars($url) . "<br>";
$body .= 'Message: ' . htmlspecialchars($message) . "<br>";
$body .= 'DPDP Consent: ' . htmlspecialchars($dpdpConsent) . "<br>";


try {
    // SMTP Settings
    $mail->isSMTP();
    $mail->Host = 'smtp.hostinger.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@cognivicdigital.com';
    $mail->Password = 'Info@987--';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    // Email Settings
    $mail->setFrom('info@cognivicdigital.com', $name ?: 'Website Lead');
    $mail->addAddress('manishkushwahaf7@gmail.com', $name ?: 'Website Lead'); // Add a recipient
    $mail->addAddress('dermatales@gmail.com', $name ?: 'Website Lead'); // Add a recipient
    $mail->Subject = 'New Lead DermaTales Website';
    $mail->MsgHTML($body);
    $mail->IsHTML(true);

    $mail->send();
    header("Location: thank-you.php");
    exit();
} catch (Exception $e) {
    echo "<script>
        alert('Mail Error: {$mail->ErrorInfo}');
        window.location.href = 'index.php';
    </script>";
}