
class Rooms {
    constructor() {
        this.room = [];
        this.users = new Map();
    }

    checkRoom = ( roomId )=>{
        return new Promise((resolve, reject)=>{
            this.room.map((room)=>{
                if( room.roomId === roomId ){
                    resolve(room)
                }
            });
            resolve(false)
        })
    }
    
    addRoom = (roomId, host, videoId) => {
        // Push the newly created room into room array
        this.room.push({ roomId, members: [host], videoId });
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
        return new Promise((resolve, reject)=>{
            let index = this.room.map((room) => room.roomId).indexOf(roomId);
            const members = this.room[ index ].members;
            resolve(members);
        }).catch(()=>{
            console.log("couldn't fetch members");
        })

    }


    getRoomId = ( socketId ) =>{
        return this.users.get( socketId );
    }

    getVideoUrl = ( roomId ) => {
        return new Promise((resolve, reject)=>{
            let index = this.room.map((room) => room.roomId).indexOf(roomId);
            const id = this.room[index].videoId;
            resolve(id);    
        }).catch((err)=>{
            reject(err);
        })
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

    changeVideo = (roomId, videoId)=>{
        this.room.map((room)=>{
            if( room.roomId === roomId ){
                room.videoId = videoId;
            }
        });
    }
}

module.exports = new Rooms();