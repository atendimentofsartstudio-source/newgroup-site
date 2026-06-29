/* ======================================================
   FS Art Studio
   Login Premium
   ====================================================== */

const form = document.getElementById("loginForm");

const password = document.getElementById("password");

const ACCESS_PASSWORD = "newgroup2026";

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(password.value === ACCESS_PASSWORD){

        document.body.style.transition = ".8s";

        document.body.style.opacity = "0";

        setTimeout(function(){

            window.location.href = "home.html";

        },700);

    }

    else{

        password.style.border = "2px solid #ff4b4b";

        password.value = "";

        password.placeholder = "Senha incorreta";

        password.focus();

    }

});