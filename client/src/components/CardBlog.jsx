import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function CardBlog({ title, desc, date, category, author }) {
  const { isAuthenticated } = useAuth()
  return (
    <li className='w-11/12 max-w-3xl min-w-72 border border-gray-500 p-5 mb-5 shadow-2xl hover:scale-105 transition-all duration-500 bg-slate-200 mx-3'>
        <div className="py-4 flex gap-2 flex-wrap">
            <span className="inline-block bg-gray-300 mr-3 rounded-sm px-3 py-1 text-sm font-bold text-gray-700">{date}</span>
            <span className="inline-block bg-gray-300 mr-3 rounded-sm px-3 py-1 text-sm font-bold text-gray-700">{category}</span>
            <span className="inline-block bg-gray-300 mr-3 rounded-sm px-3 py-1 text-sm font-bold text-gray-700">{author}</span>
            { isAuthenticated && <Link to='#' className="inline-block bg-gray-300 mr-3 rounded-sm px-3 py-1 text-sm font-bold text-gray-700">Deja un comentario</Link>}
        </div>
        <div>
            <Link to='#'><h1 className='text-black mb-10 font-bold text-2xl'>{title}</h1></Link>
            <p className='text-black leading-6 text-lg'>{desc}</p>                                        
        </div>
    </li>
  )
}

CardBlog.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};

export default CardBlog