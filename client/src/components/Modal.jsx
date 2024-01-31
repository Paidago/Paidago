import PropTypes from 'prop-types';


function Modal({ children, message }) {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center z-40 ">
                <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                <div className="bg-slate-800 bg-opacity-55 backdrop-blur-sm p-8 rounded-lg z-10">
                    <div className="flex justify-end">
                        <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            //onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="mt-4 text-white flex flex-col gap-5">
                        <h2 className="text-2xl font-bold">{message}</h2>
                        {children}
                    </div>
                </div>
                </div>
        </div>
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.string.isRequired
};


export default Modal