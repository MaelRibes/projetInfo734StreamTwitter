import {
  Container,
  Footer as FooterBulma,
  Level,
} from "react-bulma-components";

/**
 * Le footer de l'application
 */
export const Footer = () => {
  return (
    <FooterBulma>
      <Container>
        <Level>
          <Level.Item>
            <small className="level-item">TwitterDashboard &copy; 2022 BOUGHANMI Rami RIBES Maël WALLERAND Alex</small>
          </Level.Item>
        </Level>
      </Container>
    </FooterBulma>
  );
};
