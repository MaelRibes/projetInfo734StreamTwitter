import {Button, Card, Heading, Icon, Level, Tag} from "react-bulma-components";
import moment from "moment";
import axios from "axios";
import {useRouter} from "next/router";
import {FaTrash} from "react-icons/fa";


export const AccountPreview = ({account, showSuccessMessage}) => {

    /**
     * On récupère le router de NextJS
     */
    const router = useRouter();
    const deleteAccount = async (event) => {

        // On fait en sorte que l'événement par défaut ne se déclanche pas
        event.preventDefault();

        // On essaye de supprimer l'utilisateur
        const response = await axios.delete(`/api/account/${account._id}`);
        // showSuccessMessage("Utilisateur supprimé avec succès")
        router.reload(window.location.pathname)

    }

    return (
        <Card style={{cursor: "pointer", marginBottom: "0.5rem"}}>
            <Card.Content>
                <Heading className="is-5">
                    <Level>
                        <Level.Side align="left">
                            {account.isSuperAccount ? (<Tag color="danger" rounded={true}>Admin</Tag>) : (<Tag color="success" rounded={true}>Utilisateur</Tag>)} &nbsp;&nbsp;
                            <b>{account.pseudo}</b>,&nbsp; <i> created {moment(account.createdAt).from()}</i>
                        </Level.Side>
                        <Level.Side align="right">
                            <Button color={"danger"} outlined={true} onClick={deleteAccount} >
                                <span>
                                    <Icon align="left">
                                        <FaTrash />
                                    </Icon>
                                </span>
                                <span>
                                    &nbsp; &nbsp; Supprimer
                                </span>
                            </Button>
                        </Level.Side>
                    </Level>
                </Heading>
            </Card.Content>
        </Card>
    )
}