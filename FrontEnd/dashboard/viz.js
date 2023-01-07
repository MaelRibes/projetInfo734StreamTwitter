import * as dc from "dc";
import crossfilter from "crossfilter2";


/**
 * On crée la variable qui contiendra le nom du groupe de graphique du dashboard
 */
const groupName = "dataset";

/**
 * Fonction pour reset les filtres et redessiner les graphiques
 */
function reset() {
    dc.filterAll(groupName);
    dc.renderAll(groupName);
}

const montrerPourcentagesPieChart = (chart) => {
    chart.selectAll('text.pie-slice').text(function (d) {
        if (((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) !== 0) {
            return dc.utils.printSingleValue(Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100)) + '%';
        }
    })
}

/**
 * La fonction pour créer la visualisation
 */
export function createDataViz(dataset) {

    // On crée le crossfilter que l'on va nommer ndx (une pseudo norme)
    const ndx = crossfilter(dataset);

    /* ===== LANGUES - PIE CHART ===== */

    // On crée la dimension qui sera l'attention des médias (ou "Aucune information" si il n'y a pas d'info)
    const langDim = ndx.dimension((tweet) => {
        return tweet.data.lang;
    });

    // On crée le groupe, on veut le nombre de mass shooting par type d'attention de medias
    const langGroup = langDim.group().reduceCount();

    // On crée le graphique avec le groupName
    const langChart = dc.pieChart('#langChart', groupName)
        .dimension(langDim) // On ajoute la dimension
        .group(langGroup) // On ajoute le groupe
        .renderLabel(true) // On rend les labels
        .renderTitle(true) // On rend les titres (quand on passe la sourie sur un élément)
        .ordering(function (p) { // On veut trier par valeur croissante
            return -p.value;
        })
        .ordinalColors(['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']) // Les couleurs des éléments
        .legend(dc.legend().highlightSelected(true).x(0).y(13)) // On ajoute la légende
        .title(function (d) {
            return d.value
        }) // Le titre à montrer quand la sourie est passée sur un élément
        .on('pretransition', montrerPourcentagesPieChart); // On veut montrer les % dans les tranches

    /* ===== FIN ATTENTION DES MEDIAS - PIE CHART ===== */

    // On veut rendre tous les graphiques qui proviennent du chart group "dataset"
    dc.renderAll(groupName);
}