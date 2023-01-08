import {PageWrapper} from "../../components/pageWrapper";
import axios from "axios";
import {useEffect, useState} from "react";
import {CustomPuffLoader} from "../../components/customPuffLoader";
import {createDataViz, wordCloud} from "../../dashboard/viz";
import ProtectedRoute from "../../components/protectedRoute";

const DashboardPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const [tweets, setTweets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect( () => {
        (async () => {
            if(!loaded){
                try{
                    let response = await axios.get("/api/account-tweets");
                    setTweets(response.data);
                }
                catch (e) {
                    showErrorMessage("Les tweets n'ont pas pu être récupérées", e.response.data);
                    setTweets(undefined);
                }
                setLoaded(true);
            }
        })();
    }, [loaded]);

    if (!loaded) {
        return <CustomPuffLoader/>
    }

    const h3 = {
        color: '#485fc7',
        fontSize: '1.5rem',
        fontWeight: '600',
        marginTop: '1.5rem',
        marginBottom: '1.5rem'
    }

    const gridLayout = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridColumnGap: '15px',
        gridRowGap: '15px'
    }

    const one = {
        gridColumn: '1',
        gridRow: '1'
    }

    const two = {
        gridColumn: '2',
        gridRow: '1'
    }

    const three = {
        gridColumn: '3',
        gridRow: '1'
    }

    const four = {
        gridColumn: '4',
        gridRow: '1'
    }

    return (
        <PageWrapper>
            <h3 style={h3}>Nombre de tweets : {tweets.length}</h3>
            <div style={gridLayout}>
                <div style={one}>
                    <h3 style={h3}>Répartition des langues</h3>
                    <div id="langChart"></div>
                </div>
                <div style={two}>
                    <h3 style={h3}>Hashtags les plus représentés</h3>
                    <div id="wordCloud"></div>
                </div>
                <div style={three}>
                    <h3 style={h3}>Entités les plus représentés</h3>
                    <div id="entitiesChart"></div>
                </div>
                <div style={four}>
                    <h3 style={h3}>Pourcentage de tweets sensibles</h3>
                    <div id="sensitiveChart"></div>
                </div>
                
            </div>
            {createDataViz(tweets)}
            {wordCloud(tweets)}
        </PageWrapper>
    );
}

export default ProtectedRoute(DashboardPage, false);