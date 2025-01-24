import MainLayout from "../Layout/MainLayout"
import CardBlog from '../components/CardBlog.jsx'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Blog(){
    const { user } = useAuth()
    return(
        <MainLayout>
            {
                !user && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Logueate para comentar!!</h2>
                        <Link to="/login" className="bg-purple-500 w-20 font-bold text-white py-2 px-4 rounded-md">Login</Link>
                    </div>
                )
            }
                <div className="flex flex-col justify-between items-center">
                    <ul className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <CardBlog title='sample1' desc='desc1' date='now' author='user' category='education' />
                        <CardBlog title='sample1' desc='desc1' date='now' author='user' category='education' />
                        <CardBlog title='sample1' desc='desc1' date='now' author='user' category='education' />
                    </ul>
                </div>
        </MainLayout>
    )
}

export default Blog