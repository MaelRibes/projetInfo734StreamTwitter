import {PageWrapper} from "../../components/pageWrapper";
import axios from "axios";
import {io} from "socket.io-client";
import {useEffect, useState} from "react";

const DashboardPage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();

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

        return () => {
            socket.close();
        };

    }, [setSocketState, setId]);

    return (
        <PageWrapper>
        </PageWrapper>
    );
}

export default DashboardPage;