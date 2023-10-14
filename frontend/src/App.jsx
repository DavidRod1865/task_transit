import { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faShip, faTruck } from '@fortawesome/free-solid-svg-icons'
import FileModal from "./components/FileModal";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDelivered: false,
      fileList: [],
      isModalOpen: false,
      editingFile: null,
      activeItem: {
        id: null,
        file_number: "",
        shipper: "",
        consignee: "",
        transport_mode: "",
        mawb_mbl: "",
        hawb_hbl: "",
        etd: "",
        eta: "",
        customs_release: false,
        arrived: false,
        delivered: false,
        notes: "",
      }

    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/files/")
      .then((res) => this.setState({ fileList: res.data }))
      .catch((err) => console.log(err));
  };

  // open and close modal
  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  // add new file
  addFile = (newFile) => {
    this.setState((prevState) => ({
      fileList: [...prevState.fileList, { ...newFile, id: prevState.fileList.length + 1 }],
    }));
  };

  // delete file
  deleteFile = (item) => {
    axios
      .delete(`http://localhost:8000/api/files/${item.id}/`)
      .then((res) => this.refreshList())
      .catch((err) => console.error(`Deleting item ${item.id} failed:`, err));
  };

  // edit file
  editFile = (item) => {
    const { fileList } = this.state;
    let updatedFiles = fileList.map(file =>
      file.id === item.id ? { ...file, ...item } : file
    );

    this.setState({
      activeItem: item,
      fileList: updatedFiles,
      editingFile: null,
    });
    this.toggleModal();
  };

  // submit file to add or edit
  handleFileSubmit = (itemData) => {
    // Close the modal (if needed) and do additional cleanup/tasks
    this.toggleModal();
  
    if (itemData.id) {
      // If itemData has an id, it's an edit, otherwise, it's a new item.
      axios
        .put(`http://localhost:8000/api/files/${itemData.id}/`, itemData)
        .then((res) => this.refreshList())
        .catch((err) => console.error("Updating item failed:", err));
    } else {
      // Generate a new ID, add the new item data to the itemList
      axios
        .post(`http://localhost:8000/api/files/`, itemData)
        .then((res) => this.refreshList())
        .catch((err) => console.error("Adding item failed:", err));
    }
  };
  
  closeFileModal = () => {
    this.setState({
      isModalOpen: false,
      editingFile: null,
      activeItem: {
        id: null,
        file_number: "",
        shipper: "",
        consignee: "",
        transport_mode: "",
        mawb_mbl: "",
        hawb_hbl: "",
        etd: "",
        eta: "",
        customs_release: false,
        arrived: false,
        delivered: false,
        notes: "",
      }
    });
  };  

  // display delivered or not delivered files
  displayDelivered = (status) => {
    if (status) {
      return this.setState({ viewDelivered: true });
    }

    return this.setState({ viewDelivered: false });
  };

  // render file list
  renderFileList = () => {
    return (
      <div className="flex">
        <span
          className={this.state.viewDelivered ? "p-2 cursor-pointer bg-blue-500 text-white" : "p-2 cursor-pointer"}
          onClick={() => this.displayDelivered(true)}
        >
          Delivered
        </span>
        <span
          className={this.state.viewDelivered ? "p-2 cursor-pointer" : "p-2 cursor-pointer bg-blue-500 text-white"}
          onClick={() => this.displayDelivered(false)}
        >
          Not Delivered
        </span>
      </div>
    );
  };
  
  // render files
  renderFiles = () => {
    const { viewDelivered, fileList } = this.state;
    const files = fileList.filter(file => file.delivered === viewDelivered);
  
    return files.map((file) => (
      <li
        key={file.id}
        className="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <div
          className={`mr-2 ${viewDelivered ? "line-through text-gray-500" : ""}`}
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
          <p>{file.file_number}: {file.shipper} → {file.consignee}</p>
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
          <button className="bg-gray-500 text-white p-2 rounded mr-2" onClick={() => this.editFile(file)}>Edit</button>
          <button className="bg-red-500 text-white p-2 rounded" onClick={() => this.deleteFile(file)}>Delete</button>
        </div>
      </li>
    ));
  };

render() {
    const { isModalOpen, activeItem } = this.state;

    return (
      <main className="container mx-auto">
        <div className="flex justify-center items-center">
          <img src="arrow.png" alt="logo" className="w-16 h-16"/>
          <h1 className="text-black text-5xl uppercase text-center my-4">Task Transit</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-4/5 md:w-1/2 mx-auto p-0">
            <div className="p-3 shadow-lg">
              {this.renderFileList()}
              <ul className="border border-gray-200">
                {this.renderFiles()}
              </ul>
              <div className="mb-4 mt-2">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={this.toggleModal}
                  >
                  Add File
                </button>         
                {isModalOpen && (
                  <FileModal 
                  isOpen={isModalOpen}
                  onClose={this.closeFileModal}
                  onAddFile={this.handleFileSubmit}
                  initialData={activeItem}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
  
  