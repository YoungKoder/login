"use strict";

window.onload = function(){
    let articlesData = [];
    showArticle();
    
    let btnAdding = document.querySelector(".btn-addNew"),
        overlay = document.querySelector(".overlay"),
        popupClose = document.querySelector(".popup-close"),
        popupSave = document.querySelector(".btn-articleSave"),
        article = document.querySelector(".article"),
        articles = document.querySelectorAll("#articles"),
        articleActions = document.querySelectorAll('.article-action'),
        articleActionsModify = document.querySelector('.icon-pen'),
        articleActionsDelete = document.querySelector('.icon-deleteArticle'),
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
            // debugger
            btnAdding.style.display = 'none';
            
            for (let i=0; i<articleActions.length;i++){
                articleActions[i].style.display = 'none';
            }
        }
    }
    chooseUser();
    
    popupClose.addEventListener('click',function(){
        overlay.style.display = 'none';
    });

    function showArticle() {
        debugger
        let lenghtArticles = +localStorage.getItem('articles');
        articlesData = [];
        for (let i = 0; i < lenghtArticles; i++) {
            articlesData.push(JSON.parse(localStorage.getItem('article'+i)));         
        }
        let articlesHtmlContent = document.getElementById('articles');
        articlesHtmlContent.innerHTML = '';
        
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
        `

        let allArticles = document.querySelector("#articles");
        allArticles.insertAdjacentHTML('afterbegin',articleLAyout);
        
        localStorage.setItem('articlesArr',JSON.stringify(articlesData));

        // let articleItemHtmlContent = document.createElement('div');
        // articleItemHtmlContent.classList = 'article';

        
        // let articleItemHeader = document.createElement('h3');
        // articleItemHeader.classList = 'article-header';
        // articleItemHeader.textContent = articlesData[i].title;
        
        //  let articleItemConten = document.createElement('p');
        //  articleItemConten.classList = 'article-content';
        //  articleItemConten.textContent = articlesData[i].content;

        //  let articleItemControle = document.createElement('div');
        //  articleItemControle.classList = 'article-action admin';
        //  let articleItemIcon =  document.createElement('i');
        //  articleItemIcon.classList = 'icon icon-pen';
        //  let articleItemIconDelete =  document.createElement('i');
        //  articleItemIconDelete.classList = 'icon icon-deleteArticle';
        // articleItemControle.appendChild(articleItemIcon);
        // articleItemControle.appendChild(articleItemIconDelete);

        // articleItemHtmlContent.appendChild(articleItemHeader);
        // articleItemHtmlContent.appendChild(articleItemConten);
        // articleItemHtmlContent.appendChild(articleItemControle);
        
        // articlesHtmlContent.appendChild(articleItemHtmlContent);
       }
    }

    // function fillArticle(){
    //     article.classList.add("article--show");
    //     articleHeader.innerHTML = ""+articlePopupHeader.value;
    //     articleContent.innerHTML = ""+articlePopupContent.value;
    // }

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
            // let counter = localStorage.getItem('counter');
            // debugger
            savingDataOfArticle();
            showArticle();
            // fillArticle();
            
            
            articlePopupContent.value = "";
            articlePopupHeader.value ="";
            overlay.style.display = 'none';
            
        }
        
    });

    // article.addEventListener('click',function(e){
    //     // debugger
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
    //                 localStorage.setItem('')
    //             }
    //         }
    //     }
        
        
        
    // })

}