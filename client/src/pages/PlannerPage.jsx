import { useEffect, useState } from "react"
import { createActivity } from "../api/activity"
import Carousel from "../components/CarouselPlanner"
import { useForm } from 'react-hook-form'
import Card from "../components/CardCarousel"
import PayPalPayment from '../components/PayPalPayment.jsx'
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import Modal from "../components/Modal.jsx"
import MainLayout from "../Layout/MainLayout"
import SubjectsSelect from "../components/SubjectsSelect.jsx"

function Planner() {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const [activity, setActivity] = useState([])
    const [file, setFile] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onSubmit = handleSubmit(async info => {
        const res = await createActivity({ ...info, token: window.localStorage.getItem('token') })
        setActivity(res.data.generatedClass.split('\n\n').map(a => a.split(':')))
    })

    return (
        <MainLayout >
            <figure className="border-y-4 text-center border-black py-7 mb-7">
                <p className="leading-loose text-xl">&#34;La verdadera dirección del desarrollo del pensamiento no es de lo invididual a lo social, sino de lo social a lo individual.&#34;</p>
                <cite className="text-xl">—L. Vygotsky—</cite>
            </figure>

            <form id="form-clase" className={`container mx-auto p-8 bg-slate-200 rounded-lg shadow-md text-black  ${!user && 'blur-lg'}`} onSubmit={onSubmit}>
                <h2 className="text-2xl font-bold mb-4 text-center uppercase">Crea tu clase!!</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="filtro-metodologias" className="block text-black">Metodologia</label>
                        <select className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm bg-white" {...register("methodology", { required: true })}>
                            <option value="Constructivismo">Constructivismo</option>
                            <option value="Conductismo">Conductismo</option>
                            <option value="Aprendizaje Basado en Proyectos (ABP)">Aprendizaje Basado en Proyectos (ABP)</option>
                            <option value="Aprendizaje por Competencias">Aprendizaje por Competencias</option>
                            <option value="Aprendizaje cooperativo">Aprendizaje cooperativo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="temaClase" className="block text-black">Tema</label>
                        <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" placeholder="Tema" {...register("topic", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="competenciaClase" className="block text-black">Competencia</label>
                        <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" placeholder="Competencia" {...register("competence", { required: true })} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="asignatura" className="block text-black">Asignatura</label>
                        <SubjectsSelect className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm" register={register} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="herramientasClase" className="block text-black">Herramientas</label>
                        <textarea className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm resize-none min-h-20 placeholder:text-black" placeholder="Ingrese las herramientas con las que dispone para realizar la clase, Ej: Globos, ramas, espacio abierto, etc"
                            {...register("tools", { required: false })}></textarea>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-xl border border-black">
                        <h2 className="mb-4" >¿Deseas crear tu clase a partir de un pdf? Insertalo!!</h2>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} className="bg-blue-500 text-white py-2 px-4 rounded-md" />
                    </div>
                </div>
                <div className="mt-4">
                    <button id="btn-generador" className="bg-blue-500 text-white py-2 px-4 rounded-md">Generar clase</button>
                    <span className="loader ml-2" id="loader"></span>
                </div>
            </form>

            {
                activity.length > 0 && <Carousel >
                    {activity.map((acti, index) => <Card key={index} title={acti[0]} description={acti[1]} />)}
                </Carousel>
            }

            {!user &&
                <Modal message='Debes haber iniciado sesion para usar el planeador'>
                    <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                </Modal>
            }


            {user && !user.paymentID && (
                <Modal message='Para hacer uso del planeador debes adquirir nuestra membresia!!'>
                    <PayPalPayment />
                </Modal>
            )}
        </MainLayout>
    )
}

export default Planner