import React, { useEffect } from 'react'
import { useState } from 'react';

export const userContext = React.createContext();

function UserContext(props) {

    const [users, updateUsers] = useState([]);

    useEffect(()=>{
        console.log('rerender');
        console.log(users);
    }, [users])

    return (
        <userContext.Provider value={{ users, updateUsers }}>
                {props.children}
        </userContext.Provider>
    )
}

export default UserContext