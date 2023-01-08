import {Button, Form} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export const RuleFormJson = ({showErrorMessage, showSuccessMessage}) => {

    const [rule, setRule] = useState('{"value" : "example", "tag" : "test"}');
    const router = useRouter();

    const sendRule = async () => {
        try {
            await axios.post("/api/rule", {"rule": rule});
            showSuccessMessage("La règle a bien été enregistré");
            await router.replace("/rule");
        } catch (e) {
            showErrorMessage("Il y a eu une erreur lors de l'enregistrement de la règle", e.response.data);
        }
    }

    return (
        <form>
            <Form.Field>
                <Form.Control>
                    <Form.Textarea name="data" type="text" placeholder="JSON format"
                    onChange={(event) => setRule(event.target.value)} value={rule}/>
                </Form.Control>
            </Form.Field>
            <Button onClick={sendRule} fullwidth rounded color="primary">Enregistrer la règle</Button>
        </form>
    )
}
