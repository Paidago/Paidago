import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage(){
    const { register, handleSubmit } = useForm()
    const { signin, isAuthenticated, errors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/')        
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async data => {
        signin(data)
    }) 

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center '>
            <div className="w-full max-w-xs">
            {
                    errors && errors.map(error => <div key={error} className='text-red-500 my-2'>{error}</div>)
                }
                <form onSubmit={ onSubmit } className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                    <div className="flex flex-col items-center justify-between gap-4">
                        <div>
                            <button className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Log In
                            </button>
                            <Link className="inline-block ml-2 align-baseline font-bold text-sm text-purple-500 hover:text-blue-800" to="#">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                        <div>
                            <Link to='/register' className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-blue-800">
                                ¿No tienes una cuenta? Registrate
                            </Link>
                        </div>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Paidago. Todos los derechos reservados.
                </p>
            </div>
        </div>
    )
}

export default LoginPage