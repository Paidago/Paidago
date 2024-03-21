import { useEffect, useState } from "react"
import { getPosts } from "../api/resource.js"
import Layout from "../Layout/MainLayout.jsx"

function QuotesPage() {
    const [ posts, setPosts ] = useState([])

    const fetchposts = async () => {
    try {
        const posts = await getPosts()
        //console.log(posts)
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
        <ul className="justify-center items-center flex flex-wrap gap-2">
            { posts && posts.map(post => (
                post.media_type !== 'VIDEO' && 
                <li className="max-w-80 min-w-56 flex-grow " key={post.id}>
                    <img src={post.media_url} alt={post.media_type} className="w-auto h-auto" />
                </li>
            ))}
        </ul>        
    </Layout>
  )
}

export default QuotesPage