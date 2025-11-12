//lire les valeurs
const mySelect = document.getElementById('mySelect');
const createbtn = document.getElementById('create');
const collectionsDiv = document.getElementById('collectionsDiv');

let collections = [];

if(localStorage.getItem('collections')){
    collections = JSON.parse(localStorage.getItem('collections'))
    collections.forEach(coll =>{
        addOption(coll.titre);
    });
}

function createCollection(){
    const titre = document.getElementById('titre-collection').value;
    const collection = {titre : titre , card:[]}
    console.log('lwla');
    collections.push(collection);
    localStorage.setItem('collections',JSON.stringify(collections));
    addOption(titre)
    document.getElementById('titre-collection').value = ""
} 

function addOption(titre){
    const option = document.createElement('option');
    option.value = titre;
    option.textContent = titre;
    
    mySelect.appendChild(option)
    console.log('zawja' ,titre)
    afficherCollection(titre)
}

function afficherCollection(titre){
    const p = document.getElementById('p')
    if(p)p.remove();
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
        <a href="flash-cards.html">
            <div class="border-2 p-4 rounded-lg border-gray-400 hover:border-gray-500 duration-200">
                <h2 class="text-lg text-blue-900 font-bold">${titre}</h2>
                <h3 class="text-gray-500"><span>0</span> carte</h3>
            </div>
        </a>`
    collectionsDiv.appendChild(newDiv)
    console.log('affichage')
}

createbtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    createCollection()
    console.log('talta')
})
