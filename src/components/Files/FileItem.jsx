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
    <tbody
      key={file.id}
      className={` bg-white text-black hover:bg-cyan-900 hover:text-white ${
        currentStage === "Delivered"
          ? "line-through decoration-red-500 text-gray-500"
          : ""
      }`}
      title={file.mawb_mbl}
    >
      <tr className="text-center">
        <td className="border-2 border-solid border-slate-400">
          {file.transport_mode === "Air" ? (
            <FontAwesomeIcon icon={faPlane} />
          ) : file.transport_mode === "Ocean" ? (
            <FontAwesomeIcon icon={faShip} />
          ) : (
            <FontAwesomeIcon icon={faTruck} />
          )}
        </td>
        <td className="border-2 border-solid border-slate-400">{file.file_number}</td>
        <td className="border-2 border-solid border-slate-400">{file.shipper}</td>
        <td className="border-2 border-solid border-slate-400">{file.consignee}</td>
        <td className="border-2 border-solid border-slate-400">{file.mawb_mbl}</td>
        <td className="border-2 border-solid border-slate-400">{file.hawb_hbl}</td>
        <td className="border-2 border-solid border-slate-400">{file.etd}</td>
        <td className="border-2 border-solid border-slate-400">{file.eta}</td>
        <td className="border-2 border-solid border-slate-400">{file.customs_release ? "Customs Released" : "No"}</td>
        <td className="border-2 border-solid border-slate-400">{file.arrived ? "Arrived" : "No"}</td>
        <td className="border-2 border-solid border-slate-400">{file.delivered ? "Delivered" : "No"}</td>
        <td>{!file.notes ? "No" : 
          <><button
            className="btn text-black"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >Notes</button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-2/6 max-w-5xl text-left text-black">
              <h3 className="font-bold text-lg">Notes:</h3>
              <p className="py-4 text-base">{file.notes}</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog></>}
        </td>
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
