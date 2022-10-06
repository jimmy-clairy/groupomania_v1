import React from 'react'
import './Card.css'

export default function Card(props) {
  return (
    <div className="Card">
      <img src={props.imageUrl} alt="img post" width={200} />
      <div className="text">
        <p>{props.post}</p>
      </div>
    </div>
  )
}
