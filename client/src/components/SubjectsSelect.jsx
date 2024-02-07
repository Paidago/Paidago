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
    'Filosofia'
]

function SubjectsSelect({ register }) {
  return (
    <select className="form-select w-full mt-1 p-2 border border-black rounded-md shadow-sm bg-white" { ...register( "subject", { required: true } ) }>
        { subjects.map( (subject, index) => <option key={index} value={subject}>{subject}</option> ) }
    </select>
  )
}

SubjectsSelect.propTypes = {
  register: PropTypes.func.isRequired
};

export default SubjectsSelect