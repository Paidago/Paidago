import NavBar from "../components/NavBar"
import { Link } from "react-router-dom"
import '../style/home.css'
import Footer from "../components/Footer"
import DailyQuote from "../components/DailyQuote"

function Home(){

    return(
        <>
            <header className="">
                    <NavBar />
                        <div id="homeImage" className="w-full h-screen flex flex-col items-center justify-center">
                            <div className="w-full flex flex-col items-center justify-center text-white font-bold">
                                <h1 className="text-9xl">
                                    PAIDAGO
                                </h1>            
                                    <p className="text-2xl" >
                                        <span className=" word">LA PEDAGOGÍA EN LA RECONSTRUCCIÓN DEL SER HUMANO</span>
                                </p>
                            </div>
                        </div>
                </header>
            <div className="flex flex-col justify-between">
                <main className="w-full flex items-center justify-center my-7">
                    <article className="md:w-3/4 bg-slate-100 p-6">
                        <div className="entry-content">
                            <figure className="border-y-4 text-center border-black py-7 mb-7">
                                <p className="leading-loose text-lg">El mundo es profundo, mucho más profundo de lo que nunca pensara el día. No a todo le es lícito tener palabras antes del día.”</p>
                                <cite className="text-xl">— F. Nietzsche</cite>
                            </figure>

                            <h1 className="text-black text-6xl font-bold">RECREANDO LA EDUCACIÓN</h1>

                            <figure className="wp-block-image size-large">
                                <img decoding="async" width="1024" height="683" src="https://paidago.net/wp-content/uploads/2023/04/DSC_6752-1-1024x683.jpg" alt="" className="wp-image-71" sizes="(max-width: 1024px) 100vw, 1024px" />
                            </figure>

                            <p className="text-center leading-loose text-lg mt-7">En la búsqueda por optimizar las ideas y acciones para objetivos educativos, <strong>la presente página es una acompañante confiable en cada uno de los momentos de la planeación y ejecución de los encuentros académicos</strong>; según la metodología del docente en cada caso, en cada consulta y/o en cada elaboración de actividades institucionales <em>Paidag</em>ó será un asistente que se reconstruye, deviene en el aprendizaje.</p>

                            <p className="text-center leading-loose text-lg mt-7 font-bold">VISÍTANOS EN LAS SIGUIENTES REDES:</p>
                            <ul className="wp-block-social-links aligncenter is-layout-flex">
                                <li className="wp-social-link wp-social-link-youtube wp-block-social-link"><Link to="" className=""></Link></li>
                            </ul>
                        </div>
                    </article>		
                </main>
                
                <Footer/>
                <DailyQuote/>
            </div>
        </>
    )
}

export default Home