import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {SignUpForm} from "../../components/users/signupForm";

/**
 * La page pour connecter un utilisateur "/login"
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 * @param showInfoMessage Fonction pour montrer un message d'information
 */
const SignupPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    // Sinon on renvoie la page pour se connecter
    return (
        <PageWrapper>
            <Columns.Column className="is-4 is-offset-4 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Formulaire d'inscription</Heading>
                        <p className="description">Pour vous inscrire, entrez un pseudo et un mot de passe.</p>
                        <SignUpForm showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default SignupPage;