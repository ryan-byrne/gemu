import {React, useCallback, useState, useEffect} from 'react';
const io = require('socket.io-client');
const socket = io();

const TestApp = () => {

  const [date, setDatetime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleMsgChange = useCallback( event => {
    setMessage(event.target.value);
  }, []);

  socket.on('userExists', (data) => {
    setError(data)
  });

  socket.on('userSet', (data) => {
    console.log(data);
  });

  return (
    <div>
      <input onChange={handleMsgChange} type='text'/>
      {message}
      <button onClick={()=>socket.emit('setUsername', message)}>Click me</button>
      <div>{error}</div>
    </div>
  )

}

export default TestApp;
