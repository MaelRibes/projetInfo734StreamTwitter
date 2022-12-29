import {Panel} from "react-bulma-components";
import {AccountPreview} from "./accountPreview";

/**
 * Le composant pour montrer les comptes sous forme de liste
 * @param accounts Les comptes
 */
export const AccountsList = ({accounts, showInfoMessage}) => {
    return (
        <Panel>
            {/* On veut montrer la liste des comptes avec un composant <AccountPreview/> par compte */}
            {accounts.map((account) => <AccountPreview  showInfoMessage={showInfoMessage} key={account._id} account={account}/>)}
        </Panel>
    );
}