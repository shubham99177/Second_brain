import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';

function SharedContent() {
    const { hash } = useParams();
    const [sharedata, setSharedata] = useState([]);

    async function getsharedata() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/users/brain/${hash}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        setSharedata(response.data.content);
        console.log(response.data);
    }

    useEffect(() => {
        getsharedata();


    }, []);



    return (
        <div>
            {sharedata.map((item) => (
                <iframe key={item._id} src={item.link} frameborder="0"></iframe>
            ))}
        </div>
    )
}

export default SharedContent
