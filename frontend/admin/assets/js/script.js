document.addEventListener('DOMContentLoaded', () => {
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('#header').innerHTML = div.querySelector('#header').innerHTML
            document.querySelector('#sidebar').innerHTML = div.querySelector('#sidebar').innerHTML

            // if (window.location.href == 'index') {
            //     document.querySelector('#sidebar .news__nav').classList.add('show')
            // }
        })
})