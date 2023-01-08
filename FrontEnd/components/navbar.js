import {Navbar as BulmaNavbar, Tag} from "react-bulma-components";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {FaPowerOff, FaUser, FaPencilRuler, FaPenSquare, FaStream, FaUserTie, FaChartBar} from "react-icons/fa";
const {checkIfAccountLogged} = require("../utils/utils.js"); 

export const Navbar = ({ router }) => {

  const [isActive, setIsActive] = useState(false);
  const [isAccountLogged, setIsAccountLogged] = useState(true);
  const [isSuperAccount, setIsSuperAccount] = useState(true);
  const [lastPage, setLastPage] = useState(
    router === null ? undefined : router.pathname
  );
  const [isTokenSet, setIsTokenSet] = useState(true);
  const [isStreamConnected, setIsStreamConnected] = useState(true);

  useEffect(() => {
    if (router !== null && router.pathname !== lastPage) {
      setLastPage(router.pathname);
    }
  });

  useEffect(() => {
    (async () => {

        try {
            const isAccountLoggedData = await checkIfAccountLogged();
            setIsAccountLogged(isAccountLoggedData.isAccountLogged);
            setIsSuperAccount(isAccountLoggedData.isSuperAccount);
            setIsTokenSet(isAccountLoggedData.isTokenSet);
            setIsStreamConnected(isAccountLoggedData.isStreamConnected);
        }
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
            <BulmaNavbar.Item href="/">
                <img
                    alt="TweetDash"
                    src="/logo.png"
                    width="120"
                />
            </BulmaNavbar.Item>
        </BulmaNavbar.Brand>
          <div className="navbar-start">
              {isAccountLogged ? (
                  <>
                      {isTokenSet ? (
                              <>
                              <BulmaNavbar.Item renderAs="span">
                                  <Link href="/dashboard" passHref>
                                      <FaChartBar />
                                      &nbsp; Dashboard
                                  </Link>
                              </BulmaNavbar.Item>

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

                              {isStreamConnected ? (<BulmaNavbar.Item><Tag color="primary">Le stream est connecté</Tag></BulmaNavbar.Item>) :
                                  (<BulmaNavbar.Item><Tag color="danger">Le stream est déconnecté</Tag></BulmaNavbar.Item>)}
                          </>
                      ) : (
                          <>
                              <BulmaNavbar.Item><Tag color="danger">Veuillez renter un token pour pouvoir utiliser toutes les fonctionnalités</Tag> </BulmaNavbar.Item>
                          </>
                      )}
                  </>
              ) : null}
          </div>

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
      </div>
    </BulmaNavbar>
  );
};
