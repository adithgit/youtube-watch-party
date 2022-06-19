
class Rooms {
    constructor() {
        this.room = [];
        this.users = new Map();
    }

    addRoom = (roomId, host, videoURL) => {
        // Push the newly created room into room array
        this.room.push({ roomId, members: [host], videoURL });
        // add user info to user map with the room they are part of 
        this.users.set(host, roomId);
        console.log(this.room);
    }

    addUser = (roomId, userData) => {
        // find index of room
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        console.log(index);
        // add the new user to the users array
        this.room[index].members.push(userData);
        // add user info to user map with the room they are part of 
        this.users.set(userData.id, roomId);
    }

    getUsers = ( roomId ) => {
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        return this.room[ index ].members;

    }

    getVideoUrl = ( roomId ) => {
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        return this.room[ index ].videoURL
    }

    removeuser = (userId) => {
        let index = this.room.map((room) => room.roomId).indexOf(this.users.get(userId));

        try {
            this.room[index].members = this.room[index].members.filter((user) => {
                return user != userId;
            })
            this.users.delete(userId);
            // if no users then delete the room
            this.room[index].members.length === 0 ? this.room.splice(index, index) : console.log(this.room);

        }
        catch (e) {
            console.log("error deleting user.");
        }
    }
}

module.exports = new Rooms();