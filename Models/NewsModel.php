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

    public function addNews($title, $content) {
        $conn = $this->db->getConnection();

        $title = $conn->real_escape_string($title);
        $content = $conn->real_escape_string($content);

        $query = "INSERT INTO news (title, content) VALUES ('$title', '$content')";
        $conn->query($query);

        $conn->close();
    }

    public function updateNews($id, $title, $content) {
        $conn = $this->db->getConnection();

        $id = (int)$id;
        $title = $conn->real_escape_string($title);
        $content = $conn->real_escape_string($content);

        $query = "UPDATE news SET title='$title', content='$content' WHERE id=$id";
        $conn->query($query);

        $conn->close();
    }

}
