import PropTypes from "prop-types";
import FileList from "./Files/FileList";
import LogoutButton from "./LogoutButton";
import FileModal from "./Files/FileModal";

const Nav = ({
  currentStage,
  changeStage,
  toggleModal,
  isModalOpen,
  closeFileModal,
  handleFileSubmit,
  activeItem,
}) => {
  return (
    <div className="flex flex-col justify-between items-center w-max border-r-4 border-gray-950 border-double">
      <div className="flex flex-col items-center">
          <img src="arrow.png" alt="logo" className="w-16 h-16" />
          <h1 className="text-black text-2xl uppercase font-bold text-center">
            Task Transit
          </h1>
        <FileList changeStage={changeStage} currentStage={currentStage} />
        <div className="mt-5 md:block">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-[1.45rem] md:text-[1rem] text-white px-5 py-2 rounded duration-300 transition-transform transform hover:scale-105"
            onClick={toggleModal}
          >
            Add File
          </button>
          {isModalOpen && (
            <FileModal
              isOpen={isModalOpen}
              onClose={closeFileModal}
              onAddFile={handleFileSubmit}
              initialData={activeItem}
            />
          )}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Nav;

//prop validation
Nav.propTypes = {
  changeStage: PropTypes.func.isRequired,
  currentStage: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeFileModal: PropTypes.func.isRequired,
  handleFileSubmit: PropTypes.func.isRequired,
  activeItem: PropTypes.object.isRequired,
};
