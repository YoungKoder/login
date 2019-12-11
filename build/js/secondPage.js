"use strict";

window.onload = function(){
    let articlesData = localStorage.getItem('articlesArr') ? JSON.parse(localStorage.getItem
        ('articlesArr')):[];
        // console.log(articlesData);

    showArticle();
    
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
            const deleteArticleBtn = document.querySelector('.icon-deleteArticle');
            deleteArticleBtn.addEventListener('click',deleteArticle);

        }
    }

    function savingDataOfArticle(){
        let article = {};
        let i = articlesData.length;

        article.id = i;
        article.title = ""+articlePopupHeader.value;
        article.content = ""+articlePopupContent.value;
        
        localStorage.setItem('article'+article.id, JSON.stringify(article));
        articlesData.push(JSON.parse(localStorage.getItem('article'+i)));
    }
    // function 
    function savingOnSave(){
        if(articlePopupHeader.value =='' || articlePopupContent.value ==''){
            overlay.style.display = 'none';
        }else{
            savingDataOfArticle();
            showArticle();
            
            articlePopupContent.value = "";
            articlePopupHeader.value ="";
            overlay.style.display = 'none';
        }
    }

    popupSave.addEventListener('click',savingOnSave);
    
    let article = document.querySelector(".article");

    let editID;

    function findIndexChoosenElement(id){
        return articlesData.findIndex(x => x.id == id);
    }
    
    function editArticle(){
        const editBtn = this;
        const parentOfEditBtn = editBtn.closest('.article');
        const idParent = parentOfEditBtn.dataset.id;

        popupSaveEdit.style.display = "block";
        popupSave.style.display = "none";

        let Id = findIndexChoosenElement(idPArent);


        articlePopupHeader.value = articlesData[Id].title;
        articlePopupContent.value = articlesData[Id].content;

        overlay.style.display = 'flex';

        editID = Id;
    }

    popupSaveEdit.addEventListener('click',function(){
        articlesData[editID].title = articlePopupHeader.value;
        articlesData[editID].content = articlePopupContent.value;
        localStorage.setItem('articlesArr',JSON.stringify(articlesData));

        showArticle();
    });

    function deleteArticle(){
        const editBtn = this;
        const parentOfEditBtn = editBtn.closest('.article');
        const idParent = parentOfEditBtn.dataset.id;

        let Id = findIndexChoosenElement(idParent);
        
        console.log(Id);
        articlesData.splice(Id,1);

        localStorage.setItem('articlesArr',JSON.stringify(articlesData));

        showArticle();


    }
}