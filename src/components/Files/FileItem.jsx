import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlane,
  faShip,
  faTrash,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const FileItem = ({ file, currentStage, editFile, deleteFile }) => (
  <>
    <tbody key={file.id}
      className={` bg-white text-black hover:bg-cyan-900 hover:text-white ${
        currentStage === "Delivered"
          ? "line-through decoration-red-500 text-gray-500"
          : ""
      }`}
      title={file.mawb_mbl}
    >
      <tr>
        <td>
          {file.transport_mode === "Air" ? (
            <FontAwesomeIcon icon={faPlane} />
          ) : file.transport_mode === "Ocean" ? (
            <FontAwesomeIcon icon={faShip} />
          ) : (
            <FontAwesomeIcon icon={faTruck} />
          )}
        </td>
        <td>{file.file_number}</td>
        <td>
          {file.shipper} → {file.consignee}
        </td>
        <td>MAWB/MBL: {file.mawb_mbl}</td>
        <td>HAWB/HBL: {file.hawb_hbl}</td>
        <td>ETD: {file.etd}</td>
        <td>ETA: {file.eta}</td>
        <td>Customs Release: {file.customs_release ? "Yes" : "No"}</td>
        <td>Arrived: {file.arrived ? "Yes" : "No"}</td>
        <td>Delivered: {file.delivered ? "Yes" : "No"}</td>
        <td>Notes: {file.notes}</td>
        <td>
          <div className="flex flex-col">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition-transform transform hover:scale-105 m-1"
              onClick={() => editFile(file)}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-transform transform hover:scale-105 m-1"
              onClick={() => deleteFile(file)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </>
);

export default FileItem;

//prop validation
FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  currentStage: PropTypes.string.isRequired,
  editFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
};
