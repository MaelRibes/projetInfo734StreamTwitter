import {PageWrapper} from "../../components/pageWrapper";
import {Columns, Heading} from "react-bulma-components";
import {RuleForm} from "../../components/rule/ruleForm"

const RulePage = ({showErrorMessage, showInfoMessage, showSuccessMessage}) => {

    return (
        <PageWrapper>
            <Columns.Column className="is-4 is-offset-4 tp-notification-bigger">
                <Columns>
                    <Columns.Column className="right has-text-centered">
                        <Heading className="is-3">Vos règles</Heading>
                    </Columns.Column>
                </Columns>
            </Columns.Column>
        </PageWrapper>
    );
}

export default RulePage;