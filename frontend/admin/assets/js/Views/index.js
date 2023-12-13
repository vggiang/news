function defaultFunc() {
    var divtoNew = document.querySelector('.news__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_news() {
        document.querySelector('.news__list').innerHTML = ''
        fetch('../../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].querySelector('a').textContent = item.title
                    td[1].textContent = item.author
                    td[2].textContent = item.category
                    td[3].textContent = item.date
                    document.querySelector('.news__list').appendChild(divNew)
                });
            })
    }

    // thực thi func 
    show_news()

}

document.addEventListener('DOMContentLoaded', defaultFunc)