import {PageWrapper} from "../../components/pageWrapper";
import {Button, Card, Columns, Heading, Level, Panel, Tag} from "react-bulma-components";
import {RuleForm} from "../../components/rule/ruleForm"
import {useEffect, useState} from "react";
import axios from "axios";
import {io} from "socket.io-client";
import {CustomPuffLoader} from "../../components/customPuffLoader";

const RulePage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    useEffect(() => {
        document.title = "Mes règles";
    }, []);

    const [socketState, setSocketState] = useState();
    const [id, setId] = useState();
    const [rules, setRules] = useState([]);

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

        socket.on("rules", (data) => {
            setRules(data);
        })

        return () => {
            socket.close();
        };

    }, [setSocketState, setId]);

    const showRules = () => {
        socketState.emit("show-rules", id);
    }

    return (
        <PageWrapper>
            <Columns.Column className="is-4 is-offset-4 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Règles du stream</Heading>
                        <Button outlined onClick={showRules} color="primary" fullwidth rounded>Afficher</Button>
                        <hr/>
                        <Panel>
                            {rules ? (
                                rules.map(rule => {
                                  return(<Card>
                                      <Card.Content>
                                          <Level>
                                            <Tag color="info" rounded>{rule.tag}</Tag>
                                            <p>{rule.value}</p>
                                          </Level>
                                      </Card.Content>
                              </Card>)
                                })) : <p>Aucune règles</p>}
                        </Panel>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default RulePage;