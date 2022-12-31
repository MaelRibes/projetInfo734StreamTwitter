import {PageWrapper} from "../../components/pageWrapper";
import {Button} from "react-bulma-components";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import axios from "axios";

const StreamPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();

    useEffect(() => {

        (async () => {
            const response = await axios.get("/api/accountdata");
            setId(response.data._id);
        })();

        const socket = new io("http://localhost:3000");

        socket.on("connect", (socket) => {
            console.log("Socket connected");
        });
        setSocketState(socket);

        socket.on("tweet", (data) => {
            console.log(data);
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
            <Button onClick={startStream} fullwidth rounded color="primary">Démarrer le stream</Button>
            <Button onClick={stopStream} fullwidth rounded color="danger">STOP</Button>
        </PageWrapper>
    );
}

export default StreamPage;