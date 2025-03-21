import { useState } from "react";
import { jsPDF } from "jspdf";

function PDF({ examData }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        instituteName: "",
        examDate: "",
        teacherName: "",
        logo: null,
        imgType: "",
        imgName: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        let yOffset = 20; // Posición inicial en la página
        const maxHeight = 270; // Límite de la página antes de añadir una nueva

        // 🏷️ 1. Agregar el logo si existe
        if (formData.logo) {
            pdf.addImage(formData.logo, formData.imgType === 'image/png' ? "PNG" : "JPG", 170, 5, 30, 30);
        }

        // 🏷️ 2. Encabezado
        pdf.setFontSize(18);
        pdf.text(formData.instituteName || "Instituto", 105, yOffset, { align: "center" });

        pdf.setFontSize(14);
        pdf.text(`Docente: ${formData.teacherName}`, 20, (yOffset += 20));
        pdf.text(`Fecha: ${formData.examDate}`, 140, yOffset);

        pdf.setFontSize(12);
        pdf.text("Nombre del estudiante: ____________________________", 20, (yOffset += 10));

        pdf.line(10, (yOffset += 5), 200, yOffset);
        yOffset += 15;

        // 🏷️ 3. Párrafo base con el formato deseado
        if (examData.paragraph) {
            pdf.setFontSize(12);
            pdf.text("Párrafo base", 20, yOffset); // Encabezado del párrafo
            yOffset += 6;

            pdf.setFontSize(11);
            const paragraphLines = pdf.splitTextToSize(examData.paragraph, 180);
            const paragraphHeight = paragraphLines.length * 6;

            if (yOffset + paragraphHeight > maxHeight) {
                pdf.addPage();
                yOffset = 20;
            }

            pdf.text(paragraphLines, 20, yOffset);
            yOffset += paragraphHeight;
        }

        // 🏷️ 4. Preguntas y Opciones con salto de página
        examData.questions.forEach((q, index) => {
            pdf.setFontSize(11);
            const questionLines = pdf.splitTextToSize(q.statement, 180);
            const questionHeight = questionLines.length * 6;

            if (yOffset + questionHeight > maxHeight) {
                pdf.addPage();
                yOffset = 20;
            }
            pdf.text(questionLines, 10, yOffset);
            yOffset += questionHeight + 3;

            q.options.forEach((option, i) => {
                pdf.setFontSize(10);
                const optionText = `${String.fromCharCode(97 + i)}) ${option}`;
                const optionLines = pdf.splitTextToSize(optionText, 170);
                const optionHeight = optionLines.length * 6;

                if (yOffset + optionHeight > maxHeight) {
                    pdf.addPage();
                    yOffset = 20;
                }
                pdf.text(optionLines, 15, yOffset);
                yOffset += optionHeight + 3;
            });

            yOffset += 12;
        });

        pdf.save("Examen.pdf");
        setShowModal(false);
    };



    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, imgName: file.name, logo: reader.result, imgType: file.type }); // Guardar la imagen en base64
            };
        }
    };



    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
                Descargar Examen en PDF
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-97">
                        <h2 className="text-xl font-bold mb-4">Personalizar Encabezado</h2>

                        <input type="text" name="instituteName" placeholder="Nombre del instituto"
                            value={formData.instituteName} onChange={handleChange}
                            className="w-full p-2 border rounded mb-2" />

                        <input type="text" name="teacherName" placeholder="Nombre del docente"
                            value={formData.teacherName} onChange={handleChange}
                            className="w-full p-2 border rounded mb-2" />

                        <input type="date" name="examDate"
                            value={formData.examDate} onChange={handleChange}
                            className="w-full p-2 border rounded mb-2" />

                        <div className="flex flex-col items-center justify-center w-full">
                            <label className="mb-2 text-sm font-medium text-gray-700">
                                Ingresa el logo de tu institución
                            </label>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                Seleccionar archivo
                            </label>
                            <span className="text-sm text-gray-600">
                                {formData.imgName || "No se ha seleccionado archivo"}
                            </span>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>




                        {/* 📌 Botones */}
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setShowModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded">
                                Cancelar
                            </button>
                            <button onClick={generatePDF}
                                className="bg-green-500 text-white px-4 py-2 rounded">
                                Generar PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PDF;