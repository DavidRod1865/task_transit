import PropTypes from 'prop-types';

const FileList = ({ currentStage, changeStage }) => (
    <div className="flex flex-col">
        <span
            className={currentStage === "In Transit" ? "p-2 m-1 cursor-pointer bg-primary text-black rounded-md border-gray-200 border" : "p-2 m-1 cursor-pointer bg-neutral-content rounded-md border-gray-200 border"}
            onClick={() => changeStage("In Transit")}
        >
            In Transit
        </span>
        <span
            className={currentStage === "Customs Cleared" ? "p-2 m-1 cursor-pointer bg-secondary text-black rounded-md border-gray-200 border" : "p-2 m-1 cursor-pointer bg-neutral-content rounded-md border-gray-200 border"}
            onClick={() => changeStage("Customs Cleared")}
        >
            Customs Cleared
        </span>
        <span
            className={currentStage === "Arrived" ? "p-2 m-1 cursor-pointer bg-accent text-black rounded-md border-gray-200 border" : "p-2 m-1 cursor-pointer bg-neutral-content rounded-md border-gray-200 border"}
            onClick={() => changeStage("Arrived")}
        >
            Arrived
        </span>
        <span
            className={currentStage === "Delivered" ? "p-2 m-1 cursor-pointer bg-green-600 text-black rounded-md border-gray-200 border" : "p-2 m-1 cursor-pointer bg-neutral-content rounded-md border-gray-200 border"}
            onClick={() => changeStage("Delivered")}
        >
          Delivered
        </span>
    </div>
);
  
export default FileList;

//prop validation
FileList.propTypes = {
    currentStage: PropTypes.string.isRequired,
    changeStage: PropTypes.func.isRequired,
};