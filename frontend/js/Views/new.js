function defaultFunc() {
    var id = new URLSearchParams(window.location.search).get('id')
    fetch('../backend/index.php?controller=new&action=incViews&id=' + id)
    document.querySelector('#form__cmt').action = '../backend/index.php?controller=comment&action=addComment&new_id=' + id
    // hàm hiển thị bài viết nổi bật
    var divtoPopular = document.querySelector('.popular__info').cloneNode(true)
    function show_popular() {
        document.querySelector('.popular__list').innerHTML = ''
        fetch('../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data = data.sort((a, b) => {
                    return b.views - a.views
                }).slice(0, 5)

                data.forEach(item => {
                    var divPopular = divtoPopular.cloneNode(true)
                    divPopular.querySelector('img').src = item.img
                    divPopular.querySelector('.badge').textContent = item.category
                    divPopular.querySelector('.badge').href = 'news.html?cat=' + item.category_id
                    divPopular.querySelector('a.h6').href = 'new.html?id=' + item.id
                    let title = item.title.split(' ').slice(0, 6).join(' ')
                    divPopular.querySelector('a.h6').textContent = title + '...'
                    divPopular.querySelector('a.h6').title = item.title
                    document.querySelector('.popular__list').appendChild(divPopular)
                });
            })
    }

    // hàm hiển thị chi tiết bài viết
    function show_new() {
        document.querySelector('.popular__list').innerHTML = ''
        fetch('../backend/index.php?controller=new&action=findNew&id=' + id)
            .then(response => response.json())
            .then(data => {
                document.querySelector('.new__category').textContent = data.category
                document.querySelector('.new__date').textContent = data.date
                document.querySelector('.new__title').textContent = data.title
                document.querySelector('.new__content').textContent = data.content
                document.querySelector('.new__author').textContent = data.author
                document.querySelector('.new__views').textContent = data.views
                document.querySelector('.new__img').src = data.img
            })
    }

    // hiển thị bình luận
    var divtoCmt = document.querySelector('.cmt__info').cloneNode(true)
    function show_cmt() {
        document.querySelector('.cmt__list').innerHTML = ''
        fetch('../backend/index.php?controller=comment&action=getinNew&id=' + id)
            .then(response => response.json())
            .then(data => {
                document.querySelectorAll('.cmt__quantity').forEach(item=>{
                    item.textContent = data.length
                })
                data.forEach(item=>{
                    var divCmt = divtoCmt .cloneNode(true)
                    divCmt.querySelector('h6 a').textContent=item.user
                    divCmt.querySelector('i').textContent=item.date
                    divCmt.querySelector('p').textContent=item.content
                    document.querySelector('.cmt__list').appendChild(divCmt)
                })
            })
    }

    // thực thi func 
    show_new()
    show_popular()
    show_cmt()

}

document.addEventListener('DOMContentLoaded', defaultFunc)