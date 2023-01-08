import {Columns, Heading, Tag} from "react-bulma-components";
import {PageWrapper} from "../../components/pageWrapper";
import {useEffect, useState} from "react";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import moment from "moment";
import {useRouter} from "next/router";
import axios from "axios";
import {TokenForm} from "../../components/users/tokenForm";
import {StreamConnectionForm} from "../../components/users/streamConnectionForm";

const AccountPage = ({showErrorMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Mon compte";
    }, []);

    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const setAccount = (newAccount) => {
        setAccountData({
            ...accountData,
            account: newAccount
        })
    }

    useEffect(() => {
        (async () => {
            if (!loaded) {
                try {
                    let response = await axios.get("/api/accountdata");
                    setAccountData(response.data);
                }
                catch (e) {
                    showErrorMessage("Les informations de l'utilisateur n'ont pas pu être récupérées", e.response.data);
                    setAccountData(undefined);
                }
                setLoaded(true);
            }
        })()
    }, [loaded]);

    if (!loaded) {
        return <CustomPuffLoader/>
    }

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
                        {accountData.isSuperAccount ? (<Tag color="danger">Vous êtes un super utilisateur</Tag>) : null} &nbsp;
                        {accountData.token ? (<Tag color="success">Token défini</Tag>) : (<Tag color="danger">Vous n'avez pas défini de token</Tag>)} &nbsp;
                        {accountData.autoConnect ? (<Tag color="warning">Mode auto</Tag>) : (<Tag color="info">Mode manuel</Tag>)} &nbsp;
                        <p>Date de création : 
                            <em title={moment(accountData.createdAt).format("LLLL")}>{" " + moment(accountData.createdAt).format("LL")}</em>
                        </p>
                    </Columns.Column>
                </Columns>
                <hr/>
                <Columns>
                    <Columns.Column>
                        <TokenForm showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
                        <hr />
                        <StreamConnectionForm showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage}/>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    )
}

export default AccountPage;