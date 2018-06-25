// Script de l'Extension Scodoc
// Developpement : Jeremy DEMANGE | @DemangeJeremy
// Contact : jeremy.demange.mail {at} gmail.com


// Affichage du titre et du copyright
console.log("%cCALCUL DE MOYENNE", "background: #000000; color: white");
console.log("%cBy @DemangeJeremy", "background: #000000; color: white");


// On calcule le nombre de matieres tout UE confondue
var matieres = document.querySelectorAll(".notes_bulletin_row_mod .colonne_module");
var nbMatieres = $(".notes_bulletin_row_mod .colonne_module").length;


// Fonction pour arrondir une note en 10.00
function arrondiNombre(nombre) {
    var facteur = Math.pow(10, 2);
    return Math.round(nombre * facteur) / facteur;
}


// Initialisation des variables que l'on utilisera
var moyenne = new Array();
var coeffMatiere = new Array();
var coeffUE = new Array();
var notes, coeff;
var nbBalise = 2;
var totalEnCours, coeff, noteActuelle, division, changementUE = 0;


// On analyse les balise TR, qui contient les informations pour recuperer les notes
var baliseTR = document.querySelectorAll("tr");


// Changer la selection balise 
var baliseTD = baliseTR[2].querySelectorAll("td");


// noteAnglais === on recupere les informations (on aurait pu nommer ça "analyseDonnees")
var noteAnglais = baliseTD[1].innerHTML;


// Les verfications
var etatFinal = true;
var compteurBalise = 2;
var comptageMatieres = 0;


// La boucle qui calcule le coefficient des UE (UE1 et UE2)
var classUE = document.querySelectorAll(".notes_bulletin_row_ue");
var coeffUE1 = classUE[0].querySelectorAll("td");
coeffUE1 = Number(coeffUE1[4].innerHTML);
var coeffUE2 = classUE[1].querySelectorAll("td");
coeffUE2 = Number(coeffUE2[4].innerHTML);
console.log("coefficient UE1 : " + coeffUE1);
console.log("coefficient UE2 : " + coeffUE2);
console.log("////////////////////");


// La boucle qui tue (c'est elle qui calcule les moyennes)
for (i = 0; i < nbMatieres; i++) {
    // L'etat decide la fin de la boucle
    etatFinal = true;
    // On affiche le nom de la matiere en cours
    console.log("Matière : " + noteAnglais);
    // Calcul du coefficient matiere
    coeffMatiere[i] = baliseTD[3].innerHTML;
    // On affiche le Coefficient de la matiere
    console.log("coefficient : " + coeffMatiere[i]);
    // Initialisation des donnees
    totalEnCours, coeff, noteActuelle, division = 0;
    // Pour eviter les soucis, on initialise le totalEnCours a 0.001
    totalEnCours = 0.001;
    do {
        compteurBalise++;
        baliseTD = baliseTR[compteurBalise].querySelectorAll("td");
        noteAnglais = baliseTD[1].innerHTML;
        if (noteAnglais == "") {
            noteAnglais = baliseTD[3].innerHTML;
            if (noteAnglais == "") {
                // Changement de UE
                changementUE = i;
            } else if (noteAnglais == "EXC" || noteAnglais == "ATT") {
                // Si la note est EXC ou ATT, on ne la traite pas
            } else if (noteAnglais == "ABS" || noteAnglais == "NP") {
                // Si la note est NP, on attribue une note de 0
                noteActuelle = 0;
                noteAnglais = baliseTD[4].innerHTML;
                coeff = Number(noteAnglais);
                totalEnCours += (noteActuelle * coeff);
                division += coeff;
                moyenne[i] = totalEnCours / division;
            } else {
                noteActuelle = Number(noteAnglais);
                noteAnglais = baliseTD[4].innerHTML;
                coeff = Number(noteAnglais);
                totalEnCours += (noteActuelle * coeff);
                division += coeff;
                moyenne[i] = totalEnCours / division;
            }
        } else {
            // matiere suivante s'il y a
            etatFinal = false;
            moyenne[i] = arrondiNombre(moyenne[i]);
            console.log("Moyenne : " + moyenne[i]);
            console.log("/////////");
        }
    } while (etatFinal);
}


// Affichage des notes et moyennes
// UE1
var UE1 = 0.0001;
var totalCoeffUE1 = 0.0001;
for (n = 0; n <= changementUE; n++) {
    // Si aucune note dans une matiere, on lui donne 10/20 par defaut
    if (isNaN(moyenne[n])) {
        moyenne[n] = 10;
    }
    UE1 += moyenne[n] * coeffMatiere[n];
}
UE1 = arrondiNombre(UE1 / coeffUE1);
console.log("Moyenne UE1 : " + UE1);


// UE2 
var UE2 = 0.0001;
for (n = changementUE + 1; n < nbMatieres; n++) {
    if (isNaN(moyenne[n])) {
        moyenne[n] = 10;
    }
    UE2 += moyenne[n] * coeffMatiere[n];
}
UE2 = arrondiNombre(UE2 / coeffUE2);
console.log("Moyenne UE2 : " + UE2);


// On affiche la moyenne generale
var moyenneGenerale = ((UE1 * coeffUE1) + (UE2 * coeffUE2)) / (coeffUE1 + coeffUE2);
console.log("Moyenne générale : " + arrondiNombre(moyenneGenerale));


// On affiche le copyright
console.log("%cBy @DemangeJeremy", "background: #000000; color: white");