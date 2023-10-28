import { Component } from 'react';
import FileModal from './FileModal';
import FileList from './FileList';
import Files from './Files';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import LogoutButton from './LogoutButton';

class HomePage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentStage: "In Transit",
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
    this.changeStage = this.changeStage.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/")
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
      fileList: [...prevState.fileList, { ...newFile, id: uuidv4() }],
    }));
  };

  // delete file
  deleteFile = (item) => {
    axios
      .delete(`https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${item.id}/`)
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
        .put(`https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${itemData.id}/`, itemData)
        .then((res) => this.refreshList())
        .catch((err) => console.error("Updating item failed:", err));
    } else {
      // Generate a new ID, add the new item data to the itemList
      axios
        .post(`https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/`, itemData)
        .then((res) => this.refreshList())
        .catch((err) => console.error("Adding item failed:", err));
    }
  };
  
  closeFileModal = () => {
    this.setState({
      currentStage: "In Transit",
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

  changeStage = (stage) => {
    this.setState({ currentStage: stage });
  };

  render(){
    const { isModalOpen, activeItem, fileList } = this.state;
        
    return (
      <main className='bg-amber-100 h-screen'>
        <div className="flex justify-center items-center pt-6 mb-6">
          <img src="arrow.png" alt="logo" className="w-16 h-16 mr-3"/>
          <h1 className="text-black text-4xl uppercase font-bold">Task Transit</h1>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-0">
            <FileList
              currentStage={this.state.currentStage} 
              changeStage={this.changeStage}
              />
            <Files
              currentStage={this.state.currentStage}
              fileList={fileList} 
              editFile={this.editFile} 
              deleteFile={this.deleteFile} 
              />
            <div className="mt-4 flex justify-center md:block">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-[1.45rem] md:text-[1rem] text-white px-5 py-2 rounded duration-300 transition-transform transform hover:scale-105"
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
            <LogoutButton />
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;
  
  