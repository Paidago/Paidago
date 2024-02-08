import NavBar from "../components/NavBar"
import '../style/home.css'
import Footer from "../components/Footer"
function About(){

    return (
      <div className="flex flex-col justify-between">
        <NavBar />
        <div id="content" className="mt-7">
          <div id="primary" className="content-area">
            <main className="w-full flex items-center justify-center">
              <article className="md:w-3/4 bg-slate-100 p-6 mb-10">
                <h1 className="text-black text-5xl font-bold mx-auto py-5">
                  ¿QUIÉNES SOMOS?
                </h1>
                <div className="py-10">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Soluta possimus dolor quasi itaque aliquam officiis obcaecati,
                  non similique quis repellendus. Repudiandae soluta aliquid,
                  velit pariatur blanditiis inventore necessitatibus atque
                  vitae?
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