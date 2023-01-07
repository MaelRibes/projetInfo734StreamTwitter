import {PageWrapper} from "../../components/pageWrapper";
import {Button, Columns, Heading} from "react-bulma-components";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import {TweetList} from "../../components/tweets/tweetList";

const StreamPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Stream Twitter";
    }, []);

    const [temp, setTemp] = useState(undefined);
    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {

        if (temp !== undefined) {
            setData([...data, temp]);
        }

    }, [temp])

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

    }, [setSocketState, setId]);

    const startStream = () => {
        socketState.emit("start", id);
    };

    const stopStream = () => {
        socketState.emit("stop", id);
    };

    return (
        <PageWrapper>
            <Columns.Column>
                <Heading>Stream Twitter</Heading>
                <Columns>
                    <Columns.Column className="tp-notification">
                        <Heading>Gérer l'état</Heading>
                        <Button outlined onClick={startStream} rounded color="primary">Démarrer</Button> &nbsp;
                        <Button outlined onClick={stopStream} rounded color="danger">Arrêter</Button>
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

export default StreamPage;