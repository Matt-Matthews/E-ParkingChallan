import React from 'react'

interface Props{
  amount: number;
  openPay: () =>void
}

const OptionsMenu = ({amount, openPay}: Props) => {

   const AddtoTax = async (amount:number) => {
    const token = localStorage.getItem("jwt");
    const response = await fetch(
      `http://localhost:5000/annualTax/add`,
      {
        method: "POST",
        body: JSON.stringify({amount}),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if(response.ok) alert("Added to annual Tax")
      else alert(response.statusText)
  }
  return (
    <div className='w-40 h-40 flex flex-col gap-2 popup-form shadow-md absolute top-5 rounded-md right-0 z-50'>
        <button className='bg-transparent'>View</button>
        <button onClick={()=>openPay()}  className='bg-transparent'>Pay</button>
        <button onClick={()=>AddtoTax(amount)} className='bg-transparent'>Add to Tax</button>
    </div>
  )
}

export default OptionsMenu