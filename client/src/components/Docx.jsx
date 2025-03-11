import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";

function Docx({ examData }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        instituteName: "",
        examDate: "",
        teacherName: "",
        logo: null,
        imgName: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({ ...formData, logo: reader.result, imgName: file.name });
            };
        }
    };

    const generateWord = async () => {
        const docContent = [
            new Paragraph({
                children: [
                    new TextRun({ text: formData.instituteName || "Instituto", bold: true, size: 32 }),
                ],
                alignment: "center"
            }),
            new Paragraph({
                children: [
                    new TextRun(`Docente: ${formData.teacherName}`),
                    new TextRun(`    Fecha: ${formData.examDate}`),
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun("Nombre del estudiante: ____________________________")
                ]
            }),
            new Paragraph({ children: [] }),
            new Paragraph({
                children: [
                    new TextRun("Párrafo base:")
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun(examData.paragraph || "")
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun("")
                ]
            })
        ];

        examData.questions.forEach((q, index) => {
            docContent.push(new Paragraph({
                children: [new TextRun(q.statement)]
            }));

            q.options.forEach((option, i) => {
                docContent.push(new Paragraph({
                    children: [new TextRun(`${String.fromCharCode(97 + i)}) ${option}`)]
                }));
            });

            docContent.push(new Paragraph({
                children: [new TextRun(q.correctAnswer)]
            }));

            docContent.push(new Paragraph({ children: [ new TextRun("") ] }));
        });

        const doc = new Document({
            sections: [{ children: docContent }]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, "Examen.docx");
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
            >
                Descargar Examen en Word
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-97">
                        <h2 className="text-xl font-bold mb-4">Personalizar Encabezado</h2>

                        <input type="text" name="instituteName" placeholder="Nombre del instituto"
                            value={formData.instituteName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

                        <input type="text" name="teacherName" placeholder="Nombre del docente"
                            value={formData.teacherName} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

                        <input type="date" name="examDate"
                            value={formData.examDate} onChange={handleChange} className="w-full p-2 border rounded mb-2" />

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

                        <div className="flex justify-between mt-4">
                            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                            <button onClick={generateWord} className="bg-green-500 text-white px-4 py-2 rounded">Generar Word</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Docx;
