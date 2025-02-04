import NavBar from "../components/NavBar"
import '../style/home.css'
import Footer from "../components/Footer"
function Profile(){

    return(
        <div className="flex flex-col min-h-screen justify-between">
        <NavBar />
        <div id="content" className="mt-7">
          <div id="primary" className="content-area flex-grow">
            <main className="w-full flex items-center justify-center">
              <article className="md:w-3/4 bg-slate-100 p-6 mb-10 flex-col items-center justify-center" >

                <div id="img" className="relative w-full h-96 ">
               
                <img src="https://www.microsoft.com/es-xl/events-hub/uploads/3adzs3qz20owgw40gw04.png" className="w-full lg:w-full lg:h-full "></img>
                 
             
                <img src="https://affinitaslegal.com/wp-content/uploads/2023/10/imagen-perfil-sin-foto.jpg" className="sm:mx-auto rounded-full w-52 h-52 lg:transform -translate-x-1 -translate-y-1/2 ml-5 "></img>
                </div>              
                <div id="info" className="pt-24"><h1 className="text-center lg:text-left text-black text-2xl font-bold py-5">
                  Hamilton Damian Lopez Gutierrez
                </h1>
                <p className="text-center lg:text-left">                  
                  hamilton@gmail.com
                </p>
                </div>
                
               
              </article>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    )
}

export default Profile