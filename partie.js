/**
 * Classe représentant une partie de clickme.
 * ┌──────────────────┐
 * │    Partie        │
 * ├──────────────────┤
 * │ - nombreCible    │
 * │ - numeroCible    │
 * │ - joueurs        │
 * ├──────────────────┤
 * │ + nouvelleCible  │
 * │ + nouveauJoueur  │
 * │ + supprimeJoueur │
 * │ + getJoueurById  │
 * └──────────────────┘
 */

export class Partie {
    constructor(){
        this.nombreCibles = 16;
        this.numeroCible;
        this.joueurs = [];
        this.nouvelleCible();
    }

    /**
     * Choisit une nouvelle cible au hasard.
     * Modifie this.numeroCible.
     */
    nouvelleCible(){
        this.numeroCible = Math.floor(Math.random() * this.nombreCibles);
    }

    /**
    * Ajoute un joueur à la partie.
    * Le nom du joueur est 'joueur-n' ou n est le nombre de joueurs.
    * @param {string} socketId - socketId du nouveau joueur.
    */
    nouveauJoueur(socketId){
        const joueur = new Joueur(socketId, `joueur-${this.joueurs.length}`);
        this.joueurs.push(joueur);
    }

    /**
     * Supprime un joueur de la partie.
     * @param {string} socketId - socketId du joueur à supprimer
     */
    supprimeJoueur(socketId){
        this.joueurs = this.joueurs.filter(joueur => joueur.socketId != socketId);
    }

    /**
     * Retourne le joueur dont le socketId correspond à l'argument.
     * @param {string} socketId - socketId du joueur à trouver.
     * @returns {Joueur} - le joueur ayant le socketId correspondant.
     */
    getJoueurById(socketId){
        return this.joueurs.find((joueur) => joueur.socketId == socketId);
    }


    /**
     * Retourne le score du joueur par rapport à l'id du socket
     * @param {string} socketId 
     */
    getScoreJoueur(socketId){
        let joueur = this.getJoueurById(socketId);
        return joueur.score;
    }
    
    /**
     * Retourne le combo d'un joueur par rapport à l'id du socket
     * @param {string} socketId 
     */
    getComboJoueur(socketId){
        let joueur = this.getJoueurById(socketId);
        return joueur.combo;
    }

    /**
     * Retourne un joueur par rapport à l'id du socket
     * @param {string} socketId 
     * @returns 
     */
    getJoueur(socketId){
        let joueur = this.getJoueurById(socketId);
        return joueur.nom
    }

    /**
     * Un joueur a cliqué sur la bonne cible
     * @param {string} socketId 
     */
    gagne(socketId){
        this.nouvelleCible();
        let leJoueur = this.getJoueurById(socketId);
        leJoueur.incrementeScore();
        leJoueur.incrementeCombo();
        //mettre les autres joueurs à 0
        for (const unJoueur of this.joueurs){
            //if unjoueur != lejouer: unjoueur.reinitialiserCombo
            if (unJoueur != leJoueur){
                unJoueur.reinitialiserCombo();
            }   
            console.log(unJoueur.combo);
        }

    }

    changeNomJoueur(socketId, nouveauNom){
        let joueur = this.getJoueurById(socketId);
        if (!nouveauNom.includes(" "))
        {
            if (nouveauNom != "")
            {
                joueur.changeNom(nouveauNom);
            }
            
        }
    }
}


/**
 * Classe représentant un joueur.
 * ┌──────────────────┐
 * │    Partie        │
 * ├──────────────────┤
 * │ - nom            │
 * │ - socketId       │
 * │ - score          │
 * ├──────────────────┤
 * └──────────────────┘
 */
class Joueur {
    constructor(socketId, nom){
        this.nom = nom;
        this.socketId = socketId;
        this.score = 0;
        this.combo = 0;
        this.tempsReaction = 0;
    }

    incrementeScore() {
        this.score = this.score + 1;
    }
    
    
    changeNom(nouveauNom){
        this.nom = nouveauNom;
    }

    incrementeCombo() {
        this.combo = this.combo + 1;
    }

    reinitialiserCombo(){
        this.combo = 0;
    }
}

