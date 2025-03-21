import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

function About() {
  return (
    <div className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-purple-50 to-white">
      <NavBar />
      
      <div id="content" className="mt-7 flex-grow">
        <main className="w-full flex items-center justify-center">
          <article className="md:w-3/4 bg-white p-10 mb-10 rounded-2xl shadow-lg border border-gray-200">
            <h1 className="text-black text-5xl font-extrabold text-center py-5 mb-5 border-b border-gray-300">
              ¿QUIÉNES SOMOS?
            </h1>
            <div className="py-10 text-gray-700 text-lg leading-relaxed">
              <p className="text-justify mb-4">
                En la pretensión de una educación renovada y constante en el tiempo, la asociación <span className="font-semibold text-purple-700">Paidago</span> busca reivindicar los procesos formativos hacia lo realmente humano; reconstruyendo lo establecido para arar el camino de la creatividad y la genialidad. 
              </p>
              <p className="text-justify">
                Para esto, compartimos ideas fundamentales de la pedagogía a través del <span className="font-semibold text-purple-700">asesoramiento</span>, <span className="font-semibold text-purple-700">acompañamiento virtual</span>, <span className="font-semibold text-purple-700">encuentros académicos</span> y la <span className="font-semibold text-purple-700">producción visual</span>.
              </p>
            </div>
          </article>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;
