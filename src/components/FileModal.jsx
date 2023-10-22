import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-expanding-textarea'

// This component is a modal that allows the user to create a new file
const FileModal = ({ isOpen, onClose, onAddFile, initialData }) => {
  const [formData, setFormData] = useState({
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
  });

  // Set the form data to the initial data when the modal opens
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Close the modal when the escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if(event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
  
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Update the form data when the user types
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prevFormData => {
      const newFormData = {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
      return newFormData;
    });
  };

  // Submit the form data when the user clicks the submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddFile(formData);
    onClose();
  };

  return (
    <div className={`${isOpen ? '' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Create New File
            </h3>
            <form onSubmit={handleSubmit}>
              
              <div className="mt-4">
                <label htmlFor="file_number" className="block text-sm font-medium text-gray-700">File Number</label>
                <input 
                  type="text" 
                  name="file_number" 
                  id="file_number"
                  value={formData.file_number}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
                
                <label htmlFor="transport_mode" className="block text-sm font-medium text-gray-700 mt-2">Transport Mode</label>
                <select 
                  name="transport_mode" 
                  id="transport_mode"
                  value={formData.transport_mode}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="" disabled>Select a transport mode</option>
                  <option value="Air">Air</option>
                  <option value="Ocean">Ocean</option>
                  <option value="Ground">Domestic</option>
                </select>

                <label htmlFor="shipper" className="block text-sm font-medium text-gray-700 mt-2">Shipper</label>
                <input 
                  type="text" 
                  name="shipper" 
                  id="shipper"
                  value={formData.shipper}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
            
                <label htmlFor="consignee" className="block text-sm font-medium text-gray-700 mt-2">Consignee</label>
                <input 
                  type="text" 
                  name="consignee" 
                  id="consignee"
                  value={formData.consignee}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />

                <label htmlFor="mawb_mbl" className="block text-sm font-medium text-gray-700 mt-2">MAWB / MBL</label>
                <input 
                  type="text" 
                  name="mawb_mbl" 
                  id="mawb_mbl"
                  value={formData.mawb_mbl}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />

                <label htmlFor="hawb_hbl" className="block text-sm font-medium text-gray-700 mt-2">HAWB / HBL</label>
                <input 
                  type="text" 
                  name="hawb_hbl" 
                  id="hawb_hbl"
                  value={formData.hawb_hbl}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />

                <div className='flex justify-between'>
                  <div className='flex items-center mt-2'>
                  <label htmlFor="ETD" className="block text-md font-medium text-gray-700 mt-2 mr-1">ETD:</label>
                  <input 
                    type="date" 
                    name="etd" 
                    id="etd"
                    value={formData.etd}
                    onChange={handleChange}
                    className="mt-1 p-2 w-50% border rounded-md"
                    />
                  </div>

                  <div className='flex items-center mt-2'>
                  <label htmlFor="ETA" className="block text-md font-medium text-gray-700 mt-2 mr-1">ETA:</label>
                  <input 
                    type="date" 
                    name="eta" 
                    id="eta"
                    value={formData.eta}
                    onChange={handleChange}
                    className="mt-1 p-2 w-50% border rounded-md"
                    />
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='flex items-center mt-2'>
                  <label htmlFor="customs_release" className="block text-md font-medium text-gray-700 mt-2 mr-1">Customs Released:</label>
                  <input 
                    type="checkbox" 
                    name="customs_release" 
                    id="customs_release"
                    checked={formData.customs_release || false}
                    onChange={handleChange}
                    className="mt-1 p-2 w-50% border rounded-md"
                    />
                  </div>

                  <div className='flex items-center mt-2'>
                  <label htmlFor="arrived" className="block text-md font-medium text-gray-700 mt-2 mr-1">Arrived:</label>
                  <input 
                    type="checkbox" 
                    name="arrived" 
                    id="arrived"
                    checked={formData.arrived || false}
                    onChange={handleChange}
                    className="mt-1 p-2 w-50% border rounded-md"
                    />
                  </div>

                  <div className='flex items-center mt-2'>
                  <label htmlFor="delivered" className="block text-md font-medium text-gray-700 mt-2 mr-1">Delivered:</label>
                  <input 
                    type="checkbox" 
                    name="delivered" 
                    id="delivered"
                    checked={formData.delivered || false}
                    onChange={handleChange}
                    className="mt-1 p-2 w-50% border rounded-md"
                    />
                  </div>
                </div>

                <hr className="mt-4 mb-4" />

                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mt-2">Shipment Notes</label>
                <Textarea
                  name="notes"
                  id="notes"
                  maxLength="3000"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter additional notes..."
                  className="mt-1 p-2 w-full border rounded-md"
                />

              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded duration-300 transition-transform transform hover:scale-105">
                  Save File
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={onClose} className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:ml-3 sm:w-auto duration-300 transition-transform transform hover:scale-105">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//
FileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddFile: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    file_number: PropTypes.string,
    shipper: PropTypes.string,
    consignee: PropTypes.string,
    transport_mode: PropTypes.string,
    mawb_mbl: PropTypes.string,
    hawb_hbl: PropTypes.string,
    etd: PropTypes.string,
    eta: PropTypes.string,
    customs_release: PropTypes.bool,
    arrived: PropTypes.bool,
    delivered: PropTypes.bool,
    notes: PropTypes.string,
  }),
};

export default FileModal;
