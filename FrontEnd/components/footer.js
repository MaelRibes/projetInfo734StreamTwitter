import {
  Container,
  Footer as FooterBulma, Icon,
  Level,
} from "react-bulma-components";
import {FaTwitter} from "react-icons/fa";

/**
 * Le footer de l'application
 */
export const Footer = () => {
  return (
    <FooterBulma>
      <Container>
        <Level>
          <Level.Item>
            <p>
              <Icon>
                <img
                    alt="TweetDash"
                    src="/favicon.ico"
                    height="20"
                    width="20"
                />
              </Icon>
              <strong>TweetDash</strong> &copy; 2022
              <a href="https://github.com/xerox123dshdhwx"> BOUGHANMI Rami, </a>
              <a href="https://github.com/MaelRibes"> RIBES Maël, </a>
              <a href="https://github.com/AlexWallerand"> WALLERAND Alex</a>
            </p>
          </Level.Item>
        </Level>
      </Container>
    </FooterBulma>
  );
};
