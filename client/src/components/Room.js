import React from 'react'
import { useParams } from 'react-router-dom'

function Room() {
    let params = useParams();
  return (
    <div>Entered Room No {params.roomId}</div>
  )
}

export default Room