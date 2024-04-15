import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const refreshList = (updateStateCallback) => {
  axios
    .get("https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/")
    .then((res) => updateStateCallback({ fileList: res.data }))
    .catch((err) => console.log(err));
};

export const toggleModal = (prevState, updateStateCallback) => {
  updateStateCallback({ isModalOpen: !prevState.isModalOpen });
};

export const addFile = (newFile, prevState, updateStateCallback) => {
  const updatedFileList = [...prevState.fileList, { ...newFile, id: uuidv4() }];
  updateStateCallback({
    fileList: updatedFileList
  });
};

export const deleteFile = (item, refreshListCallback) => {
  axios
    .delete(`https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${item.id}/`)
    .then(() => refreshListCallback())
    .catch((err) => console.error(`Deleting item ${item.id} failed:`, err));
};

export const editFile = (item, prevState, updateStateCallback, toggleModalCallback) => {
  const updatedFiles = prevState.fileList.map(file =>
    file.id === item.id ? { ...file, ...item } : file
  );

  updateStateCallback({
    fileList: updatedFiles
  });
  toggleModalCallback(prevState, updateStateCallback); // Ensure the modal is closed after editing
};

export const handleFileSubmit = (itemData, prevState, updateStateCallback, toggleModalCallback, refreshListCallback) => {
  toggleModalCallback(prevState, updateStateCallback); // Always close the modal first

  const url = `https://tasktransitapi-35c0a97b3448.herokuapp.com/api/files/${itemData.id || ''}`;
  const method = itemData.id ? 'put' : 'post';

  axios[method](url, itemData)
    .then(() => refreshListCallback(updateStateCallback))
    .catch((err) => console.error(`${method === 'put' ? 'Updating' : 'Adding'} item failed:`, err));
};

export const changeStage = (stage, updateStateCallback) => {
  updateStateCallback({ currentStage: stage });
};
