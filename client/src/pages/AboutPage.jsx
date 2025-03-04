import NavBar from "../components/NavBar"
// import '../style/home.css'
import Footer from "../components/Footer"
function About(){

    return (
      <div className="flex flex-col min-h-screen justify-between">
        <NavBar />
        <div id="content" className="mt-7">
          <div id="primary" className="content-area flex-grow">
            <main className="w-full flex items-center justify-center">
              <article className="md:w-3/4 bg-slate-100 p-6 mb-10">
                <h1 className="text-black text-5xl font-bold text-center py-5">
                  ¿QUIÉNES SOMOS?
                </h1>
                <div className="py-10 ">
                  <p className="text-justify">
                  En la pretensión de una educación renovada, y constante en el tiempo, la asociación paidago busca reivindicar los procesos formativos hacia lo realmente humano; recontruyendo lo establecido para arar el camino de la creatividad y la genialidad. Para esto compartimos ideas fundamentales de la pedagogía a través del asesoramiento, acompañamiento virtual, encuentros académicos y la producción visual.
                  </p>
                
                </div>
              </article>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default About