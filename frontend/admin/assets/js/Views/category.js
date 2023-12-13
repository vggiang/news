function defaultFunc() {
    var divtoNew = document.querySelector('.category__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_category() {
        document.querySelector('.category__list').innerHTML = ''
        fetch('../../backend/index.php?controller=category')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.name
                    document.querySelector('.category__list').appendChild(divNew)
                });
            })
    }

    // thực thi func 
    show_category()

}

document.addEventListener('DOMContentLoaded', defaultFunc)