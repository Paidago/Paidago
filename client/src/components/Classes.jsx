import { useState } from "react";
import CardCarousel from "./CardCarousel.jsx"

function ClassesCarousel({ clases }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedClass, setSelectedClass] = useState(null);
    const itemsPerPage = 6;

    const handleNext = () => {
        if (currentIndex + itemsPerPage < clases.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const handleCardClick = (clase) => {
        setSelectedClass(clase);
    };

    const methodologies = [
        { nombre: "Constructivismo", secciones: ["Problematización", "Exploración", "Comprensión", "Creación", "Evaluación"] },
        { nombre: "Conductismo", secciones: ["Motivación", "Explicación", "Simulación", "Demostración", "Ejercitación", "Evaluación"] },
        { nombre: "Aprendizaje Basado en Proyectos (ABP)", secciones: ["Motivación", "Problema", "Explicación", "Hipótesis", "Problematización", "Conclusiones", "Afirmaciones"] },
        { nombre: "Aprendizaje por Competencias", secciones: ["Introducción", "Demostración", "Comprensión (Didáctica del Juego)", "Ejercitación", "Evaluación"] },
        { nombre: "Aprendizaje Cooperativo", secciones: ["Problematización", "Asignación de Temáticas", "Diálogo de Hipótesis", "Conclusiones"] }
    ];

    const highlightUppercaseWords = (activity) => {
        console.log(activity);
        const formattedText = activity.generatedClass
            .replace(/\n+/g, " ")
            .replace(/\*\*/g, " ")
            .replace(/:/g, ": ")
            .replace(/\s+/g, " ")
            .trim()
            .split(" ")
            .filter(word => word !== "");

        const metodologia = methodologies.find(m => m.nombre === activity.methodology);
        const secciones = metodologia?.secciones.map(s => s.toUpperCase().concat(":")) || [];

        return formattedText.map((word, index) => (
            secciones.includes(word.trim()) ? (
                <span key={index} className="font-bold text-indigo-600">{word} </span>
            ) : (
                <span key={index} className="text-gray-700">{word} </span>
            )
        ));
    };


    return (
        <div className="flex flex-col items-center">
            {
                clases.length > 0 && (
                    <div className="flex items-center gap-4">
                        <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition text-2xl bold" onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {clases.slice(currentIndex, currentIndex + itemsPerPage).map((clase, index) => (
                                <CardCarousel key={index} onClick={() => handleCardClick(clase)} className="cursor-pointer hover:shadow-xl" title={clase.topic} competence={clase.competence} />
                            ))}
                        </div>
                        <button className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition ml-6 text-2xl bold" onClick={handleNext} disabled={currentIndex + itemsPerPage >= clases.length}>&gt;</button>
                    </div>
                )
            }

            {selectedClass && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                        <h2 className="text-xl font-bold mb-4">{selectedClass.topic}</h2>
                        <p><strong>Competencia:</strong> {selectedClass.competence}</p>
                        <p><strong>Metodología:</strong> {selectedClass.methodology}</p>
                        <p><strong>Herramientas:</strong> {selectedClass.tools}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{highlightUppercaseWords(selectedClass)}</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setSelectedClass(null)} className="bg-red-500 p-2 rounded-xl text-white">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClassesCarousel;
