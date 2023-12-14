document.addEventListener('DOMContentLoaded', () => {
    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return null;
    }


    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('.header').innerHTML = div.querySelector('.header').innerHTML
            document.querySelector('.topbar').innerHTML = div.querySelector('.topbar').innerHTML
            document.querySelector('footer').innerHTML = div.querySelector('footer').innerHTML

            if(getCookie('user_id')) {
                document.querySelector('.nav__login').classList.add('d-none')
                document.querySelector('.nav__name').classList.remove('d-none')
                document.querySelector('.nav__logout').classList.remove('d-none')
                fetch('../backend/index.php?controller=user&action=findUser&id='+getCookie('user_id'))
                .then(response=>response.json())
                .then(name=>{
                    document.querySelector('.nav__name span').textContent = name.name
                })
            }
            fetch('../backend/index.php?controller=category')
                    .then(response => response.json())
                    .then(data => {
                        data = data.filter(item=>{
                            return item.status == '1'
                        })
                        var a1 = document.querySelector('.nav__category1 a').cloneNode(true)
                        document.querySelector('.nav__category1 a').remove()
                        data.forEach(item => {
                            var a = document.createElement('a')
                            let a_1 = a1.cloneNode(true)
                            a.classList.add('dropdown-item', 'nav__menu')
                            a.textContent = item.name
                            a.href = 'news.html?cat=' + item.id
                            document.querySelector('.nav__category').appendChild(a)
                            a_1.textContent = item.name
                            a_1.href = 'news.html?cat=' + item.id
                            document.querySelector('.nav__category1').appendChild(a_1)
                        });

                        if (window.location.href.includes('/news.html')) {
                            var cat = new URLSearchParams(window.location.search).get('cat')
                            if (cat) document.querySelector('h4.cat__title').textContent = 'Danh muc: ' + document.querySelector(`.nav__category1 a[href="news.html?cat=${cat}"]`).textContent

                            // // hàm tìm kiếm nội dung 
                            // document.querySelector('input.search_nav').addEventListener('input', () => {
                            //     document.querySelectorAll('.news__info').forEach(item => {
                            //         console.log(item.querySelector('h4.d-block'))
                            //         if (item.querySelector('h4.d-block').textContent.toLowerCase().includes(document.querySelector('.search__nav').value.toLowerCase())) {
                            //             item.classList.remove('d-none')
                            //         } else {
                            //             item.classList.add('d-none')
                            //         }
                            //     })
                            // })
                        }
                    })
            if (window.location.href.includes('/index.html')) document.querySelector('a[href="index.html"].nav__menu').classList.add('active')
        })
})