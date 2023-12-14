function defaultFunc() {
    var signupF = new URLSearchParams(window.location.search).get('signupF')
    if(signupF) alert(`Tên đăng nhập '${signupF}' đã tồn tại`)
    var divtoNew = document.querySelector('.author__info').cloneNode(true)
    // hàm hiển thị bài viết 
    function show_author() {
        document.querySelector('.author__list').innerHTML = ''
        fetch('../../backend/index.php?controller=author')
            .then(response => response.json())
            .then(data => {
                data = data.filter(item=>{
                    return item.status == '1'
                })
                data.forEach(item => {
                    var divNew = divtoNew.cloneNode(true)
                    var td = divNew.querySelectorAll('td')
                    td[0].textContent = item.name
                    td[1].textContent = item.email
                    td[2].textContent = item.user
                    td[3].querySelector('a').href = '../../backend/index.php?controller=author&action=delAuthor&id='+item.id
                    document.querySelector('.author__list').appendChild(divNew)
                });

                new simpleDatatables.DataTable(document.querySelector('.datatabless'), {
                    perPageSelect: [5, 10, 15, ["All", -1]],
                });
            })
    }

    // thực thi func 
    show_author()

}

document.addEventListener('DOMContentLoaded', defaultFunc)