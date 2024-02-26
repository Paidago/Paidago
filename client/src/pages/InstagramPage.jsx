import { useEffect, useState } from "react"
import { getPosts } from "../api/resource.js"
import Layout from "../Layout/MainLayout.jsx"

function InstagramPage() {
    const [ posts, setPosts ] = useState([])

    const fetchposts = async () => {
    try {
        const posts = await getPosts()
        console.log(posts)
        setPosts(posts.data.data)
    } catch (error) {
        console.log(error)
    }
    }
    useEffect(() => {
        fetchposts()
    },[])
  return (
    <Layout>
        <ul>
            { posts && posts.map(post => (
                <li key={post.id}>
                    <img src={post.media_url} alt={post.media_type} />
                    <p>{post.caption}</p>
                </li>
            ))}
        </ul>        
    </Layout>
  )
}

export default InstagramPage