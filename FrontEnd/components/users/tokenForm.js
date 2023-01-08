import {Button, Form, Heading, Icon} from "react-bulma-components";
import {FaKey} from "react-icons/fa";
import axios from "axios";
import {useState} from "react";
import {useRouter} from "next/router";

export const TokenForm = ({showErrorMessage, showSuccessMessage}) => {

    const router = useRouter();
    const [token, setToken] = useState();

    const buttonUpdateToken = async () => {
        try {
            await axios.post("/api/account/token", {"token" : token});
            showSuccessMessage("Le token a bien été modifié");
            router.reload(window.location.pathname);
        }
        catch(e) {
            showErrorMessage("Le token n'a pas pu être modifié", e.response.data);
        }
    }

    return (
        <form>
            <Heading>Modifier votre token Twitter</Heading>
            <Form.Field>
                <Form.Control>
                    <Form.Input placeholder="Token API" name="token" type="password" value={token} onChange={(event) => setToken(event.target.value)} />
                    <Icon align="left">
                        <FaKey />
                    </Icon>
                </Form.Control>
            </Form.Field>
            <Button.Group>
                <Button outlined fullwidth rounded color="primary" onClick={buttonUpdateToken}>Modifier</Button>
            </Button.Group>
        </form>
    )
}