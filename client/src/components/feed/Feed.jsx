import { useEffect, useState } from 'react';
import './feed.css';
import Share from '../share/Share';
import axios from 'axios';

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("posts/timeline/61a524feb6b61142f66cb0e8");
            console.log(res);
        }
        
        fetchPosts();
    }, []);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {/* { Posts.map((p) => (
                    <Post key={ p.id } post={ p } />
                )) } */}
            </div>
        </div>
    );
}