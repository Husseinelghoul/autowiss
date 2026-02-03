<?php
header('Content-Type: application/json');

// Check for empty fields
if(empty($_POST['name']) || empty($_POST['vorname']) || empty($_POST['marke'])) {
    echo json_encode(['status' => 'error', 'message' => 'Required fields are missing.']);
    http_response_code(400);
    exit();
}

$to = "husseinelghoul8@gmail.com";
$name = strip_tags(htmlspecialchars($_POST['name']));
$vorname = strip_tags(htmlspecialchars($_POST['vorname']));
$subject = "Neue Fahrzeug-Offerte von: $vorname $name";

$body = "Sie haben eine neue Fahrzeug-Offerte von Ihrer Website erhalten.\n\n"."Hier sind die Details:\n\n";
$body .= "--- FAHRZEUGDATEN ---\n";
$body .= "Marke & Typ: " . ($_POST['marke'] ?? 'N/A') . "\n";
$body .= "Aufbauart: " . ($_POST['aufbauart'] ?? 'N/A') . "\n";
$body .= "Treibstoffart: " . ($_POST['treibstoff'] ?? 'N/A') . "\n";
$body .= "Getriebeart: " . ($_POST['getriebe'] ?? 'N/A') . "\n";
$body .= "1. Inverkehrsetzung: " . ($_POST['inverkehrsetzung'] ?? 'N/A') . "\n";
$body .= "Kilometerstand: " . ($_POST['kilometerstand'] ?? 'N/A') . "\n";
$body .= "Farbe: " . ($_POST['farbe'] ?? 'N/A') . "\n";
$body .= "Typengenehmigung: " . ($_POST['typengenehmigung'] ?? 'N/A') . "\n";
$body .= "Hubraum: " . ($_POST['hubraum'] ?? 'N/A') . "\n";
$body .= "Anzahl Türen: " . ($_POST['tueren'] ?? 'N/A') . "\n";
$body .= "Letzte Prüfung (MFK): " . ($_POST['pruefung'] ?? 'N/A') . "\n";
$body .= "Preisvorstellung: " . ($_POST['preis'] ?? 'N/A') . "\n\n";

$body .= "--- HALTERDATEN ---\n";
$body .= "Name: $name\n";
$body .= "Vorname: $vorname\n";
$body .= "PLZ/Ort: " . ($_POST['plz_ort'] ?? 'N/A') . "\n";
$body .= "Strasse: " . ($_POST['strasse'] ?? 'N/A') . "\n";
$body .= "Telefon: " . ($_POST['telefon'] ?? 'N/A') . "\n";
$body .= "E-Mail: " . ($_POST['email'] ?? 'N/A') . "\n\n";

$body .= "--- BEMERKUNGEN ---\n";
$body .= ($_POST['bemerkungen'] ?? 'Keine') . "\n";

// LOCAL TESTING: Save to a file so you can see it on your computer
$log_file = "last_email.txt";
$log_header = "To: $to\nSubject: $subject\n";
file_put_contents($log_file, $log_header . $body);

// Real Mail attempt (will work on your live hosting later)
$from_email = "info@wyss-autokauf.ch";
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: " . (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : $from_email) . "\r\n";

mail($to, $subject, $body, $headers);

// Always return success for local testing so the redirect happens
echo json_encode(['status' => 'success']);
http_response_code(200);
?>
