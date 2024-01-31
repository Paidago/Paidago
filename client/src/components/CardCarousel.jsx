import PropTypes from 'prop-types';

function Card ({ title, description }) {
  return (
    <div className="min-h-64 max-h-96 max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
      <div className="px-6 py-4">
        <h1 className="font-bold text-xl text-center text-black">{title}</h1>
        <p className="text-black mt-2">{description}.</p>
      </div>
    </div>
  );
}


Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
  

export default Card;
