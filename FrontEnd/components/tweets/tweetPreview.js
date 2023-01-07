import {Button, Card, Level} from "react-bulma-components";
import {FaTwitter} from "react-icons/fa";

export const TweetPreview = ({tweet}) => {

    return (
        <Card style={{marginBottom: "0.5rem"}}>
            <Card.Content>
                <Level>
                    <b>{tweet.author}: </b>
                    {tweet.text}
                    <Level.Side align="left">
                        <a href={`https://twitter.com/${tweet.author}/status/${tweet.id}`}>
                            <Button rounded color="info">
                                <FaTwitter />
                                &nbsp; Voir le tweet
                            </Button>
                        </a>
                    </Level.Side>
                </Level>
            </Card.Content>
        </Card>
    )
}