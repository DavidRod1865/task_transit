import FileItem from "./FileItem";
import PropTypes from "prop-types";

const Files = ({ currentStage, fileList, editFile, deleteFile }) => {
  let files = [];

  switch (currentStage) {
    case "In Transit":
      files = fileList.filter(
        (file) => !file.customs_release && !file.arrived && !file.delivered
      );
      break;
    case "Customs Cleared":
      files = fileList.filter(
        (file) => file.customs_release && !file.arrived && !file.delivered
      );
      break;
    case "Arrived":
      files = fileList.filter((file) => file.arrived && !file.delivered);
      break;
    case "Delivered":
      files = fileList.filter((file) => file.delivered);
      break;
    default:
      files = fileList;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm">
        <thead className="bg-white text-black">
          <tr className="text-center">
            <th>Mode</th>
            <th>File Number</th>
            <th>Shipper</th>
            <th>Consignee</th>
            <th>MAWB/MBL</th>
            <th>HAWB/HBL</th>
            <th>ETD</th>
            <th>ETA</th>
            <th>Customs Release</th>
            <th>Arrived</th>
            <th>Delivered</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
          {files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              currentStage={currentStage}
              editFile={editFile}
              deleteFile={deleteFile}
            />
          ))}
      </table>
    </div>
  );
};

export default Files;

//prop validation
Files.propTypes = {
  currentStage: PropTypes.string.isRequired,
  fileList: PropTypes.array.isRequired,
  editFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
};
