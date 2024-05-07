const socket = io();
const jeuxDiv = document.getElementById('jeu');
const gagneDiv = document.getElementById('gagne');
const scoreDiv = document.getElementById('score')
const reactionDiv = document.getElementById('reaction')
const joueursTable = document.getElementById('tableau-joueurs');
const changementnomForm = document.getElementById('changerNomForm');
const pseudoInput = document.getElementById('nomjoueur');
const comboDiv = document.getElementById('combo')
var combo = 0
var clickedTime; 
var createdTime = (Date.now())/1000; 
var reactionTime;

// Gère le click sur une cible
function clickCible(event){
    const numeroCible = event.target.getAttribute('numeroCible');
    console.log(`click sur la cible ${numeroCible}`);
    socket.emit('click-cible', numeroCible);
}

// Sockets
socket.on('initialise', function(nombreCible){
    // Vide jeuDiv
    jeuxDiv.innerHTML = '';
    // Ajoute les cibles
    for(let i = 0; i< nombreCible; i++){
        const cible = document.createElement('div');
        // Ajout de la classe .cible
        cible.classList.add('cible');
        // Ajoute l'attribut 'numeroCible' à la cible
        cible.setAttribute('numeroCible', i);
        jeuxDiv.append(cible)
        // Ecoute le click sur la cible
        cible.addEventListener('click', clickCible)
    }
});

socket.on('nouvelle-cible', function(numeroCible){
    // Enlève la classe clickme à l'ancienne cible
    const ancienneCible=document.querySelector('.clickme');
    if (gagneDiv.textContent == ""){
        combo = 0;
    }
    // Attetion, à l'initialisation, ancienneCible n'existe pas!
    if ( ancienneCible ) {
        ancienneCible.classList.remove('clickme');
    }

    // Ajoute la classe clickme à la nouvelle cible
    const cible = document.querySelector(`[numeroCible="${numeroCible}"]`);

    cible.classList.add('clickme');
    
    
    // Vide gagneDiv
    gagneDiv.textContent = "";
    //remet à 0 le compteur de combo
    comboDiv.textContent = 0;
});

//socket.on('gagne', function(getScoreJoueur){

socket.on('combo', function(){
    combo++
    comboDiv.textContent = combo;
})

socket.on('gagne', function(getScoreJoueur){
    gagneDiv.textContent = "Gagné!";
    joueur.score += 1;
    clickedTime=(Date.now())/1000;
    reactionTime = clickedTime-createdTime;
				
	reactionDiv.textContent = "Your Reaction Time is: " + reactionTime + " seconds";
    createdTime = clickedTime
});


socket.on('maj-joueurs',function (joueurs){
    joueursTable.innerHTML = '';
    for(const joueur of joueurs){
        const ligne = joueursTable.insertRow();
        let nomTd = ligne.insertCell();
        nomTd.textContent = joueur.nom;
        let scoreTd = ligne.insertCell();
        scoreTd.textContent = joueur.score;
        scoreDiv.textContent = `Votre score est de ${joueur.score}`;
    }
});

changementnomForm.addEventListener('submit', function(event){
    event.preventDefault();
    socket.emit('nom-joueur', pseudoInput.value);
})