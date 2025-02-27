/* eslint-disable no-unused-vars */
import axios from 'axios'

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

// this function add room into database 
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData);
    if(response.status === 201){
        return true;
    }
    return false;


    
}

// this function get all room type from the database 
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching room types" + error)
    }       
}

// This function gets all rooms from database
export async function getAllRooms(){
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}
