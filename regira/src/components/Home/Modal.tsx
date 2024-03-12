import React, { useEffect } from 'react'
import { ModalType } from '../../types'


function AddProject() {
  return(
    <h1>AFEGIR PROJECTE</h1>
  )
}

function AddIssue() {
  return(
    <h1>AFEGIR Issue</h1>
  )
}

export default function Modal(props: ModalType) {

  const { type, addType } = props


  useEffect(() => {
    console.log(type)
  }, [])

  return (
    <div className='bg-yellow-400 w-screen h-screen absolute top-0 left-0'>
      {
        type === "project" ? <AddProject /> : <AddIssue></AddIssue>
      }
    </div>
  )
}
