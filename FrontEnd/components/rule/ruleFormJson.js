import {Button, Columns, Form, Heading, Icon} from "react-bulma-components";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {FaFileCode, FaTag} from "react-icons/fa";

export const RuleFormJson = ({showErrorMessage, showInfoMessage}) => {

    const [rule, setRule] = useState('{"value" : "example", "tag" : "test"}');

    return (
        <form>
            <Form.Field>
                <Form.Control>
                    <Form.Textarea name="data" type="text" placeholder="JSON format"
                    onChange={(event) => setRule(event.target.value)} value={rule}/>
                </Form.Control>
            </Form.Field>
            <Button fullwidth rounded color="primary">Enregistrer la règle</Button>
        </form>
    )
}
