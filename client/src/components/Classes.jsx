import { useState } from "react";
import CardCarousel from "./CardCarousel.jsx"
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function ClassesCarousel({ clases }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedClass, setSelectedClass] = useState(null);
    const itemsPerPage = 5;

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

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={handlePrev} disabled={currentIndex === 0}>Anterior</button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clases.slice(currentIndex, currentIndex + itemsPerPage).map((clase, index) => (
                        <CardCarousel key={index} onClick={() => handleCardClick(clase)} className="cursor-pointer hover:shadow-xl" title={clase.topic} competence={clase.competence} />
                    ))}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleNext} disabled={currentIndex + itemsPerPage >= clases.length}>Siguiente</button>
            </div>

            {selectedClass && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                        <h2 className="text-xl font-bold mb-4">{selectedClass.tema}</h2>
                        <p><strong>Competencia:</strong> {selectedClass.competencia}</p>
                        <p><strong>Metodología:</strong> {selectedClass.metodologia}</p>
                        <p><strong>Herramientas:</strong> {selectedClass.herramientas}</p>
                        <p><strong>Clase Generada:</strong> {selectedClass.claseGenerada}</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setSelectedClass(null)} className="bg-red-500 text-white">Cerrar</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default ClassesCarousel;
