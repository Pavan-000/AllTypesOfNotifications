import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3000')



function App() {
  const [notif, setNotif] = useState([]);
  useEffect(() => {
    if(Notification.permission == 'default' || Notification.permission == 'denied'){
      Notification.requestPermission().then((permission) => {
        if(permission === 'granted')
            console.log("Permission Granted")
        else{
          console.log("Permission denied")
        }
      }
  )}
    socket.on("pushNotification", (data) => {
      console.log("Recieved notification", data)
      if(Notification.permission === 'granted'){
          new Notification('New Notification', {
            body : data.msg,
            //icon : "//address",
          })
      }
      setNotif((prev) => [...prev, data])
    })
    // socket.on('pushNotification', (data) => {
    //   console.log("Recieved", data)
    //   setNotif((prev) => 
    //     [...prev, data]
    //   )
    // })
    return () => {
      socket.off("pushNotification")
    }
  }, [])

  return(
    <>
      <h1>Push Notifications</h1>
        {notif.map((data, index) => {
          return <h2 key={index}>{data.msg}</h2>
        })}
    </>
  )
}

export default App;