import { getAllActivities } from "../api/activity"
import { useState, useEffect } from "react"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

function History() {
    const [ activities, setActivities ] = useState([])

    const getActivities = async () => {
        try {
            const res = await getAllActivities(window.localStorage.getItem('token'))
            setActivities(res.data)
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getActivities()
    },[])

    return (
        <div className="flex flex-col justify-between items-center">
            <NavBar />
                <main className={`relative md:w-3/4 bg-white p-6 my-10 `}>
                    {
                        activities && activities.map(activity => (
                            <li key={activity._id}>
                                <p>{activity.methodology}</p>
                                <p>{activity.topic}</p>
                                <p>{activity.competence}</p>
                                <p>{activity.subject}</p>
                                <p>{activity.tools}</p>
                                <p>{activity.generatedClass}</p>
                            </li>
                        ))
                    }
                </main>
            <Footer />
        </div>
    )
}

export default History