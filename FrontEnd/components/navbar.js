import {Navbar as BulmaNavbar} from "react-bulma-components";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {FaPowerOff, FaUser, FaHome, FaPencilRuler, FaPenSquare, FaStream, FaUserTie} from "react-icons/fa";
const {checkIfAccountLogged} = require("../utils/utils.js"); 

/**
 * La navbar
 * @param router Le router de NextJS
 */
export const Navbar = ({ router }) => {
  /**
   * Si le burger de la barre de navigation est actif (pour les mobiles)
   */
  const [isActive, setIsActive] = useState(false);

  /**
   * Si l'utilisateur est connecté
   */
  const [isAccountLogged, setIsAccountLogged] = useState(true);

  /**
   * Si l'utilisateur est un "super utilisateur"
   */
  const [isSuperAccount, setIsSuperAccount] = useState(true);

  /**
   * Utilisé pour savoir si la page a changé (pour mettre à jour la navbar)
   */
  const [lastPage, setLastPage] = useState(
    router === null ? undefined : router.pathname
  );

  /**
   * useEffect utilisé pour vérifier si la page a changé pour savoir si l'utilisateur est toujours connecté
   */
  useEffect(() => {
    if (router !== null && router.pathname !== lastPage) {
      setLastPage(router.pathname);
    }
  });

  /**
   * useEffect pour savoir si l'utilisateur est toujours connecté et pour mettre à jour la barre de navigation en conséquence.
   */
  useEffect(() => {
    (async () => {

        // Si l'utilisateur semble être connecté, nous vérifions auprès du serveur si l'utilisateur est réellement connecté.
        try {
            const isAccountLoggedData = await checkIfAccountLogged();
            // Si la requête est un succès alors on peut mettre la réponse de si l'utilisateur est connecté et s'il est un "super utilisateur"
            setIsAccountLogged(isAccountLoggedData.isAccountLogged);
            setIsSuperAccount(isAccountLoggedData.isSuperAccount);
        }

            // Si on attrape une erreur alors on met que l'utilisateur n'est ni connecté, ni un "super utilisateur"
        catch (e) {
            setIsAccountLogged(false);
            setIsSuperAccount(false);
        }
    })();
  }, [lastPage]);

  return (
    <BulmaNavbar active={isActive} className="isFixed">
      <div className="container">
        <BulmaNavbar.Brand>
          <BulmaNavbar.Burger onClick={() => setIsActive(!isActive)} />
        </BulmaNavbar.Brand>
        <BulmaNavbar.Menu>
          <BulmaNavbar.Container>
              <BulmaNavbar.Item href="/">
                  <img
                      alt="TweetDash"
                      src="/logo.png"
                      width="120"
                  />
              </BulmaNavbar.Item>

              {isAccountLogged ? (
                  <>
                      <BulmaNavbar.Item renderAs="a" className="has-dropdown is-hoverable">

                          <BulmaNavbar.Link>
                              <BulmaNavbar.Item renderAs="span">
                                  <Link href="/stream" passHref>
                                      <FaStream />
                                      &nbsp; Stream
                                  </Link>
                              </BulmaNavbar.Item>
                          </BulmaNavbar.Link>
                          <BulmaNavbar.Dropdown>
                              <BulmaNavbar.Item>
                                  <p
                                      style={{
                                          color: "#7a7a7a",
                                          letterSpacing: ".1em",
                                          textTransform: "uppercase",
                                      }}
                                  >
                                      Regles
                                  </p>
                              </BulmaNavbar.Item>
                              <BulmaNavbar.Item renderAs="span">
                                  <Link href="/rule">
                                      <FaPencilRuler />
                                      &nbsp; Mes règles
                                  </Link>
                              </BulmaNavbar.Item>
                              <BulmaNavbar.Item renderAs="span">
                                  <Link href="/rule/form">
                                      <FaPenSquare />
                                      &nbsp; Formulaire de création
                                  </Link>
                              </BulmaNavbar.Item>
                          </BulmaNavbar.Dropdown>
                      </BulmaNavbar.Item>
                  </>
              ) : null}


          </BulmaNavbar.Container>

          <div className="navbar-end">
            {isSuperAccount ? (
              <>
                  <BulmaNavbar.Item renderAs="span">
                      <Link href="/admin" passHref>
                          <FaUserTie />
                          &nbsp; Gestion administrateur
                      </Link>
                  </BulmaNavbar.Item>
              </>
            ) : null}

            {isAccountLogged ? (
              <>
                <BulmaNavbar.Item
                  renderAs="a"
                  className="has-dropdown is-hoverable"
                >
                  <BulmaNavbar.Link>
                    <BulmaNavbar.Item renderAs="span">
                      <Link href="/account" passHref>
                          <FaUser />
                        &nbsp;Compte utilisateur
                      </Link>
                    </BulmaNavbar.Item>
                  </BulmaNavbar.Link>
                  <BulmaNavbar.Dropdown>
                    <BulmaNavbar.Item renderAs="span">
                      <Link href="/logout" passHref>
                          <FaPowerOff />
                        &nbsp;Déconnexion
                      </Link>
                    </BulmaNavbar.Item>
                  </BulmaNavbar.Dropdown>
                </BulmaNavbar.Item>
              </>
            ) : (
              <BulmaNavbar.Item renderAs="span">
                    <BulmaNavbar.Item renderAs="a">
                      <Link href="/signup" passHref>
                        Inscription
                      </Link>
                    </BulmaNavbar.Item>
                  <BulmaNavbar.Item renderAs="a">
                      <Link href="/login" passHref>
                        Connexion
                      </Link>
                  </BulmaNavbar.Item>
                </BulmaNavbar.Item>
            )}
          </div>
        </BulmaNavbar.Menu>
      </div>
    </BulmaNavbar>
  );
};
