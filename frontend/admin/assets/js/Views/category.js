function defaultFunc() {
    var divtoNew = document.querySelector('.category__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_category() {
        document.querySelector('.category__list').innerHTML = ''
        fetch('../../backend/index.php?controller=category')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item => {
                    return item.status == '1'
                })
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].querySelector('a').href = '../../backend/index.php?controller=category&action=delCategory&id=' + item.id
                    document.querySelector('.category__list').appendChild(divNew)
                });

                new simpleDatatables.DataTable(document.querySelector('.datatabless'), {
                    perPageSelect: [5, 10, 15, ["All", -1]],
                });
            })
    }

    // thực thi func 
    show_category()

}

document.addEventListener('DOMContentLoaded', defaultFunc)