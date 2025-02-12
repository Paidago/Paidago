import PropTypes from 'prop-types';

const subjects = [
    'Ciencias Sociales', 
    'Ciencias Naturales', 
    'Matematicas', 
    'Fisica', 
    'Educacion Fisica', 
    'Artistica', 
    'Media Tecnica', 
    'Geometria', 
    'Etica y Religion', 
    'Filosofia',
    'Historia',
    'Español'
]

function SubjectsSelect({ register, children }) {
  return (
    <select className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm bg-white" { ...register( "subject", { required: true } ) }>
        { children }
        { subjects.map( (subject, index) => <option key={index} value={subject}>{subject}</option> ) }
    </select>
  )
}

SubjectsSelect.propTypes = {
  register: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default SubjectsSelect