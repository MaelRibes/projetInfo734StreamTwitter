import {Panel} from "react-bulma-components";
import {RulePreview} from "./rulePreview";

export const RuleList = ({rules, showSuccesMessage, showErrorMessage}) => {
    return (
        <Panel>
            {rules.map((rule) => <RulePreview key={rule.id} rule={rule} showSuccesMessage={showSuccesMessage} showErrorMessage={showErrorMessage}/>)}
        </Panel>
    );
}