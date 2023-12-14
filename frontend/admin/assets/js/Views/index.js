function defaultFunc() {
    var divtoNew = document.querySelector('.news__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_news() {
        document.querySelector('.news__list').innerHTML = ''
        fetch('../../backend/index.php?controller=new')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item => {
                    return item.status == '1'
                })
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].querySelector('a').textContent = item.title
                    td[0].querySelector('a').href = '../new.html?id=' + item.id
                    td[1].textContent = item.author
                    td[2].textContent = item.category
                    td[3].textContent = item.date
                    td[4].querySelector('a.delete').href = '../../backend/index.php?controller=new&action=delNew&id=' + item.id
                    td[4].querySelector('a.edit').href = 'news_edit.html?edit=' + item.id
                    document.querySelector('.news__list').appendChild(divNew)
                });

                new simpleDatatables.DataTable(document.querySelector('.datatable'), {
                    perPageSelect: [5, 10, 15, ["All", -1]],
                    columns: [{
                        select: 2,
                        sortSequence: ["desc", "asc"]
                    },
                    {
                        select: 3,
                        sortSequence: ["desc"]
                    },
                    {
                        select: 4,
                        cellClass: "green",
                        headerClass: "red"
                    }
                    ]
                });
            })
    }

    // thực thi func 
    show_news()

}

document.addEventListener('DOMContentLoaded', defaultFunc)