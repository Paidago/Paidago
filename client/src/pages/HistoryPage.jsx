import { getAllActivities } from "../api/activity"
import { useForm } from 'react-hook-form'
import { useState, useEffect } from "react"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"

function History() {
    const { register } = useForm()
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
        <MainLayout>
            <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} />
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
        </MainLayout>
    )
}

export default History