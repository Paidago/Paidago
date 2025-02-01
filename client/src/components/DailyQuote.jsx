import { useEffect, useState } from "react"
import { getPosts } from "../api/resource.js"

function DailyQuote() {
    const [ dailyQuote, setDailyQuote ] = useState( JSON.parse(window.localStorage.getItem('dailyQuote')) )

    const fetchdailyQuote = async () => {
        try {
            const { data: { data } } = await getPosts()
            let randomIndex = Math.floor( Math.random() * data.length )
            setDailyQuote( data.filter(post => post.media_type === 'CAROUSEL_ALBUM')[randomIndex] )
            window.localStorage.setItem('dailyQuote', JSON.stringify(dailyQuote))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if( !dailyQuote ){
            fetchdailyQuote()
            window.localStorage.setItem('dailyQuote', JSON.stringify(dailyQuote))
        }
    },[])

    useEffect(() => {
        window.localStorage.setItem('dailyQuote', JSON.stringify(dailyQuote))
    },[dailyQuote])

    return (
        <>
            { dailyQuote && <img className="w-44 absolute right-0 bottom-0" src={dailyQuote.media_url} /> }
        </>
    )
}

export default DailyQuote