<?php

class NewController extends BaseController
{
    private $newModel;

    public function __construct()
    {
        $this->loadModel('NewModel');
        $this->newModel = new NewModel;
    }

    public function index()
    {
        $news = $this->newModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($news);
    }

    public function findNew()
    {
        $id = $_GET['id'];
        $new = $this->newModel->findId($id);
        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($new);
    }

    public function incViews()
    {
        $id = $_GET['id'];
        $this->newModel->Views($id);
    }

    public function addRoom()
    {
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->newModel->store($data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function editRoom()
    {
        $id = $_GET['id'];
        $data = [
            'name'      => $_POST['name'],
            'location'  => $_POST['location'],
            'img'       => $_POST['img'],
            'capacity'  => $_POST['capacity'],
            'utility'   => $_POST['utility']
        ];

        $this->newModel->edit($id, $data);

        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }

    public function delRoom()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->newModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__room");
    }


}
