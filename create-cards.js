//lire les valeurs
const mySelect = document.getElementById('mySelect');
const createCollectionbtn = document.getElementById('create');
const collectionsDiv = document.getElementById('collectionsDiv');
const createCarteBtn = document.getElementById('ajouter');


let collections = [];

if(localStorage.getItem('collections')){
    collections = JSON.parse(localStorage.getItem('collections'))
    collections.forEach(coll =>{
        addOption(coll.titre);
    });
    afficherCount()
}

function createCollection(){
    const titre = document.getElementById('titre-collection').value;
    
    if(!titre){
        alert("Veuillez entrer un titre de collection !");
        return;
    }
    
    if(collections.some(coll => coll.titre === titre)){
        alert(`Collection " ${titre} " existe deja ! `);
        return
    }
    const collection = {titre : titre , cards : []}
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
    afficherCollection(titre)
}

function afficherCollection(titre){
    const p = document.getElementById('p')
    if(p)p.remove();
    const newDiv = document.createElement('div');
    const aId = `link-${titre.replace(/\s+/g , '-')}`
    newDiv.innerHTML = `
        <a id="${aId}" href="flash-cards.html">
            <div class="border-2 p-4 rounded-lg border-gray-400 hover:border-gray-500 duration-200">
                <h2 class="text-lg text-blue-900 font-bold">${titre}</h2>
                <h3 class="text-gray-500"><span id="count-${titre}">0</span> carte</h3>
            </div>
        </a>`
        collectionsDiv.appendChild(newDiv)
        const id = document.getElementById(aId)
        console.log(id)
}

createCollectionbtn.addEventListener('click' , (e)=>{
    e.preventDefault()
    createCollection()
})

function showError(msg){
    const resultError = document.getElementById('result');
    resultError.innerHTML = `<p class="ml-2 mb-2 text-red-600">${msg}</p>`;
}

createCarteBtn.addEventListener('click' , (e)=>{
    e.preventDefault()

    const question = document.getElementById('question').value;
    const reponse = document.getElementById('reponse').value;

    if(mySelect.value === "null" || reponse === "" || question === ""){
        showError("⚠️ Veuillez remplir tous les camps .");
        return;
    }else{
        showError("")

        const selectedcoll = collections.find(coll => coll.titre === mySelect.value)
        selectedcoll.cards.push({question,reponse})
        localStorage.setItem('collections',JSON.stringify(collections))
        
        document.getElementById('question').value = ""
        document.getElementById('reponse').value = ""
        document.getElementById('mySelect').value = "null"
        
        const countcards = document.getElementById(`count-${selectedcoll.titre}`)
        countcards.textContent = selectedcoll.cards.length;
    }
}) 

function afficherCount(){
    collections.forEach(coll=>{
        const countspan = document.getElementById(`count-${coll.titre}`)
        if(countspan){
            countspan.textContent = coll.cards.length
        }
    })
}