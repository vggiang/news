function defaultFunc() {
    var cat = new URLSearchParams(window.location.search).get('cat')
    var query = new URLSearchParams(window.location.search).get('q')
    var divtoNew = document.querySelector('.news__info').cloneNode(true)
    var divtoPopular = document.querySelector('.popular__info').cloneNode(true)

    // hàm hiển thị bài viết 
    function show_news() {
        document.querySelector('.news__list').innerHTML = ''
        document.querySelector('.popular__list').innerHTML = ''
        fetch('../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data = data.sort((a, b) => {
                    return b.views - a.views
                })
                if (cat) {
                    data = data.filter(item => {
                        return item.category_id == cat
                    })
                }
                if (query) {
                    data = data.filter(item => {
                        
                        return item.title.toLowerCase().includes(query.toLowerCase())
                    })
                }
                data.forEach((item, index) => {
                    var divNew = divtoNew.cloneNode(true)
                    divNew.querySelector('a.d-block').textContent = item.title
                    divNew.querySelector('a.d-block').href += item.id
                    divNew.querySelector('small.views span').textContent = item.views
                    divNew.querySelector('img').src = item.img
                    divNew.querySelector('a.date small').textContent = item.date
                    divNew.querySelector('.author').textContent = item.author
                    divNew.querySelector('.badge').textContent = item.category
                    divNew.querySelector('.badge').href += item.category_id
                    document.querySelector('.news__list').appendChild(divNew)

                    if (index < 4) {
                        var divPopular = divtoPopular.cloneNode(true)
                        divPopular.querySelector('img').src = item.img
                        divPopular.querySelector('.badge').textContent = item.category
                        divPopular.querySelector('.badge').href = 'news.html?cat='+item.category_id
                        divPopular.querySelector('a.h6').href = 'new.html?id='+item.id
                        let title = item.title.split(' ').slice(0, 6).join(' ')
                        divPopular.querySelector('a.h6').textContent = title + '...'
                        divPopular.querySelector('a.h6').title = item.title
                        document.querySelector('.popular__list').appendChild(divPopular)
                    }
                });
            })
    }

    // thực thi func 
    show_news()

}

document.addEventListener('DOMContentLoaded', defaultFunc)