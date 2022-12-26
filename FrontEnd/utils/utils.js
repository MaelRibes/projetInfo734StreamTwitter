import axios from "axios";

/**
 * Faire une demande pour savoir si l'utilisateur (lui-même) est authentifié
 */
export const checkIfAccountLogged = async () => {

    // On essaye de faire la requête
    try {

        // On lance la requête
        const response = await axios.get("/api/authenticated");
        
        // On retourne le résultat si le try est un succès
        return response.data
    }

        // Si on attrape une erreur alors on en relance une disant que l'utilisateur n'est pas connecté
    catch (e) {
        throw new Error("L'utilisateur n'est pas connecté")
    }
}

export const LANGS = [
    {value: "", label: "Aucune"},
    {value: "lang:de", label: "Allemand"},
    {value: "lang:am", label: "Amharique"},
    {value: "lang:en", label: "Anglais"},
    {value: "lang:ar", label: "Arabe"},
    {value: "lang:hy", label: "Arménien"},
    {value: "lang:eu", label: "Basque"},
    {value: "lang:bn", label: "Bengali"},
    {value: "lang:my", label: "Birman"},
    {value: "lang:bs", label: "Bosnien"},
    {value: "lang:bg", label: "Bulgare"},
    {value: "lang:ca", label: "Catalan"},
    {value: "lang:zh-CN", label: "Chinois Simplifé"},
    {value: "lang:zh-TW", label: "Chinois Traditionnel"},
    {value: "lang:ko", label: "Coréen"},
    {value: "lang:ht", label: "Créole"},
    {value: "lang:hr", label: "Croate"},
    {value: "lang:da", label: "Danois"},
    {value: "lang:es", label: "Espagnol"},
    {value: "lang:et", label: "Estonien"},
    {value: "lang:fi", label: "Finlandais"},
    {value: "lang:fr", label: "Français"},
    {value: "lang:cy", label: "Gallois"},
    {value: "lang:ka", label: "Géorgien"},
    {value: "lang:el", label: "Grec"},
    {value: "lang:gu", label: "Guajarati"},
    {value: "lang:iw", label: "Hébreu"},
    {value: "lang:hi", label: "Hindi"},
    {value: "lang:hi-Latn", label: "Hindi Latinisé"},
    {value: "lang:hu", label: "Hongrois"},
    {value: "lang:in", label: "Indonésien"},
    {value: "lang:is", label: "Islandais"},
    {value: "lang:it", label: "Italien"},
    {value: "lang:ja", label: "Japonais"},
    {value: "lang:kn", label: "Kannada"},
    {value: "lang:km", label: "Khmer"},
    {value: "lang:lo", label: "Lao"},
    {value: "lang:lv", label: "Letton"},
    {value: "lang:lt", label: "Lithuanien"},
    {value: "lang:ml", label: "Malayalam"},
    {value: "lang:dv", label: "Maldavien"},
    {value: "lang:mr", label: "Marathi"},
    {value: "lang:nl", label: "Néerlandais"},
    {value: "lang:ne", label: "Népalais"},
    {value: "lang:no", label: "Norvégien"},
    {value: "lang:or", label: "Oriya"},
    {value: "lang:ur", label: "Ourdou"},
    {value: "lang:ug", label: "Ouyghur"},
    {value: "lang:ps", label: "Pachto"},
    {value: "lang:pa", label: "Pendjabi"},
    {value: "lang:fa", label: "Perse"},
    {value: "lang:pl", label: "Polonais"},
    {value: "lang:pt", label: "Portugais"},
    {value: "lang:ro", label: "Roumain"},
    {value: "lang:ru", label: "Russe"},
    {value: "lang:sr", label: "Serbe"},
    {value: "lang:sd", label: "Sindhi"},
    {value: "lang:si", label: "Sinhala"},
    {value: "lang:sk", label: "Slovaque"},
    {value: "lang:sl", label: "Slovénien"},
    {value: "lang:ckb", label: "Sorani"},
    {value: "lang:sv", label: "Suédois"},
    {value: "lang:tl", label: "Tagalog"},
    {value: "lang:ta", label: "Tamoul"},
    {value: "lang:cs", label: "Tchèque"},
    {value: "lang:te", label: "Télougou"},
    {value: "lang:th", label: "Thaï"},
    {value: "lang:bo", label: "Tibétain"},
    {value: "lang:tr", label: "Turc"},
    {value: "lang:uk", label: "Ukrainien"},
    {value: "lang:vi", label: "Vietnamien"}
]