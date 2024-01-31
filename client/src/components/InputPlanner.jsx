import PropTypes from 'prop-types';

function InputPlanner({ text, id }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-black">{text}</label>
      <input type="text" className="form-input w-full mt-1 p-2 border border-black rounded-md shadow-sm placeholder:text-black" id={id} placeholder={text} required/>
    </div>
  )
}

InputPlanner.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


export default InputPlanner