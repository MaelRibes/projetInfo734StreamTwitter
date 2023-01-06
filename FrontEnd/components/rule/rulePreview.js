import {Button, Card, Icon, Level, Tag} from "react-bulma-components";
import {FaTrash} from "react-icons/fa";
import {useRouter} from "next/router";
import axios from "axios";

export const RulePreview = ({rule, showSuccesMessage, showErrorMessage}) => {

    const router = useRouter();
    const deleteRule = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.delete(`/api/rule/${rule.id}`);
            showSuccesMessage("La règle a bien été supprimée");
        }
        catch (e) {
            showErrorMessage("Il y a eu une erreur lors de la suppression de la règle")
        }
        router.reload(window.location.pathname)
    }

    return (
        <Card style={{cursor: "pointer", marginBottom: "0.5rem"}}>
            <Card.Content>
                <Level>
                    <Level.Side align="left">
                        <Tag color="info" rounded>{rule.tag}</Tag>
                        &nbsp; {rule.value}
                    </Level.Side>
                    <Level.Side align="right">
                        <Button color={"danger"} outlined={true} onClick={deleteRule} >
                            <Icon align="left">
                                <FaTrash />
                            </Icon>
                            &nbsp; &nbsp; Supprimer
                        </Button>
                    </Level.Side>
                </Level>
            </Card.Content>
        </Card>
    )
}