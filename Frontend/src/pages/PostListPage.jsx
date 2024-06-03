import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const BASE_URL = 'https://ui-task2.onrender.com';
const PostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchMorePosts();
    }, []);

    const fetchMorePosts = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'x-auth-token': token
            }
        };

        try {
            const res = await axios.get(`${BASE_URL}/api/posts/`, config);
            setPosts(prevPosts => [...prevPosts, ...res.data]);
            if (res.data.length === 0) setHasMore(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-full bg-gradient-to-b from-purple-300 to-blue-500">
            <h2 className="text-center text-3xl font-extrabold text-purple-800 p-6">Awesome Posts</h2>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMorePosts}
                hasMore={hasMore}
                loader={<h4 className="text-center text-white">Loading...</h4>}
                endMessage={
                    <p className="text-center text-white">
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center p-2">
                    {posts.map((post) => (
                        <div key={post._id} className=" bg-slate-300 rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
                            <div className="p-6">
                                <h3 className="text-lg font-bold font-serif text-purple-800 mb-2">{post.title}</h3>
                                <p className="text-black line-clamp-3">{post.content}</p>
                                <p className="text-gray-600 line-clamp-3">By {post.by}</p>
                            </div>
                            <div className="px-6 py-4 bg-purple-200">
                                <button className="text-sm text-purple-800 hover:text-black bg-transparent border border-purple-800 py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none">
                                    Read More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default PostListPage;
