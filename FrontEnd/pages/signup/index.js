import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {SignUpForm} from "../../components/users/signupForm";
import {useEffect} from "react";

/**
 * La page pour connecter un utilisateur "/login"
 * @param showErrorMessage Fonction pour montrer un message d'erreur
 * @param showSuccessMessage Fonction pour montrer un message de succès
 * @param showInfoMessage Fonction pour montrer un message d'information
 */
const SignupPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Inscription";
    }, []);

    return (
        <PageWrapper>
            <Columns.Column className="is-4 is-offset-4 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Formulaire d'inscription</Heading>
                        <SignUpForm showErrorMessage={showErrorMessage} showInfoMessage={showInfoMessage}/>
                        <p className="description">Vous possèdez déjà un compte ? Connectez-vous <a href="/login">ici</a></p>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default SignupPage;