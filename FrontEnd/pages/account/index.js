import {Columns, Heading, Form, Button, Icon} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import moment from "moment";
import {useRouter} from "next/router";
import axios from "axios";
import {FaKey} from "react-icons/fa";

/**
 * La page montrer les informations du compte de l'utilisateur. "/account"
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 */
const AccountPage = ({showErrorMessage, showSuccessMessage}) => {

    /**
     * On récupère le router de NextJS
     */
    const router = useRouter();

    /**
     * Variable pour savoir si on a récupéré les informations de l'utilisateur
     */
    const [loaded, setLoaded] = useState(false);

    const [token, setToken] = useState();

    /**
     * Les données de l'utilisateur
     */
    const [accountData, setAccountData] = useState(null);

    /**
     * Variable pour mettre les boutons en mode loading et disabled, pendant qu'on attend la réponse du serveur
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Met à jour la partie account dans la variable accountData
     * @param newaccount Le nouvel utilisateur
     */
    const setAccount = (newAccount) => {
        setAccountData({
            ...accountData,
            account: newAccount
        })
    }

    // Le useEffet pour récupérer les informations de l'utilisateur
    useEffect(() => {
        (async () => {

            // Si la donnée n'a pas encore été récupérée on le fait
            if (!loaded) {

                // On essaye de faire la requête
                try {
                    let response = await axios.get("/api/accountdata");

                    // On met les informations de l'utilisateur
                    setAccountData(response.data);
                }

                    // Si on attrape une erreur cela veut dire qu'on n'a pas réussi à récupérer les informations de l'utilisateur actuel, donc on met ces informations à undefined
                catch (e) {
                    showErrorMessage("Les informations de l'utilisateur n'ont pas pu être récupérées", e.response.data);
                    setAccountData(undefined);
                }

                // On dit que la donnée a été récupérée
                setLoaded(true);
            }
        })()
    }, [loaded]);

    const buttonUpdateToken = async (token) => {
        try {
            await axios.put("/api/account/manage-token", {"token" : token});
            showSuccessMessage("Le token a bien été modifié")
        }
        catch(e) {
            showErrorMessage("Le token n'a pas pu être modifié", e.response.data)
        }
    }

    // Si la données n'a pas encore été récupérée alors on renvoie le loader pour montrer que c'est en cours
    if (!loaded) {
        return <CustomPuffLoader/>
    }

    // Si la donnée de l'utilisateur est non définie alors on le renvoie à la page d'accueil
    if (accountData === undefined) {
        router.replace("/");
        return null;
    }

    return (
        <PageWrapper>
            <Columns.Column className="column is-10 is-offset-1 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="left">
                        <Heading>Bonjour {accountData.pseudo}</Heading>
                        <Heading className="subtitle">Vous pouvez visualiser votre compte</Heading>
                        <p>Date de création : 
                            <em title={moment(accountData.createdAt).format("LLLL")}>{" " + moment(accountData.createdAt).format("LL")}</em>
                        </p>
                        <p color="red">{accountData.isSuperAccount ? "Vous êtes un super utilisateur" : "Vous n'êtes pas un super utilisateur"}</p>
                    </Columns.Column>
                </Columns>
                <hr/>
                <Columns>
                    <Columns.Column>
                        <Heading>Modifier votre token Twitter</Heading>
                        <Form.Field>
                            <Form.Control>
                                <Form.Input placeholder="Token API" name="token" type="password" value={token} onChange={(event) => setToken(event.target.value)} />
                                <Icon align="left">
                                    <FaKey />
                                </Icon>
                            </Form.Control>
                        </Form.Field>
                        <Button.Group>
                            <Button fullwidth rounded color="primary" onClick={() => buttonUpdateToken(token)}>Modifier</Button>
                        </Button.Group>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    )
}

// On exporte la page
export default AccountPage;