const question = document.getElementById('question') 
const reponse = document.getElementById('reponse')
const card = document.getElementById('card');

const currentIndexHTML = document.getElementById('currentIndexHTML')
const countHTML = document.getElementById('countHTML')

card.addEventListener('click' , ()=>{
    card.classList.toggle('flipp');
})

const nextBtn = document.getElementById('suivant')
const precedent = document.getElementById('precedent')

const selectedCard =JSON.parse(localStorage.getItem('selected')) 
const collections = JSON.parse(localStorage.getItem('collections')) || [];

let cards=[];
let currentIndex = 0;

if(selectedCard){
    const currentCollection = collections.find(coll =>  coll.titre === selectedCard)
    countHTML.textContent = currentCollection.cards.length;
    
    if(currentCollection){
        cards = currentCollection.cards
    }
}


function showCard(i){
    question.textContent = cards[i].question
    reponse.textContent = cards[i].reponse
    
    currentIndexHTML.textContent = currentIndex + 1
    updateBtn()
}
showCard(currentIndex)

nextBtn.addEventListener('click' , ()=>{
    if(currentIndex < cards.length -1){
        currentIndex++;
        showCard(currentIndex)
    }
})

precedent.addEventListener('click' , ()=>{
    if(currentIndex > 0){
        currentIndex--;
        showCard(currentIndex)
    }
})


function updateBtn(){
    if(currentIndex === 0)
        precedent.classList.add('opacity-50', 'cursor-not-allowed');
    else
        precedent.classList.remove('opacity-50', 'cursor-not-allowed');
    
    if(currentIndex=== cards.length-1)
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    else
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
}