//actions when page loads
const aboutSectionIndex = document.getElementsByClassName('about-section__sections-index__index')
const aboutSections = document.getElementsByClassName('about-section__section')

window.onload = function actionsOnLoad(){
    //set first index of about section
    for (var i = 0; i < aboutSectionIndex.length; i++){
        if (aboutSectionIndex[i].classList.contains('selected-index')){
            aboutSectionIndex[i].classList.remove('selected-index')
        }
        if (i == 0){
            aboutSectionIndex[i].classList.add('selected-index')
        }
    }
}

//change sidebar state
const sideBar = document.querySelector('.hero-section__sidebar')
const sideBarButton = document.querySelector('.hero-section__menu-button')
const screenSaver = document.querySelector('.hero-section__screen-saver')

function setSideBarState(){
    if (sideBarButton.classList.contains('opened') == false){
        screenSaver.style.display = 'block'
        sideBar.classList.add('opened')
        sideBarButton.classList.add('semi-opened')
        function endProcess(){
            sideBarButton.classList.add('opened')
        }
        setTimeout(endProcess, 250)
    }else{ 
        sideBar.classList.remove('opened')
        if (sideBarButton.classList.contains('opened')){
            sideBarButton.classList.remove('opened')
        }
        function endProcess(){
            if (sideBarButton.classList.contains('semi-opened')){
                sideBarButton.classList.remove('semi-opened')
            }
        }
        setTimeout(endProcess, 250)
        screenSaver.style.display = 'none'
    }
}

//actions when scrolls
window.onscroll = function actionsWhenScrolling(){
    if (sideBar.classList.contains('opened')){
        setSideBarState()
    }
}

//about section "slide"
function changeAboutSection(currentSlideButton){
    //identifie current section by index(remove this index)
    let currentIndex = undefined
    for (var i = 0; i < aboutSectionIndex.length && currentIndex == undefined; i++){
        if (aboutSectionIndex[i].classList.contains('selected-index')){
            currentIndex = i
            aboutSectionIndex[i].classList.remove('selected-index')
        }
    }
    //set new index
    if (currentSlideButton.classList.contains('about-section__sections-button-forward')){
        if (currentIndex == aboutSectionIndex.length - 1){
            aboutSectionIndex[0].classList.add('selected-index')
        }else{
            aboutSectionIndex[currentIndex + 1].classList.add('selected-index')
        }
    }else if (currentSlideButton.classList.contains('about-section__sections-button-back')){
        if (currentIndex == 0){
            aboutSectionIndex[aboutSectionIndex.length - 1].classList.add('selected-index')
        }else{
            aboutSectionIndex[currentIndex - 1].classList.add('selected-index')
        }
    }
    //get correct position
    let correctPosition = undefined
    for (var i = 0; i < aboutSectionIndex.length && correctPosition == undefined; i++){
        if (aboutSectionIndex[i].classList.contains('selected-index')){
            correctPosition = i
        }
    }
    //reset sections positions
    for (var i = 0; i < aboutSections.length; i++){
        if (aboutSections[i].classList.contains('current-about-section')){
            aboutSections[i].classList.remove('current-about-section')
        }
    }
    //set correct section
    if (correctPosition == 0){
        aboutSections[0].style.right = '0px'
        aboutSections[1].style.right = '-100vw'
        aboutSections[2].style.right = '100vw'
    }
    if (correctPosition == 1){
        aboutSections[0].style.right = '100vw'
        aboutSections[1].style.right = '0px'
        aboutSections[2].style.right = '-100vw'
    }
    if (correctPosition == 2){
        aboutSections[0].style.right = '-100vw'
        aboutSections[1].style.right = '100vw'
        aboutSections[2].style.right = '0px'
    }
    /*for (var i = 0; i < aboutSections.length; i++){
        if (i == correctPosition){
            aboutSections[i].classList.add('current-about-section')
        }
    }*/
}