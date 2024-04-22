import React from 'react'

const VehiclesView = () => {
  return (
    <div>VehiclesView</div>
  )
}

export default VehiclesView

// const res = await fetch("http://localhost:5000/vehicles/add", {
//       method: "POST",
//       body: JSON.stringify({
//         registration: "pkl 123 L",
//         model: "Toyota",
//         make: "Corolla",
//         vinNumber: "ADDADADG213",
//         ownerId: decoded.id,
//         color: "Black",
//         createdAt: Date.now
//       }),
//       headers: {
//         "Accept": "application/json, text/plain",
//         "Content-Type": "application/json;charset=UTF-8",
//         "Authorization": `Bearer ${token}`,
//       },
//     });