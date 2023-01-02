import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {RuleForm} from "../../components/rule/ruleForm"
import {RuleFormJson} from "../../components/rule/ruleFormJson"
import axios from "axios";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

const RuleFormPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Créer une règle";
    }, []);

    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();

    useEffect(() => {

        (async () => {
            const response = await axios.get("/api/accountdata");
            setId(response.data._id);
        })();

        const socket = new io("http://localhost:3000");
        setSocketState(socket);

        socket.on("connect", (socket) => {
            console.log("Socket connected");
        });

        return () => {
            socket.close();
        };

    }, [setSocketState, setId]);

    return (
        <PageWrapper>
            <Columns.Column>
                <Heading>Ajouter une règle</Heading>
                Se référer à la&nbsp;
                <a href="https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/build-a-rule">documentation </a>
                de l'API pour plus d'informations. Vérifiez le nombre de règles que vous pouvez créer en consultant votre niveau d'accès&nbsp;
                <a href="https://developer.twitter.com/en/docs/twitter-api/getting-started/about-twitter-api#v2-access-level">ici.</a>
                <Columns>
                    <Columns.Column className="tp-notification">
                        <Heading>Formulaire</Heading>
                        <RuleForm showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} socket={socketState} id={id}/>
                    </Columns.Column>
                    <Columns.Column className="is-offset-1 tp-notification">
                        <Heading>JSON</Heading>
                        <p>Entrer dans la zone de texte ci-dessous directement votre règle sous format json.</p>
                        <RuleFormJson showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} socket={socketState} id={id}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>

        </PageWrapper>
    );
}

export default RuleFormPage;