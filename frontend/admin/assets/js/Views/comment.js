function defaultFunc() {
    var divtoNew = document.querySelector('.comment__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_comment() {
        document.querySelector('.comment__list').innerHTML = ''
        fetch('../../backend/index.php?controller=comment')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == '1'
                })
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.new
                    td[1].textContent = item.user
                    td[2].textContent = item.content
                    td[3].textContent = item.date
                    td[4].querySelector('a').href = '../../backend/index.php?controller=comment&action=delCmt&id='+item.id
                    document.querySelector('.comment__list').appendChild(divNew)
                });

                new simpleDatatables.DataTable(document.querySelector('.datatabless'), {
                    perPageSelect: [5, 10, 15, ["All", -1]],
                });
            })
    }

    // thực thi func 
    show_comment()

}

document.addEventListener('DOMContentLoaded', defaultFunc)