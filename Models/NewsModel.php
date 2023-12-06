<?php

require_once 'Core/db.php';

class NewsModel {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function getNews() {
        $conn = $this->db->getConnection();

        $query = 'SELECT * FROM news';
        $result = $conn->query($query);

        $news = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $news[] = $row;
            }
        }

        $conn->close();

        return $news;
    }

}
