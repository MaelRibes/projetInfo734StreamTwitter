import {Button, Columns, Form, Heading, Icon} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import {FaMapMarkerAlt, FaHashtag, FaAt, FaPenNib, FaLink, FaSearch, FaTag, FaLanguage} from "react-icons/fa"
import axios from "axios";

/**
 * Le composant pour que l'utilisateur se connecte
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showInfoMessage Fonction pour montrer un message d'information
 */
export const RuleForm = ({showErrorMessage, showInfoMessage}) => {

    /**
     * On récupère le router de NextJS
     */
    const router = useRouter();

    const [rule, setRule] = useState({
        keyword : "",
        hashtag : "#",
        mention : "@",
        author : "",
        link : "",
        lang : ""
    })
    const [coordinates, setCoordinates] = useState({
        longitude : "",
        latitude : "",
        radius : ""
    })
    const [tag, setTag] = useState("");

    const updateRule = (e) => {
        setRule({
            ...rule,
            [e.target.name]: e.target.value
        });
    }

    /**
     * Fonction utilisée pour mettre à jour les champs
     * @param e L'événement
     */
    const updateCoordinates = (e) => {
        setCoordinates({
            ...coordinates,
            [e.target.name]: e.target.value
        });
    }

    const createRule = (e) => {
        let res = "";
        for(const key in rule){
            if (rule[key] !== ""){
                switch(key){
                    case "keyword":
                        res+= rule[key];
                        break;
                    case "hashtag":
                        res+= " " + rule[key];
                        break;
                    case "mention":
                        res+= " " + rule[key];
                        break;
                    case "author":
                        res+= " from:" + rule[key];
                        break;
                    case "link":
                        res+= " url:" + rule[key];
                        break;
                    case "lang":
                        res+= " lang:" + rule[key];
                        break;
                }
            }

        }
        console.log(res);
    }


    return (
        <form>
            <Form.Field>
                <Form.Label>Mot-clé dans le texte du tweet</Form.Label>
                <Form.Control>
                    <Form.Input name="keyword" type="text"
                                placeholder="Mot-clé" onChange={updateRule}
                                value={rule.keyword} />
                    <Icon align="left">
                        <FaSearch />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label>Hashtag</Form.Label>
                <Form.Control>
                    <Form.Input name="hashtag" type="text"
                                placeholder="Hashtag" onChange={updateRule}
                                value={rule.hashtag} />
                    <Icon align="left">
                        <FaHashtag />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label>Mention d'un utilisateur twitter</Form.Label>
                <Form.Control>
                    <Form.Input name="mention" type="text"
                                placeholder="Mention" onChange={updateRule}
                                value={rule.mention} />
                    <Icon align="left">
                        <FaAt />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label>Auteur du tweet</Form.Label>
                <Form.Control>
                    <Form.Input name="auteur" type="text"
                                placeholder="Auteur" onChange={updateRule}
                                value={rule.author} />
                    <Icon align="left">
                        <FaPenNib />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Label>Lien présent dans le tweet</Form.Label>
                <Form.Control>
                    <Form.Input name="link" type="text"
                                placeholder="URL" onChange={updateRule}
                                value={rule.link} />
                    <Icon align="left">
                        <FaLink />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Label>Coordonnées</Form.Label>
            <Columns>
                <Columns.Column>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input name="longitude" type="text"
                                        placeholder="Longitude" onChange={updateCoordinates}
                                        value={coordinates.longitude} />
                            <Icon align="left">
                                <FaMapMarkerAlt />
                            </Icon>

                        </Form.Control>
                    </Form.Field>
                </Columns.Column>

                <Columns.Column>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input name="latitude" type="text"
                                        placeholder="Latitude" onChange={updateCoordinates}
                                        value={coordinates.latitude} />
                        </Form.Control>
                    </Form.Field>
                </Columns.Column>


                <Columns.Column>
                    <Form.Field>
                        <Form.Control>
                            <Form.Input name="radius" type="text"
                                        placeholder="Rayon" onChange={updateCoordinates}
                                        value={coordinates.radius} />
                        </Form.Control>
                    </Form.Field>
                </Columns.Column>
            </Columns>

            <Form.Field>
                <Form.Label>Langue du tweet</Form.Label>
                <Form.Control>
                    <Form.Input name="lang" type="text"
                                placeholder="Langue" onChange={updateRule}
                                value={rule.lang} />
                    <Icon align="left">
                        <FaLanguage />
                    </Icon>
                </Form.Control>
                <Form.Help>Voir <a href="https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/build-a-rule">ici </a>
                    les codes BCP47 de chaque langues</Form.Help>
            </Form.Field>

            <Form.Field>
                <Form.Label>Tag de la règle</Form.Label>
                <Form.Control>
                    <Form.Input name="tag" type="text" placeholder="Tag"
                                onChange={(event) => setTag(event.target.value)} value={tag}/>
                    <Icon align="left">
                        <FaTag />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Button onClick={createRule} fullwidth rounded color="primary">Enregistrer la règle</Button>
        </form>
    )
}