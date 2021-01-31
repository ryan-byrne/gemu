import {React, useState, useEffect} from 'react';

const Message = ({message, color}) => {

  const [visible, setVisible] = useState(true);
  const time = Date

  useEffect(()=> {
    setTimeout(()=> {
      setVisible(false);
    }, 3000);
  });

  return (
    visible ? <div style={{color:color}}>{message}</div> : null
  )
}


export default Message;
