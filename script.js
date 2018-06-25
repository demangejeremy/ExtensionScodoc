// Script de l'extension 'CALCUL MOYENNE SCODOC'
// Developpement : Jeremy DEMANGE
// Contact : jeremy.demange.mail {at} gmail.com
console.log("%cCALCUL DE MOYENNE", "background: #000000; color: white");
console.log("%cBy @DemangeJeremy", "background: #000000; color: white");
// On calcule le nombre de matieres
var matieres = document.querySelectorAll(".notes_bulletin_row_mod .colonne_module");
var nbMatieres = $(".notes_bulletin_row_mod .colonne_module").length;

// Fonction pour arrondir
function arrondiNombre(nombre) {
    var facteur = Math.pow(10, 2);
    return Math.round(nombre * facteur) / facteur;
}

// Initialisation
var moyenne = new Array();
var coeffMatiere = new Array();
var coeffUE = new Array();
var notes, coeff;
var nbBalise = 2;
var totalEnCours, coeff, noteActuelle, division, changementUE = 0;

// On calcule la note d'anglais
var baliseTR = document.querySelectorAll("tr");

// Changer la selection balise 
var baliseTD = baliseTR[2].querySelectorAll("td");

// Ne pas changer en bas
var noteAnglais = baliseTD[1].innerHTML;

// Les verfications
var etatFinal = true;
var compteurBalise = 2;
var comptageMatieres = 0;
// console.log("Matière : " + noteAnglais);

// La boucle qui calcule le coefficient des UE
var classUE = document.querySelectorAll(".notes_bulletin_row_ue");
var coeffUE1 = classUE[0].querySelectorAll("td");
coeffUE1 = Number(coeffUE1[4].innerHTML);
var coeffUE2 = classUE[1].querySelectorAll("td");
coeffUE2 = Number(coeffUE2[4].innerHTML);
console.log("coefficient UE1 : " + coeffUE1);
console.log("coefficient UE2 : " + coeffUE2);
console.log("////////////////////");



// La boucle qui tue (c'est elle qui calcule les moyenne)
for (i = 0; i < nbMatieres; i++) {
    etatFinal = true;
    console.log("Matière : " + noteAnglais);
    // Calcul du coefficient matiere
    coeffMatiere[i] = baliseTD[3].innerHTML;
    console.log("coefficient : " + coeffMatiere[i]);
    // Initialisation
    totalEnCours, coeff, noteActuelle, division = 0;
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

            } else if (noteAnglais == "ABS" || noteAnglais == "NP") {
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
    UE2 += moyenne[n] * coeffMatiere[n];
}
UE2 = arrondiNombre(UE2 / coeffUE2);
console.log("Moyenne UE2 : " + UE2);

// Total
var moyenneGenerale = ((UE1 * coeffUE1) + (UE2 * coeffUE2)) / (coeffUE1 + coeffUE2);
console.log("Moyenne générale : " + arrondiNombre(moyenneGenerale));

// Copyright
console.log("%cBy @DemangeJeremy", "background: #000000; color: white");
