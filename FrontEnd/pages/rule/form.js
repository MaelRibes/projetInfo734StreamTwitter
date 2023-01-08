import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {RuleForm} from "../../components/rule/ruleForm"
import {RuleFormJson} from "../../components/rule/ruleFormJson"
import {useEffect} from "react";
import ProtectedRoute from "../../components/protectedRoute";

const RuleFormPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Créer une règle";
    }, []);

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
                        <RuleForm showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
                    </Columns.Column>
                    <Columns.Column className="is-offset-1 tp-notification">
                        <Heading>JSON</Heading>
                        <p>Entrer dans la zone de texte ci-dessous directement votre règle sous format json.</p>
                        <RuleFormJson showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>

        </PageWrapper>
    );
}

export default ProtectedRoute(RuleFormPage, false);