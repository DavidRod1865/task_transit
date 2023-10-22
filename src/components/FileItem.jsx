import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlane, faShip, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const FileItem = ({ file, currentStage, editFile, deleteFile }) => (
  <li
    key={file.id}
    className="flex justify-between items-center p-4 border-b border-gray-200"
  >
    <div
      className={`mr-2 ${currentStage === "Delivered" ? "line-through decoration-red-500 text-gray-500" : ""}`}
      title={file.mawb_mbl}
    >
      {file.transport_mode === "Air" ? (
        <FontAwesomeIcon icon={faPlane} />
      ) : (
        file.transport_mode === "Ocean" ? (
        <FontAwesomeIcon icon={faShip} /> 
      ) : (
        <FontAwesomeIcon icon={faTruck} />
      ))}
      <p>{file.file_number}</p> 
      <p>{file.shipper} → {file.consignee}</p>
      <ul>
        <li>MAWB/MBL: {file.mawb_mbl}</li>
        <li>HAWB/HBL: {file.hawb_hbl}</li>
        <li>ETD: {file.etd}</li>
        <li>ETA: {file.eta}</li>
        <li>Customs Release: {file.customs_release ? "Yes" : "No"}</li>
        <li>Arrived: {file.arrived ? "Yes" : "No"}</li>
        <li>Delivered: {file.delivered ? "Yes" : "No"}</li>
        <li>Notes: {file.notes}</li>
      </ul>
    </div>
    <div>
      <button className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded mr-2 transition-transform transform hover:scale-105" onClick={() => editFile(file)}>
        <FontAwesomeIcon icon={faEdit} /> Edit
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-transform transform hover:scale-105" onClick={() => deleteFile(file)}>
        <FontAwesomeIcon icon={faTrash} /> Delete
      </button>
    </div>
  </li>
);

export default FileItem;

//prop validation
FileItem.propTypes = {
    file: PropTypes.object.isRequired,
    currentStage: PropTypes.string.isRequired,
    editFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
};
