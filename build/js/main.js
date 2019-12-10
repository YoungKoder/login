"use strict";

window.onload = function(){
    let form = document.querySelector('.form'),
        btnLogIn = document.querySelector('.login-btn'),
        wrapAllInput = document.querySelectorAll('.wrapAllInputs')[0],
        inputs = document.querySelectorAll('.input'),
        inputWrap = document.querySelectorAll('.wrap-input'),
        inputEmail = document.getElementById('email'),
        inputPasw = document.getElementById('password'),
        inputPaswval;
    let user = {};

    function doesInputExist(){
        if(inputEmail.value ==''||inputPasw.value ==''){
            btnLogIn.disabled = true;
            btnLogIn.classList.add('login-btn--disabled');
            return false;
        }else{
            btnLogIn.disabled = false;
            btnLogIn.classList.remove('login-btn--disabled');
        }
    }
    
    function checkForm(){
        for(let i =0; i < inputWrap.length; i++){
            if(inputWrap[i].classList.contains("alertValidate")){
                return false;
            }
            return true;
        }
    }

    function checkInput(a){
        if(inputs[a] == inputPasw){
            inputPaswval = ""+inputPasw.value;
            inputWrap[a].classList.remove("alertValidate");
            if(inputPaswval.length != 8 ){
                btnLogIn.disabled = true;
                btnLogIn.classList.add('login-btn--disabled');
                inputWrap[a].classList.add("alertValidate");
            }
        }
        else if(inputs[a] == inputEmail){
            inputWrap[a].classList.remove("alertValidate");
            if(!inputs[a].value.includes('@email.com')){
                btnLogIn.disabled = true;
                btnLogIn.classList.add('login-btn--disabled');
                inputWrap[a].classList.add("alertValidate");
            }
        }
    }


    wrapAllInput.addEventListener('focusout',function(e){
        let selectedInput = e.target;
        if(selectedInput && selectedInput.classList.contains('input')){
            for(let i=0; i < inputs.length;i++){
                if(inputs[i] == selectedInput){
                    checkInput(i);
                }
            }
        }
    })
    
    inputEmail.addEventListener('keyup',function(){
        doesInputExist();
    })

    inputPasw.addEventListener('keyup',function(){
        doesInputExist();
    })

    function setUserIntoStorage(user){
        let userStr = JSON.stringify(user);
        localStorage.setItem('user', userStr);
    }
    
    function setUserRole(){
       
        if(inputEmail.value.includes('admin')){
            localStorage.setItem('role','admin');
            return;
        }
        localStorage.setItem('role','user');
    }
    form.addEventListener('submit', function(e){
        let check = checkForm();
        if(check){
            user.email = "" + inputEmail.value;
            user.password = "" + inputPasw.value;
            setUserIntoStorage(user);
            setUserRole();
            return;
        }
        if (!check) {
            e.defaultPrevented();
        }
    })

    
}