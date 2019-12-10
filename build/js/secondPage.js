"use strict";

window.onload = function(){
    showArticle();
    chooseUser();
    let btnAdding = document.getElementsByClassName("btn-addNew")[0],
        overlay = document.querySelector(".overlay"),
        popupClose = document.querySelector(".popup-close"),
        popupSave = document.querySelector(".btn-articleSave"),
        article = document.querySelector(".article"),
        articleHeader = document.querySelector(".article-header"),
        articleContent = document.querySelector(".article-content"),
        articlePopupHeader = document.querySelector(".popup-article-header"),
        articlePopupContent = document.querySelector(".popup-article-content");
    // let countOfArticles = [];
    btnAdding.addEventListener('click',function(){
        overlay.style.display = 'flex';
    });

    function chooseUser(){
        let role = localStorage.getItem('role');
        if(role == 'user'){
            debugger
            btnAdding.style.display = 'none';
            let articleActions = document.getElementsByClassName('article-action');
            articleActions.forEach(e => {
                e.style.display = 'none';
            });
        }
    }

    
    popupClose.addEventListener('click',function(){
        overlay.style.display = 'none';
    });

    function createArticle(){
        article.classList.add("article--show");
        articleHeader.innerHTML = ""+articlePopupHeader.value;
        articleContent.innerHTML = ""+articlePopupContent.value;
    }
    function showArticle() {
        let lenghtArticles = +localStorage.getItem('articles');
        let articlesData = [];
        for (let i = 0; i < lenghtArticles; i++) {
            articlesData.push(JSON.parse(localStorage.getItem('article'+i)));         
        }
        let articlesHtmlContent = document.getElementById('articles');
        articlesHtmlContent.innerHTML = '';
       for (let i = 0; i < articlesData.length; i++) {
       
        let articleItemHtmlContent = document.createElement('div');
        articleItemHtmlContent.classList = 'article';

        let articleItemHeader = document.createElement('h3');
        articleItemHeader.classList = 'article-header';
        articleItemHeader.textContent = articlesData[i].title;
        
         let articleItemConten = document.createElement('p');
         articleItemConten.classList = 'article-content';
         articleItemConten.textContent = articlesData[i].content;

         let articleItemControle = document.createElement('div');
         articleItemControle.classList = 'article-action admin';
         let articleItemIcon =  document.createElement('i');
         articleItemIcon.classList = 'icon icon-pen';
         let articleItemIconDelete =  document.createElement('i');
         articleItemIconDelete.classList = 'icon icon-deleteArticle';
        articleItemControle.appendChild(articleItemIcon);
        articleItemControle.appendChild(articleItemIconDelete);

        articleItemHtmlContent.appendChild(articleItemHeader);
        articleItemHtmlContent.appendChild(articleItemConten);
        articleItemHtmlContent.appendChild(articleItemControle);
        
        articlesHtmlContent.appendChild(articleItemHtmlContent);
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
            let counter = localStorage.getItem('counter');
            savingDataOfArticle();
            createArticle();
            
            articlePopupContent.value = "";
            articlePopupHeader.value ="";
            overlay.style.display = 'none';
        }
        
    });


}