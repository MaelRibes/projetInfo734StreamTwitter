import Link from 'next/link';
import Layout from '../components/Layout';




Post.getInitialProps = async function(context) {
    const { id } = context.query;
    const post = await res.json();

    return { post };
};


const Post = (props) => {
    return (
        <Layout>
            <h1>{props.post.title}</h1>
            <p>{props.post.body}</p>
        </Layout>
    );
}

export default Post;
