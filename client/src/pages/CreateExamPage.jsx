import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { createExam } from "../api/exam.js"

function CreateExam(){
    const { register, handleSubmit } = useForm()
    const [ exam, setExam ] = useState([])


    const onSubmit = handleSubmit(async data => {
        console.log(data)
        const res = await createExam({...data, token: window.localStorage.getItem('token')})
        console.log(res)
        setExam(res.data)
    }) 

    return(
        <MainLayout>
            <div>
                <h1>CREA UN EXAMEN!!</h1>
                <p>Con las clases que has creado puedes crear un examen como desees</p>

                <form onSubmit={onSubmit} className='container mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black'>
                    <div>
                        <label htmlFor="name">Primero filtra las clases por asignatura para que sea mas organizado</label>
                        <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} />
                    </div>
                    <div>
                        <label htmlFor="especificaciones">
                            Primero debemos saber las especificaciones del examen, por ejemplo la cantidad de preguntas, cuantas de seleccion multiples o cuantas abiertas
                        </label>
                        <textarea placeholder="Escribe las especificaciones del examen" name="especificaciones" { ...register( "especifications", { required: true } ) }></textarea>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Crear examen</button>
                    </div>
                </form>
            </div>
            {
                exam && (
                    <div>
                        <h1>TU EXAMEN HA SIDO CREADO!!!</h1>
                        <p>{exam}</p>
                    </div>
                )
            }
        </MainLayout>
    )
}

export default CreateExam