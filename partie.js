/**
 * Classe représentant une partie de clickme.
 * ┌──────────────────┐
 * │    Partie        │
 * ├──────────────────┤
 * │ - nombreCible    │
 * │ - numeroCible    │
 * ├──────────────────┤
 * │ + nouvelleCible  │
 * └──────────────────┘
 */

export class Partie {
    constructor(){
        this.nombreCibles = 16;
        this.numeroCible;
        this.nouvelleCible();
    }

    /**
     * Choisit une nouvelle cible au hasard.
     * Modifie this.numeroCible.
     */
    nouvelleCible(){
        this.numeroCible = Math.floor(Math.random() * this.nombreCibles);
    }

}


