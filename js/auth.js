function login(){
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if(user === "admin" && pass === "veritas2026"){
        window.location.href = "app.html";
    } else {
        alert("Acceso denegado.");
    }
}
