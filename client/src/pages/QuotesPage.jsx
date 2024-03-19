import { useEffect, useState } from "react"
import { getPosts } from "../api/resource.js"
import Layout from "../Layout/MainLayout.jsx"

function QuotesPage() {
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
                    {
                        post.media_type === 'VIDEO' ? (<p>{post.caption.split('\n\n')[1]}</p>) : (
                            <>
                                <p>{post.caption.split('\n\n')[1]}</p>
                                <img src={post.media_url} alt={post.media_type} />
                            </>
                        )
                    }
                    
                </li>
            ))}
        </ul>        
    </Layout>
  )
}

export default QuotesPage