import React from "react";
import { Footer } from "./footer";
import { useRouter } from "next/router";
import { Navbar } from "./navbar";

/**
 * Le wrapper pour "wrapper" les pages avec des éléments qui se retrouveront sur chaque page
 * @param children Les enfants qui sont en fait les pages
 */
export const LayoutWrapper = ({ children }) => {
  /**
   * Le router
   */
  const router = useRouter();

  return (
    <>
      <Navbar router={router} />
      <div className="mainContent">{children}</div>
      <Footer />
    </>
  );
};
