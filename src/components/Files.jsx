import FileItem from './FileItem';
import PropTypes from 'prop-types';

const Files = ({ currentStage, fileList, editFile, deleteFile }) => {
    let files = [];
    
    switch (currentStage) {
      case "In Transit":
        files = fileList.filter(file => !file.customs_release && !file.arrived && !file.delivered);
        break;
      case "Customs Cleared":
        files = fileList.filter(file => file.customs_release && !file.arrived && !file.delivered);
        break;
      case "Arrived":
        files = fileList.filter(file => file.arrived && !file.delivered);
        break;
      case "Delivered":
        files = fileList.filter(file => file.delivered);
        break;
      default:
        files = fileList;
    }
  
    return (
      <ul className="border border-gray-200 rounded-b-md rounded-tr-md bg-white">
        {files.map((file) => (
          <FileItem key={file.id} file={file} currentStage={currentStage} editFile={editFile} deleteFile={deleteFile} />
        ))}
      </ul>
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
