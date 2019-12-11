"use strict";

window.onload = function(){
    let articlesData = [];
    showArticle();
    // let countOfArticles = [];

    btnAdding.addEventListener(eventClick ,function(){
        overlay.style.display = dsFlex;
    });

    function chooseUser(){
        let role = localStorage.getItem('role'),
        articleActions = document.querySelectorAll('.article-action');

        if(role == 'user'){
            btnAdding.style.display = dsNone;
            
            for (let i=0; i<articleActions.length;i++){
                articleActions[i].style.display = dsNone;
            }
        }
    }

    chooseUser();
    
    popupClose.addEventListener(eventClick,function(){
        overlay.style.display = dsNone;
    });

    function showArticle() {
        let lenghtArticles = +localStorage.getItem('articles');
        articlesData = [];
        for (let i = 0; i < lenghtArticles; i++) {
            articlesData.push(JSON.parse(localStorage.getItem('article'+i)));         
        }
        
        let allArticles = document.querySelector("#articles");
        allArticles.innerHTML = '';
        
       for (let i = 0; i < articlesData.length; i++) {

        const articleLAyout = 
        `
        <div class="article" data-id="${articlesData[i].id}">
            <h1 class="article-header">${articlesData[i].title}</h1>
            <p class="article-content">${articlesData[i].content}</p>
                <div class="article-action admin">
                    <i class="icon icon-pen"></i>
                    <i class="icon icon-deleteArticle"></i>
                </div>
        </div>
        `;

        allArticles.insertAdjacentHTML('afterbegin',articleLAyout);
        localStorage.setItem('articlesArr',JSON.stringify(articlesData));

        const editArticleBtn = document.querySelector('.icon-pen');
        editArticleBtn.addEventListener('click',editArticle);

       }
    }

    function savingDataOfArticle(){
        let article = {};
        let lastIdItem = +localStorage.getItem('articles');

        article.id = ""+lastIdItem;
        article.title = ""+articlePopupHeader.value;
        article.content = ""+articlePopupContent.value;

        lastIdItem++;

        localStorage.setItem('articles',lastIdItem);
        localStorage.setItem('article'+article.id, JSON.stringify(article));
       
    }
    popupSave.addEventListener('click',function(){
        
        if(articlePopupHeader.value =='' || articlePopupContent.value ==''){
            overlay.style.display = 'none';
        }else{
            savingDataOfArticle();
            showArticle();
            
            articlePopupContent.value = "";
            articlePopupHeader.value ="";
            overlay.style.display = 'none';
            
        }
        
    });
    
    let article = document.querySelector(".article");

    function editArticle(){
        debugger
        const editBtn = this;
        const parentOfEditBtn = editBtn.closest('.article');
        const idParent = parentOfEditBtn.dataset.id;
        for(let i=0;i<articlesData.length;i++){
            if(articlesData[i].id == idParent){
                overlay.style.display = 'flex';

                articlePopupHeader.value = articlesData[i].title;
                articlePopupContent.value = articlesData[i].content;

                articlesData[i].title = articlePopupHeader.value;
                articlesData[i].content = articlePopupContent.value;
                articlesData[i].id = idParent;
                
                showArticle();
                // localStorage.setItem('articlesArr',JSON.stringify(articlesData));
                // localStorage.setItem('');
            }
        }
        // console.log(editBtn);
        


    }
    // article.addEventListener('click',function(e){
    //     let choosenElement = e.target;
    //     console.log(choosenElement);
    //     let parentOfChEl = choosenElement.closest('.article');
    //     console.log(parentOfChEl);
    //     let idPArentOfChEl = parentOfChEl.dataset.id;
    //     if(choosenElement == articleActionsModify){
    //         for(let i=0;i<articlesData.length;i++){
    //             if(articlesData[i].id == idPArentOfChEl){
    //                 overlay.style.display = 'flex';
    //                 articlePopupHeader.value = articlesData[i].title;
    //                 articlePopupContent.value = articlesData[i].content;
    //                 // localStorage.setItem('');
    //             }
    //         }
    //     }
    // });

}