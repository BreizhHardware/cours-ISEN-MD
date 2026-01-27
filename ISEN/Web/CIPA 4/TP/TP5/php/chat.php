<?php
require_once 'database.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$db = dbConnect();

if (isset($_GET['request']) && $_GET['request'] == 'channels') {
    $channels = dbGetChannels($db);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($channels);
}
?>
