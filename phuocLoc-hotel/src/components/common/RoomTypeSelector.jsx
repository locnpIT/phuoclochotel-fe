/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypesInput, setShowNewRoomTypesInput] = useState(false);
  const [newRoomTypes, setNewRoomTypes] = useState("");

  useEffect(() => {
    getRoomTypes()
      .then((data) => {
        if (Array.isArray(data)) {
          setRoomTypes(data);
        } else {
          console.error("Invalid data format received from API");
        }
      })
      .catch((error) => console.error("Error fetching room types:", error));
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomTypes(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomTypes !== "") {
      setRoomTypes([...roomTypes, newRoomTypes]);
      setNewRoomTypes("");
      setShowNewRoomTypesInput(false);
    }
  };

  return (
    <>
      {roomTypes.length > 0 || (
        <div>
        <select
        id="roomType"
        name="roomType"
        className="form-select"
        value={newRoom.roomType}
        onChange={(e) => {
            if (e.target.value === "Add New") {
            setShowNewRoomTypesInput(true);
            } else {
            handleRoomInputChange(e);
            }
        }}
        >
        <option value={""}>Select a room type</option>
        <option value={"Add New"}>Add New</option> 
        {roomTypes.map((type, index) => (
            <option key={index} value={type}>
                {type}
            </option>
        ))}
        </select>
          {showNewRoomTypesInput && (
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Enter new room type"
                onChange={handleNewRoomTypeInputChange}
              />
              <button className="btn btn-hotel" 
              type="button" onClick={handleAddNewRoomType}>
                Add
                </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

RoomTypeSelector.propTypes = {
  handleRoomInputChange: PropTypes.func.isRequired,
  newRoom: PropTypes.shape({
    roomType: PropTypes.string.isRequired,
    roomPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photo: PropTypes.any,
  }).isRequired,
};

export default RoomTypeSelector;
