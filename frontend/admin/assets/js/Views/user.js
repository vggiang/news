function defaultFunc() {
    var divtoNew = document.querySelector('.user__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_user() {
        document.querySelector('.user__list').innerHTML = ''
        fetch('../../backend/index.php?controller=user')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].textContent = item.email
                    td[2].textContent = item.user
                    document.querySelector('.user__list').appendChild(divNew)
                });
            })
    }

    // thực thi func 
    show_user()

}

document.addEventListener('DOMContentLoaded', defaultFunc)