import {Button, Columns, Form, Icon} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import {FaMapMarkerAlt, FaHashtag, FaAt, FaPenNib, FaLink, FaSearch, FaTag, FaLanguage} from "react-icons/fa"
import {LANGS} from "../../utils/utils";
import axios from "axios";

export const RuleForm = ({showErrorMessage, showSuccessMessage}) => {

    const router = useRouter();

    const [rule, setRule] = useState({
        keyword : "",
        hashtag : "#",
        mention : "@",
        author : "",
        link : "",
        lang : "",
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

    const updateCoordinates = (e) => {
        setCoordinates({
            ...coordinates,
            [e.target.name]: e.target.value
        });
    }

    const [checked, setChecked] = useState(false);

    const createRule = async () => {
        let res = "";
        for (const key in rule) {
            if (rule[key] !== "") {
                switch (key) {
                    case "keyword":
                        res += rule[key];
                        break;
                    case "hashtag":
                        if (rule[key].charAt(0) !== "#")
                            return showErrorMessage(rule[key] + " : Veuillez renseigner un hashtag correct")
                        res += " " + rule[key];
                        break;
                    case "mention":
                        if (rule[key].charAt(0) !== "@")
                            return showErrorMessage(rule[key] + " : Veuillez renseigner un utilisateur correct")
                        res += " " + rule[key];
                        break;
                    case "author":
                        res += " from:" + rule[key];
                        break;
                    case "link":
                        res += " url:" + rule[key];
                        break;
                    case "lang":
                        res += " " + rule[key];
                        break;
                }
            }

        }
        if (checked) {
            res += " -is:retweet"
        }
        const isEmpty = Object.values(coordinates).every(value => {
                return value === "";
            }
        )
        const isFullfilled = Object.values(coordinates).every(value => {
                return value !== "";
            }
        )
        if (isFullfilled) {
            res += "point_radius:[" + coordinates["longitude"] + " " + coordinates["latitude"] + " " + coordinates["radius"] + "]"
        } else if (!isEmpty && !isFullfilled) {
            return showErrorMessage("Veuillez remplir tous les champs de coordonnées ou aucun.")
        }
        const ruleToSend = `{"value" : "${res}", "tag" : "${tag}"}`;

        try {
            await axios.post("/api/rule", {"rule": ruleToSend});
            showSuccessMessage("La règle a bien été enregistré");
            await router.replace("/rule");
        } catch (e) {
            showErrorMessage("Il y a eu une erreur lors de l'enregistrement de la règle", e.response.data);
        }
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
                <Form.Help>Ne pas mettre le @ en premier caractère</Form.Help>
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
                    <Form.Select name="lang" onChange={updateRule} value={rule.lang}>
                        {LANGS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Form.Select>

                    <Icon align="left">
                        <FaLanguage />
                    </Icon>
                </Form.Control>
            </Form.Field>

            <Form.Field>
                <Form.Control>
                    <Form.Label>Retweets</Form.Label>
                    <Form.Checkbox name="retweet" checked={checked} onChange={e => setChecked(e.target.checked)}>
                        Ignorer les RTs
                    </Form.Checkbox>
                </Form.Control>
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