
class Rooms {
    constructor() {
        this.room = [];
        this.users = new Map();
    }

    checkRoom = ( roomId )=>{
        return new Promise((resolve, reject)=>{
            this.room.map((room)=>{
                if( room.roomId === roomId ){
                    resolve(true)
                }
            });
            resolve(false)
        })
    }
    addRoom = (roomId, host, videoURL) => {
        // Push the newly created room into room array
        this.room.push({ roomId, members: [host], videoURL });
        // add user info to user map with the room they are part of 
        this.users.set(host.id, roomId);
    }

    addUser = (roomId, userData) => {
        // find index of room
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        // add the new user to the users array
        this.room[index].members.push(userData);
        // add user info to user map with the room they are part of 
        this.users.set(userData.id, roomId);
        console.log(this.users);
    }

    getUsers = ( roomId ) => {
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        return this.room[ index ].members;

    }

    getRoomId = ( socketId ) =>{
        return this.users.get( socketId );
    }

    getVideoUrl = ( roomId ) => {
        let index = this.room.map((room) => room.roomId).indexOf(roomId);
        return this.room[ index ].videoURL
    }

    removeuser = (userId) => {
        let index = this.room.map((room) => room.roomId).indexOf(this.users.get(userId));
        try {
            this.room[index].members = this.room[index].members.filter((user) => {
                return user.id != userId;
            })
            this.users.delete(userId);
            // if no users then remove the room
            this.room[index].members.length === 0 ? this.room.splice(index, 1) : console.log(this.room);

        }
        catch (e) {
            console.log("error deleting user.");
        }
    }
}

module.exports = new Rooms();