import {PageWrapper} from "../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {useEffect} from "react";

// La page de l'index, c'est à dire le '/'
const IndexPage = () => {

    useEffect(() => {
        document.title = "Accueil";
    }, []);

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 tp-notification">
                <Heading className="is-3">Bienvenue sur TweetDash</Heading>
                <hr/>
                <p>Gérez votre propre Stream Twitter et visualisez en temps réel un dasbooard interactif sur les données récoltées.</p>
            </Columns.Column>
        </PageWrapper>
    )
}

// On exporte la page
export default IndexPage;