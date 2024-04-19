import { Component } from "react";
import FileModal from "../Files/FileModal";
import FileList from "../Files/FileList";
import Files from "../Files/Files";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import LogoutButton from "../LogoutButton";
import Nav from "../Nav";

class HomePage extends Component {
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
      },
    };
    this.changeStage = this.changeStage.bind(this);
  }

  componentDidMount = () => {
    this.refreshList();
  };

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
      .delete(
        `https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${item.id}/`
      )
      .then((res) => this.refreshList())
      .catch((err) => console.error(`Deleting item ${item.id} failed:`, err));
  };

  // edit file
  editFile = (item) => {
    const { fileList } = this.state;
    let updatedFiles = fileList.map((file) =>
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
        .put(
          `https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${itemData.id}/`,
          itemData
        )
        .then((res) => this.refreshList())
        .catch((err) => console.error("Updating item failed:", err));
    } else {
      // Generate a new ID, add the new item data to the itemList
      axios
        .post(
          `https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/`,
          itemData
        )
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
      },
    });
  };

  changeStage = (stage) => {
    this.setState({ currentStage: stage });
  };

  render() {
    const { isModalOpen, activeItem, fileList } = this.state;

    return (
      <main className="bg-slate-500 h-screen flex">
        <Nav
          currentStage={this.state.currentStage}
          changeStage={this.changeStage}
          toggleModal={this.toggleModal}
          isModalOpen={isModalOpen}
          closeFileModal={this.closeFileModal}
          handleFileSubmit={this.handleFileSubmit}
          activeItem={activeItem}
        />
        <div className="w-full p-0">
          <Files
            currentStage={this.state.currentStage}
            fileList={fileList}
            editFile={this.editFile}
            deleteFile={this.deleteFile}
          />
        </div>
      </main>
    );
  }
}

export default HomePage;
