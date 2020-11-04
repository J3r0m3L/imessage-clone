import React, { useState, useEffect } from 'react';
import { Button, InputLabel, Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message.js';
import db from './firebase.js';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  // useEffect lets you run a piece of code once the component renders (run code on a condition in REACT)
  // useState is shortterm memory per refresh (variable in REACT)
  useEffect(() => {
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });
    //All documents are in the snapshot :)
  }, [] )

  useEffect(() => {
    //run code here...
    // if its blank inside [], this code runs ONCE when the app component loads
    setUsername(prompt('Please enter your name.'));
  }, [] ) //condition


  const sendMessage = (event) => {
    // all the logic to send a message goes in here
    // ...messages adds input to the useState array
    // why use state instead of variable; cuz state lets u change stuff without refresh button
    event.preventDefault();
    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    // use this function because the time will be based off the server instead of individual terminals to solve timezone difference
    // firebase sorts docs by alphabetical order of their unique id.
    //setMessages([...messages, {username: username, message: input}]);
     setInput("");
  }
  return (
    <div className="App">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Facebook_Messenger_logo_2013.svg" />
      <h1>Welcome to my Facebook Messenger Clone</h1>
      <h2>{username}</h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input className='app_input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton className = 'app_iconButton' disabled = {!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
        {/* Sets value to input which is defined as useState ('') and then onChange ('event.target.value') allows you to enter text */}
        {/* button type='submit' lets you use enter to submit something and event.preventDefault prevents refresh */}
      </form>
      <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message}/>
        ))
        //Loops through the message array so you ca n display on the screen
        //passes a prop {message} into message.js and returns output as <Message />
      }
      </FlipMove>
    </div>
  );
}

export default App;
