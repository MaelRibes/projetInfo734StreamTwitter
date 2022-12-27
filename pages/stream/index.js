import io from 'socket.io-client';
import {useState, useEffect} from 'react';
import axios from 'axios';


function MyPage() {
    const [data, setData] = useState([]);

    async function startStream() {
        try {
            await axios.get('http://localhost:3000/postrules/France');
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        (async ()=>{
            await  startStream()
        })()
        const socket = io('http://localhost:3000');

        socket.on('twitter', tweet => {
            setData([...data, tweet]);
        });

        return ()=>{
           socket.disconnect()
        }
    }, []);
    return (
        <div>
            {data.map((tweet) => {
                return <p>{JSON.stringify(tweet)}</p>
            })}
        </div>
    );
}

export default MyPage;