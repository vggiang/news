<?php
// header("location: public/index.html");
require_once 'Controllers/NewsController.php';
$controller = new NewsController();

// // Thêm bài viết
// $controller->addNews('Tiêu đề mới', 'Nội dung mới');

// // Cập nhật bài viết
// $controller->updateNews(1, 'Tiêu đề cập nhật', 'Nội dung cập nhật');

// // Xóa bài viết
// $controller->deleteNews(2);

// // Hiển thị danh sách bài viết
// $controller->showNews();

$controller->deleteNews(5);
$controller->showNews();
