import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import PropTypes from 'prop-types';

function MainLayout({ children }){
    return(
        <div className="flex flex-col justify-between h-screen">
            <NavBar />
            <main className="w-full flex items-center justify-center my-7">
                <article className="md:w-3/4 bg-slate-100 p-6">
                    { children }
                </article>		
            </main>
            <Footer />
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default MainLayout