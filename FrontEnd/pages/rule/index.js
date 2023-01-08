import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {useEffect, useState} from "react";
import axios from "axios";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import {RuleList} from "../../components/rule/ruleList";
import ProtectedRoute from "../../components/protectedRoute";

const RulePage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Mes règles";
    }, []);

    const [rules, setRules] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect( () => {
        (async () => {
            if(!loaded){
                try{
                    let response = await axios.get("/api/rules");
                    let responseData = response.data.data;
                    (responseData === undefined ? setRules([]) : setRules(responseData));
                }
                catch (e) {
                    showErrorMessage("Les règles n'ont pas pu être récupérées", e.response.data);
                    setRules([]);
                }
                setLoaded(true);
            }
        })();
    }, [loaded]);

    if (!loaded) {
        return <CustomPuffLoader/>
    }

    return (
        <PageWrapper>
            <Columns.Column className="is-8 is-offset-2 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Règles du stream</Heading>
                        <hr/>
                        {<RuleList rules={rules} showSuccesMessage={showSuccessMessage} showErrorMessage={showErrorMessage}/>}
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default ProtectedRoute(RulePage, false);