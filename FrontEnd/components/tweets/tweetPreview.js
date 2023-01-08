import {Button, Card, Level, Tag} from "react-bulma-components";
import {FaTwitter} from "react-icons/fa";

export const TweetPreview = ({tweet}) => {

    return (
        <Card style={{marginBottom: "0.5rem"}}>
            <Card.Content>
                {tweet.rules.map(rule => {
                    return <Tag color="primary">{rule.tag}</Tag>
                })
                }
                <Level>
                    <Level.Side align="left">
                        <b>{tweet.author}:</b>
                    </Level.Side>
                    &nbsp; &nbsp; <p>{tweet.text}</p>
                    <Level.Side align="right">
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