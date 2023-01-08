import {Panel} from "react-bulma-components";
import {TweetPreview} from "./tweetPreview";

export const TweetList = ({tweets}) => {
    return (
        <Panel>
            {tweets.map((tweet) => <TweetPreview key={tweet.id} tweet={tweet}/>).reverse()}
        </Panel>
    );
}