import PropTypes from 'prop-types';

function Card({ title, competence, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-2xl cursor-pointer min-w-fit p-4"
    >
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-800 mb-2">{competence}</p>
    </div>
  );
}


Card.propTypes = {
  title: PropTypes.string.isRequired,
  competence: PropTypes.string.isRequired,
};


export default Card;
