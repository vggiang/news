<?php

class AuthorController extends BaseController
{
    private $authorModel;

    public function __construct()
    {
        $this->loadModel('AuthorModel');
        $this->authorModel = new AuthorModel;
    }

    public function index()
    {
        $author = $this->authorModel->getAll();

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($author);
    }

    public function findUser()
    {
        $id = $_GET['id'];
        $user = $this->authorModel->findId($id);

        // Trả về dữ liệu dưới dạng JSON
        header('Content-Type: application/json');
        echo json_encode($user);
    }

    public function addUser()
    {
        $data = [
            'email'  => $_POST['email'],
            'name'  => $_POST['name'],
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        if ($this->authorModel->checkuser_name($data['user'])) {
            $this->authorModel->store($data);
            header("Location: ../frontend/login.html?signupT=" . $data['user']);
        } else {
            header("Location: ../frontend/login.html?signupF=" . $data['name']);
        }
    }

    public function editUser()
    {
        $id = $_GET['id'];
        $data = [
            'email'  => $_POST['email'],
            'name'  => $_POST['name']
        ];

        $this->authorModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__user");
    }

    public function delUser()
    {
        $id = $_GET['id'];
        $data = [
            'status' => '0'
        ];
        $this->authorModel->edit($id, $data);
        header("Location: ../frontend/dashboard.html?tab=mgr__user");
    }

    public function login()
    {
        $data = [
            'user'  => $_POST['user'],
            'pass'  => $_POST['pass']
        ];

        $check = $this->authorModel->isValidUser($data);
        if ($check) {
            header("Location: ../frontend/index.html");
        } else {
            header("Location: ../frontend/login.html?loginF=" . $data['user']);
        }
    }

    public function logout()
    {
        setcookie("user_id", "", time() - 3600, "/");
        header("Location: ../frontend/index.html");
    }

}
