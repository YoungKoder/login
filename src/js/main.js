"use strict";

window.onload = function(){
    let btnLogIn = document.querySelector('.login-btn'),
        inputEmail = document.getElementById('email'),
        inputPasw = document.getElementById('password');

    btnLogIn.disabled = true; 

    console.log(inputEmail.value);  
    
}

