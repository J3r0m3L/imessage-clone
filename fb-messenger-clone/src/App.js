import React, { useState, useEffect } from 'react';
import { Button, InputLabel, Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Message from './Message.js';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  // useEffect lets you run a piece of code once the component renders (run code on a condition in REACT)
  // useState is shortterm memory per refresh (variable in REACT)

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
    setMessages([...messages, {username: username, text: input}]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
          <Button disabled = {!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>Send Message</Button>
        </FormControl>
        {/* Sets value to input which is defined as useState ('') and then onChange ('event.target.value') allows you to enter text */}
        {/* button type='submit' lets you use enter to submit something and event.preventDefault prevents refresh */}
      </form>

      {
        messages.map(message => (
          <Message username={message.username} text={message.text}/>
        ))
        //Loops through the message array so you can display on the screen
        //passes a prop {message} into message.js and returns output as <Message />
      }
      {/* input field */}
      {/* button */}
      {/* message themselves */}
    </div>
  );
}

export default App;
