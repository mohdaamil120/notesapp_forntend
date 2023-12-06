import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Input, useDisclosure } from "@chakra-ui/react";
import styled from 'styled-components';


export default function Notes() {
  const [data,setData] = useState([])
  const [render,setRender] = useState(false)
  const [editedNote, setEditedNote] = useState({ id: '', title: '', body: '' });
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(()=>{
    fetch("https://ruby-pigeon-cap.cyclic.app/notes",{
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setData([...data])
      })
      .catch(err => console.log(err))

  },[render])

  const handleDelete = (id)=>{
    fetch(`https://ruby-pigeon-cap.cyclic.app/notes/delete/${id}`,{
          method:"DELETE",
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setData((prevData) => prevData.filter((note) => note._id !== id))
      })
      .catch(err => console.log(err))

      setRender((prev)=>!prev)
  }


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
  }


  const handleEditSubmit = () => {
    fetch(`https://ruby-pigeon-cap.cyclic.app/notes/update/${editedNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: editedNote.title,
        body: editedNote.body
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setData((prevData) => prevData.map((note) => (note._id === editedNote.id ? { ...note, title: editedNote.title, body: editedNote.body } : note)));
        // handleCloseEditModal();
      })
      .catch(err => console.log(err));

    setRender((prev) => !prev);
    onClose();
  }

  
  const handleEditClick = (note) => {
    onOpen(); // Open the modal
    setEditedNote({ id: note._id, title: note.title, body: note.body });
  }

  return (
    <NotesContainer>
    <div   >
        <h1 className='head' >All the notes are here...</h1>
        {
            data?.map((el)=>{
                return(
                    <NoteCard>
                    <div id='card' key={Math.random()*10}>
                        <h3>{el.title}</h3>
                        <p>{el.body}</p>
                        <button onClick={() => handleEditClick(el)}>Edit</button>
                        <button onClick={()=>handleDelete(el._id)} >Delete</button>
                    </div>
                     </NoteCard>
                )
            })
        }

        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Note</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <label>Title:</label>
                    <Input type="text" name="title" value={editedNote.title} onChange={handleEditInputChange} />
                    <label>Body:</label>
                    <Textarea name="body" value={editedNote.body} onChange={handleEditInputChange} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}  onClick={handleEditSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

    </div>
    </NotesContainer>
  )
}



const NotesContainer = styled.div`
 background-color: #091758;
  padding: 20px;
  border-radius: 5px;

  h1{
    color: white;
    font-size: 30px;
  }
`;

const NoteCard = styled.div`
  background-color: #090958;
  color: white;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }

  button {
    margin-right: 10px;
    background-color: #4caf50;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #388e3c; /* Darker green color on hover */
    }
  }
`;