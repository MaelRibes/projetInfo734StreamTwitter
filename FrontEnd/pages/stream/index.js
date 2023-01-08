import {PageWrapper} from "../../components/pageWrapper";
import {Button, Columns, Heading} from "react-bulma-components";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import {TweetList} from "../../components/tweets/tweetList";
import ProtectedRoute from "../../components/protectedRoute";
import {checkIfAccountLogged} from "../../utils/utils";
import {useRouter} from "next/router";

const StreamPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Stream Twitter";
    }, []);

    const router = useRouter();
    const [temp, setTemp] = useState(undefined);
    const [socketState, setSocketState] = useState();
    const [data, setData] = useState([]);
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {

        if (temp !== undefined) {
            setData([...data, temp]);
        }

    }, [temp])

    useEffect(() => {

        const socket = new io("http://localhost:3000");
        setSocketState(socket);

        socket.on("connect", (socket) => {
            console.log("Socket connected");
        });

        socket.on("connected", (message) => {
            showSuccessMessage(message);
        });

        socket.on("reconnected", (message) => {
            showSuccessMessage(message);
        });

        socket.on("disconnected", (message) => {
            showErrorMessage(message);
        });

        socket.on("tweet", (tweet) => {
            setTemp(tweet);
        });

        return () => {
            socket.close();
        };

    }, [setSocketState]);

    useEffect(() => {
        (async () => {
            let response = await checkIfAccountLogged();
            setIsConnected(response.isStreamConnected);
        })();
    }, [isConnected]);

    const startStream = async () => {
        await axios.get("/api/start-stream");
        setIsConnected(true);
        router.reload(window.location.pathname);
    };

    const stopStream = async () => {
        await axios.get("/api/stop-stream");
        setIsConnected(false);
        router.reload(window.location.pathname);
    };

    return (
        <PageWrapper>
            <Columns.Column>
                <Heading>Stream Twitter</Heading>
                <Columns>
                    <Columns.Column className="tp-notification">
                        <Heading>Gérer l'état</Heading>
                        {isConnected ? (<Button outlined onClick={async () => await stopStream()} rounded color="danger">Arrêter</Button>) : (
                            <Button outlined onClick={async () => await startStream()} rounded color="primary">Démarrer</Button>
                            )}
                        <hr/>
                        <Heading>Visualisation</Heading>
                        <div>
                            <TweetList tweets={data} />
                        </div>
                    </Columns.Column>
                </Columns>
            </Columns.Column>

        </PageWrapper>
    );
}

export default ProtectedRoute(StreamPage, false);