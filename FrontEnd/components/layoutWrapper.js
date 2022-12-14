import React, {useState} from "react";
import {Footer} from "./footer";
import {Message} from "./messages";
import {useRouter} from "next/router";
import {Navbar} from "./navbar";

/**
 * Le wrapper pour "wrapper" les pages avec des éléments qui se retrouveront sur chaque page
 * @param children Les enfants qui sont en fait les pages
 */
export const LayoutWrapper = ({children}) => {

    /**
     * Le router
     */
    const router = useRouter();

    /**
     * L'objet du message
     */
    const [messageObject, setMessageObject] = useState({
        message: undefined,
        tooltip: undefined,
        visible: false,
        type: undefined
    });

    /**
     * Montre un message d'erreur
     * @param message Le titre du message à montrer
     * @param tooltip Le contenu du message
     */
    const showErrorMessage = (message, tooltip) => {

        if (tooltip === undefined) {
            tooltip = "Essayer encore"
        }

        setMessageObject({
            message: message,
            tooltip: tooltip,
            visible: true,
            type: "danger"
        });
    }

    /**
     * Montre un message de succès
     * @param message Le titre du message à montrer
     * @param tooltip Le contenu du message
     */
    const showSuccessMessage = (message, tooltip) => {

        if (tooltip === undefined) {
            tooltip = "Succès"
        }

        setMessageObject({
            message: message,
            tooltip: tooltip,
            visible: true,
            type: "success"
        });
    }

    /**
     * Montre un message d'info
     * @param message Le titre du message à montrer
     * @param tooltip Le contenu du message
     */
    const showInfoMessage = (message, tooltip) => {

        if (tooltip === undefined) {
            tooltip = "Pour information"
        }

        setMessageObject({
            message: message,
            tooltip: tooltip,
            visible: true,
            type: "info"
        });
    }

    /**
     * Cache le message
     */
    const hideMessage = () => {
        setMessageObject({
            message: undefined,
            tooltip: undefined,
            visible: false,
            type: undefined
        });
    }

    return (
        <>
            <Navbar router={router}/>
            <Message hideMessage={hideMessage} message={messageObject.message} tooltip={messageObject.tooltip} visible={messageObject.visible} type={messageObject.type}/>
            <div className="mainContent">

                {/* Faire ça nous permet de donner à TOUTES les pages les fonctions pour montrer les messages */}
                {React.Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        showErrorMessage: showErrorMessage,
                        showSuccessMessage: showSuccessMessage,
                        showInfoMessage: showInfoMessage
                    })
                )}
            </div>
            <Footer/>
        </>
    )
}