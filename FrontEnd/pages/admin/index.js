import {Columns, Heading} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import axios from "axios";
import {AccountsList} from "../../components/users/accountsList";
import ProtectedRoute from "../../components/protectedRoute";

const AdminPage = ({showErrorMessage}) => {

    useEffect(() => {
        document.title = "Gestion administrateur";
    }, []);

    const [loaded, setLoaded] = useState(false);
    const [accounts, setAccount] = useState([]);

    useEffect(() => {
        (async () => {

            if (!loaded) {
                try {
                    const response = await axios.get(`/api/accounts`);
                    setAccount(response.data);
                }
                catch (e) {
                    showErrorMessage("Il y a eu une erreur lors de la récupération des comptes", e.response.data);
                }
                setLoaded(true);
            }
        })()
    }, [loaded]);

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 tp-notification">
                <Columns>
                    <Columns.Column className="right">
                        <Heading className="is-3">Liste des utilisateurs</Heading>
                        <hr/>
                        <AccountsList accounts={accounts}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default ProtectedRoute(AdminPage, true);