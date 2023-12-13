function defaultFunc() {
    var divtoNew = document.querySelector('.author__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_author() {
        document.querySelector('.author__list').innerHTML = ''
        fetch('../../backend/index.php?controller=author')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].textContent = item.email
                    td[2].textContent = item.user
                    document.querySelector('.author__list').appendChild(divNew)
                });
            })
    }

    // thực thi func 
    show_author()

}

document.addEventListener('DOMContentLoaded', defaultFunc)