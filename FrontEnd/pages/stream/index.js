import {PageWrapper} from "../../components/pageWrapper";
import {Button, Card, Columns, Heading, Icon, Level} from "react-bulma-components";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";
import {FaTwitter} from "react-icons/fa";

const StreamPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Stream Twitter";
    }, []);

    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();
    const [data, setData] = useState([]);

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

        socket.on("tweet", (tweet) => {
            setData([...data, tweet]);
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

    const buttonHandler = () => {

    }

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
                            {data.map((tweet) => {
                                return (<Card>
                                    <Card.Content>
                                        <Level>
                                            <b>{tweet.author} : </b>
                                            {tweet.text}
                                            <Level.Side align="left">
                                                <a href={`https://twitter.com/${tweet.author}/status/${tweet.id}`}>
                                                    <Button rounded color="info">
                                                        <FaTwitter />
                                                        &nbsp; Voir le tweet
                                                    </Button>
                                                </a>
                                            </Level.Side>
                                        </Level>
                                    </Card.Content>
                                </Card>)
                            })}
                        </div>
                    </Columns.Column>
                </Columns>
            </Columns.Column>

        </PageWrapper>
    );
}

export default StreamPage;