function defaultFunc() {
    var loginF = new URLSearchParams(window.location.search).get('loginF')
    if (loginF) {
        document.querySelector('#user').value = loginF
        document.querySelector('.loginF').classList.remove('d-none')
        console.log(document.querySelector('.loginF'))
    }    


}

document.addEventListener('DOMContentLoaded', defaultFunc)