import * as dc from "dc";
import crossfilter from "crossfilter2";
import cloud from "d3-cloud";
import {createCanvas} from "canvas";
import * as d3 from "d3";
import {style} from "d3";



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

    /* ===== LANG - PIE CHART ===== */

    const langDim = ndx.dimension(tweet => {
        return tweet.data.lang;
    });

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

    /* ===== END LANG - PIE CHART ===== */


    // On veut rendre tous les graphiques qui proviennent du chart group "dataset"
    dc.renderAll(groupName);
}

export function wordCloud(dataset){

    let crossfilterData = [];
    for (let i = 0; i < dataset.length; i++) {
        if(dataset[i].data.entities !== undefined && dataset[i].data.entities.hashtags){
            dataset[i].data.entities.hashtags.map(item => (crossfilterData.push({hashtag: item.tag})));
        }
    }

    const ndx = crossfilter(crossfilterData);
    const hashtagsDim = ndx.dimension( item => {
        return item.hashtag ;
    });
    const hashtagsGroup = hashtagsDim.group().reduceCount();
    let l = hashtagsGroup.top(Infinity);
    const result = l.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {});
    const hashtags = Object.entries(result)
        .slice(0, 15)

    const words = hashtags
        .map( item => {
            return {text: item[0], size: item[1] * 10};
        });

    cloud().size([500, 500])
        .canvas(() => createCanvas(1, 1))
        .words(words)
        .padding(5)
        .rotate(() => Math.floor(Math.random() * 2) * 90)
        .font("Helvetica")
        .fontSize(d => d.size)
        .on("end", draw)
        .start();
    function draw(words) {
        d3.select("#wordCloud").append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .append("g")
            .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Helvetica")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
    }
    const parent = d3.select("#wordCloud");
    const secondChildSVG = parent
        .selectAll("svg")
        .filter(":nth-of-type(2)")
        .style("display", "none");
}