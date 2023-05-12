function renderUser(user) { //render active user
    let str = `<h6> ${user.firstName} ${user.lastName}</h6>`;
    str += `<span> ${user.position}</span>`;
    document.getElementById("user_ph1").innerHTML += str;
    str = `<span>שלום, ${user.firstName}</span>`;
    document.getElementById("user_ph2").innerHTML += str;
}


function clearStorage() {
    sessionStorage.clear();
}


function reload() {
    var item = sessionStorage.getItem('Id');
    if (item !== null) {
        sessionStorage.removeItem('Id');
        location.reload();
    }
}