document.addEventListener('DOMContentLoaded', () => {
    fetch('layout.html')
        .then(response => response.text())
        .then(data => {
            var div = document.createElement('div')
            div.innerHTML = data
            document.querySelector('.header').innerHTML = div.querySelector('.header').innerHTML
            document.querySelector('.topbar').innerHTML = div.querySelector('.topbar').innerHTML
        })
})