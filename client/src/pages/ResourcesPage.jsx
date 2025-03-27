import MainLayout from "../Layout/MainLayout"

function Resources(){

    return(
        <MainLayout>
            <h1 className="text-black text-6xl font-bold leading-normal">RECURSOS</h1>
                <h2 className="text-black text-2xl leading-normal mb-9">Te presentamos un esquema (V eurística) y cinco (5) momentos claves para la planeación de una clase desde el constructivismo:</h2>
            <div className="flex justify-between items-center gap-0">
                <figure className="w-1/2">
                    <img decoding="async" src="https://paidago.net/wp-content/uploads/2023/05/V-euristica-1-600x848-1.jpg" alt="" className="w-5/6" />
                </figure>
                            
                <div className="w-1/2">
                    <ol className="list-decimal text-black">
                        <li>
                            Activación del conocimiento previo: Comienza la clase o el encuentro académico mediante la activación del conocimiento previo de los estudiantes sobre el tema a tratar. Puedes utilizar preguntas, discusiones o actividades que permitan a los estudiantes reflexionar y compartir lo que ya saben. Lo fundamental aquí es el asombro.
                        </li>
                        <li>
                            Presentación de desafíos o problemas: Proporciona a los estudiantes desafíos o problemas relacionados con el tema de estudio. Estos desafíos deben estar adecuados a la zona de desarrollo próximo de los estudiantes; acorde a sus capacidades y proyecciones. 
                        </li>
                        <li>
                            Trabajo colaborativo: Fomenta el trabajo colaborativo entre los estudiantes. Promueve la interacción y el intercambio de ideas entre ellos, de manera que puedan construir conocimiento en conjunto. Puedes utilizar actividades grupales, discusiones en parejas o debates para fomentar la colaboración y la construcción conjunta de significado.
                        </li>
                        <li>
                            Apoyo y mediación del docente: El docente juega un papel clave en el proceso constructivista al proporcionar apoyo y mediación a los estudiantes. Observa el progreso de los estudiantes, brinda retroalimentación oportuna, realiza preguntas que estimulen el pensamiento crítico y ofrece orientación cuando sea necesario. El docente actúa como un guía que facilita el aprendizaje y el desarrollo de los estudiantes.
                        </li>
                        <li>
                            Reflexión: Al finalizar la clase o el encuentro académico, invita a los estudiantes a reflexionar sobre lo que han aprendido. Pídeles que identifiquen los conceptos clave, las estrategias utilizadas y cómo se han sentido en el proceso de aprendizaje.
                        </li>
                    </ol>
                </div>
            </div>

            <p className="text-black text-xl leading-normal mt-7">
                Los momentos que aquí se presentan son meramente especulativos. Sin embargo, se propone tener presentes algunas ideas allí expuestas, porque sólo es posible la construcción del aprendizaje a partir de una motivación constante hacia el fenómeno a conocer; sin esto se puede afirmar que no habría aprendizaje adquirido, y mucho menos competencias para comprender la actividad inmediata. 
            </p>
        </MainLayout>
    )
}

export default Resources