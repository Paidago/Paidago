import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function RegisterPage(){
    const { register, handleSubmit } = useForm()
    const { signup, isAuthenticated, errors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/')        
    }, [isAuthenticated])

    

    const onSubmit = handleSubmit(async data => {
        signup(data)
    }) 

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center '>
            <div className="w-full max-w-xs">
                {
                    errors && errors.map(error => <div key={error} className='text-red-500 my-2'>{error}</div>)
                }
                <form onSubmit={ onSubmit } className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" { ...register( "username", { required: true } ) } />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" { ...register( "email", { required: true } ) } />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*************" { ...register( "password", { required: true } ) }/>
                        
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>Registrarse</button>
                        <Link  to="/login" className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-blue-800">
                            ¿Ya tienes cuenta?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage