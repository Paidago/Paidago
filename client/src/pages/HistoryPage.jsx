import { getAllActivities, getActivitiesBySubject } from "../api/activity";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MainLayout from "../Layout/MainLayout";
import SubjectsSelect from "../components/SubjectsSelect.jsx";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import ClassesCarousel from "../components/Classes.jsx";

function History() {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const [activities, setActivities] = useState([]);


    const onSubmit = handleSubmit(async ({ subject }) => {
        try {
            let res = subject === "Todas"
                ? await getAllActivities(localStorage.getItem("token"))
                : await getActivitiesBySubject({ subject, token: localStorage.getItem("token") });

            setActivities(res.data);
        } catch (err) {
            console.error("Error al obtener actividades:", err);
        }
    });

    return (
        <MainLayout>
            <div className="max-w-3xl mx-auto px-6 py-8">
                <form onSubmit={onSubmit} className={`bg-white shadow-md rounded-lg p-6 mb-6 ${!user && "blur-sm"}`}>
                    <label className="block text-gray-700 font-semibold mb-2">Filtra las clases por asignatura:</label>
                    <SubjectsSelect register={register} className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        <option value="Todas">Todas</option>
                    </SubjectsSelect>
                    <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                        Filtrar
                    </button>
                </form>

                {user && activities.length > 0 && <ClassesCarousel clases={activities} type='activity' />}
                {user && activities.length === 0 && <p className="text-center text-gray-600 mt-6">No hay actividades disponibles.</p>}
                {!user && (
                    <Modal message="Debes haber iniciado sesión para ver tu historial">
                        <Link to="/login" className="bg-purple-500 w-24 text-center text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-purple-700 transition">
                            Iniciar sesión
                        </Link>
                    </Modal>
                )}
            </div>
        </MainLayout>
    );
}

export default History;
