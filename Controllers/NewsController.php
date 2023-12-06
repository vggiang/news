<?php

require_once 'Models/NewsModel.php';
require_once 'Views/NewsView.php';

class NewsController {
    public function showNews() {
        $model = new NewsModel();
        $news = $model->getNews();

        $view = new NewsView();
        $view->render($news);
    }

    public function addNews($title, $content) {
        $model = new NewsModel();
        $model->addNews($title, $content);
    }

    public function updateNews($id, $title, $content) {
        $model = new NewsModel();
        $model->updateNews($id, $title, $content);
    }

}
