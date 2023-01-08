import {Heading, Form, Button} from "react-bulma-components";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";

export const StreamConnectionForm = ({showErrorMessage, showSuccessMessage}) => {

    const router = useRouter();
    const [value, setValue] = useState("");

    const updateConnection = async () => {
        try{
            await axios.post("/api/set-stream-connection", {"value" : value});
            showSuccessMessage("Le mode de connexion a bien été modifié");
            router.reload(window.location.pathname);
        }
        catch (e) {
            showErrorMessage("Le mode de connexion n'a pas pu être modifié", e.response.data);
        }
    }

    return (
        <form>
            <Heading>Modifier la connexion du stream</Heading>
            <Form.Field>
                <Form.Control>
                    <Form.Radio
                    value="true"
                    name="radio-auto"
                    checked={value === "true"}
                    onChange={(e) => setValue(e.target.value)}
                    >
                        Automatique
                    </Form.Radio>
                    <Form.Radio
                        value="false"
                        name="radio-manual"
                        checked={value === "false"}
                        onChange={(e) => setValue(e.target.value)}
                    >
                        Manuelle
                    </Form.Radio>
                </Form.Control>
                <Button.Group>
                    <Button outlined fullwidth rounded color="primary" onClick={updateConnection}>Modifier</Button>
                </Button.Group>
            </Form.Field>
        </form>
    )
}