import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import DailyQuote from "../components/DailyQuote"

function Home() {

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Encabezado con Hero Section */}
            <header className="relative">
                <NavBar />
                <div id="homeImage" className="w-full h-screen flex flex-col items-center justify-center bg-cover bg-fixed bg-no-repeat relative" style={{ backgroundImage: "url('https://image.freepik.com/foto-gratis/ninos-jugando-futbol-soccer_1150-3902.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="z-10 text-center text-white font-bold">
                        <h1 className="text-7xl md:text-9xl drop-shadow-lg tracking-wide animate-fade-in">
                            PAIDAGO
                        </h1>
                        <p className="text-xl md:text-2xl mt-4 px-4 max-w-2xl mx-auto animate-slide-up">
                            <span className="word">LA PEDAGOGÍA EN LA RECONSTRUCCIÓN DEL SER HUMANO</span>
                        </p>
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="w-full flex flex-col items-center my-12">
                <article className="md:w-3/4 bg-white p-12 rounded-2xl shadow-2xl transition-transform transform hover:scale-[1.02]">
                    <div className="entry-content text-center">
                        {/* Frase inspiradora */}
                        <figure className="border-l-4 border-blue-600 pl-5 py-4 italic text-gray-700 text-lg animate-fade-in">
                            <p>“El mundo es profundo, mucho más profundo de lo que nunca pensara el día. No a todo le es lícito tener palabras antes del día.”</p>
                            <cite className="text-xl font-semibold block mt-2 text-gray-900">— F. Nietzsche</cite>
                        </figure>

                        {/* Título principal */}
                        <h1 className="text-blue-800 text-6xl font-extrabold mt-8 tracking-tight animate-slide-up">RECREANDO LA EDUCACIÓN</h1>

                        {/* Imagen con mejor presentación */}
                        <div className="flex justify-center mt-6">
                            <img
                                src="https://ciec.edu.co/wp-content/uploads/2024/07/Recrear-las-Escuelas-con-Identidad.jpg"
                                alt="Educación en acción"
                                className="w-3/4 md:w-1/2 rounded-lg shadow-lg animate-zoom-in"
                            />
                        </div>

                        {/* Descripción con mejor tipografía */}
                        <p className="text-gray-700 text-lg mt-8 leading-relaxed max-w-3xl mx-auto animate-fade-in">
                            En la búsqueda por optimizar las ideas y acciones para objetivos educativos,
                            <strong className="text-blue-700"> la presente página es un acompañante confiable en cada uno de los momentos de la planeación y ejecución de los encuentros académicos</strong>.
                            Según la metodología del docente en cada caso, en cada consulta y/o en cada elaboración de actividades institucionales,
                            <em className="text-blue-600"> Paidagó</em> será un asistente que se reconstruye, deviene en el aprendizaje.
                        </p>

                        {/* Redes sociales con botón más atractivo */}
                        <div className="flex flex-col items-center justify-center mt-10 animate-slide-up">
                            <p className="text-gray-900 text-lg font-bold">VISÍTANOS EN LAS SIGUIENTES REDES:</p>
                            <a
                                href="https://www.instagram.com/paidag0/"
                                target="_blank"
                                className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform flex items-center space-x-2"
                            >
                                <i className="fab fa-instagram text-2xl"></i>
                                <span>Instagram</span>
                            </a>
                        </div>
                    </div>
                </article>
            </main>

            {/* Footer y frase diaria */}
            <Footer />
            <DailyQuote />
        </div>
    );
}

export default Home