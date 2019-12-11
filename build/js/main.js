"use strict";

window.onload = function(){
    
    let inputPaswval;
    let user = {};

    function doesInputExist(){
        if(inputEmail.value ==''||inputPasw.value ==''){
            btnLogIn.disabled = true;
            btnLogIn.classList.add(logBtnDis);
            return false;
        }else{
            btnLogIn.disabled = false;
            btnLogIn.classList.remove(logBtnDis);
        }
    }
    
    function checkForm(){
        for(let i =0; i < inputWrap.length; i++){
            if(inputWrap[i].classList.contains(alertValidate)){
                return false;
            }
            return true;
        }
    }

    function checkInput(a){
        if(inputs[a] == inputPasw){
            inputPaswval = ""+inputPasw.value;
            inputWrap[a].classList.remove(alertValidate);
            if(inputPaswval.length != lengthOfPassword ){
                btnLogIn.disabled = true;
                btnLogIn.classList.add(logBtnDis);
                inputWrap[a].classList.add(alertValidate);
            }
        }
        else if(inputs[a] == inputEmail){
            inputWrap[a].classList.remove(alertValidate);
            if(!inputs[a].value.includes(prefiksEmail)){
                btnLogIn.disabled = true;
                btnLogIn.classList.add(logBtnDis);
                inputWrap[a].classList.add(alertValidate);
            }
        }
    }


    wrapAllInput.addEventListener(eventFocusOut,function(e){
        let selectedInput = e.target;
        if(selectedInput && selectedInput.classList.contains('input')){
            for(let i=0; i < inputs.length;i++){
                if(inputs[i] == selectedInput){
                    checkInput(i);
                }
            }
        }
    });
    
    inputEmail.addEventListener(eventKeyUp,function(){
        doesInputExist();
    });

    inputPasw.addEventListener(eventKeyUp,function(){
        doesInputExist();
    });

    function setUserIntoStorage(user){
        let userStr = JSON.stringify(user);
        localStorage.setItem('user', userStr);
    }
    
    function setUserRole(){
       
        if(inputEmail.value.includes(roleAdmin)){
            localStorage.setItem('role',roleAdmin);
            return;
        }
        localStorage.setItem('role', roleUser);
    }

    form.addEventListener(eventSubmit, function(e){
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
    });

    
}