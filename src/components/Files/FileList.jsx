import PropTypes from 'prop-types';

const FileList = ({ currentStage, changeStage }) => (
    <div className="flex">
        <span
            className={currentStage === "In Transit" ? "md:mr-2 p-2 cursor-pointer bg-blue-700 text-white rounded-t-md border-gray-200 border" : "md:mr-2 p-2 cursor-pointer bg-slate-100 rounded-t-md border-gray-200 border"}
            onClick={() => changeStage("In Transit")}
        >
            In Transit
        </span>
        <span
            className={currentStage === "Customs Cleared" ? "md:mr-2 p-2 cursor-pointer bg-green-700 text-white rounded-t-md border-gray-200 border" : "md:mr-2 p-2 cursor-pointer bg-slate-200 rounded-t-md border-gray-200 border"}
            onClick={() => changeStage("Customs Cleared")}
        >
            Customs Cleared
        </span>
        <span
            className={currentStage === "Arrived" ? "md:mr-2 p-2 cursor-pointer bg-yellow-300 text-black rounded-t-md border-gray-200 border" : "md:mr-2 p-2 cursor-pointer bg-slate-300 rounded-t-md border-gray-200 border"}
            onClick={() => changeStage("Arrived")}
        >
            Arrived
        </span>
        <span
            className={currentStage === "Delivered" ? "p-2 cursor-pointer bg-red-500 text-white rounded-t-md border-gray-200 border" : "p-2 cursor-pointer bg-slate-400 rounded-t-md border-gray-200 border"}
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