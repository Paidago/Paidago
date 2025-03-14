import PropTypes from 'prop-types';

function Card ({ title, competence }) {
  return (
    <div 
            // onClick={onClick}
            className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-2xl p-4 cursor-pointer max-w-sm"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-800 mb-2">{competence}</p>
        </div>
  );
}


Card.propTypes = {
    title: PropTypes.string.isRequired,
    competence: PropTypes.string.isRequired,
};
  

export default Card;
