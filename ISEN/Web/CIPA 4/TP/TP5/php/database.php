<?php
require_once 'constants.php';

function dbConnect() {
    $dsn = 'pgsql:dbname=' . DB_NAME . ';host=' . DB_SERVER . ';port=' . DB_PORT;
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASSWORD);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        return false;
    }
}

function dbGetChannels($db) {
    try {
        $query = "SELECT * FROM channels";
        $statement = $db->query($query);
        $channels = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $channels;
    } catch (PDOException $e) {
        return false;
    }
}
