import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const alertMessage = (msg) => {
    return <div className="d-flex warning-message fw-500 align-items-center mt-1 ps-2 pb-2 pt-0">
        <FontAwesomeIcon icon={faWarning} className='icon-warning me-2' />
        {msg}
    </div>
}

export default alertMessage;