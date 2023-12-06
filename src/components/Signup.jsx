import React, { useState } from 'react'
import styled from 'styled-components';

export default function Signup() {
  const [username, setUsername] = useState("")  
  const [email, setEmail] = useState("")  
  const [pass, setPass] = useState("")

  const handleRegister = ()=>{
    const data = {
        username,email,pass
    }
    // console.log(data)
    fetch("https://ruby-pigeon-cap.cyclic.app/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

  }

  return (
    <DIV>
    <SignupContainer>
    <SignupTitle>Register a new user</SignupTitle>
    <InputField
      type="text"
      value={username}
      placeholder="Enter username..."
      onChange={(e) => setUsername(e.target.value)}
    />
    <InputField
      type="email"
      value={email}
      placeholder="Enter email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputField
      type="password"
      value={pass}
      placeholder="Enter password..."
      onChange={(e) => setPass(e.target.value)}
    />
    <RegisterButton onClick={handleRegister}>Register</RegisterButton>
  </SignupContainer>
</DIV>
  )
}



const SignupContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
`;

const SignupTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;


const DIV = styled.div`
  background-color: #f8cfcf;
  height: 100vh;
`