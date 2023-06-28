import React, {useEffect, useState} from 'react';
import {getCookie} from "../../utils";

function App() {
    // const [ws, setWs] = useState(null);
    //
    // useEffect(() => {
    //     const websocket = new WebSocket('ws://' + window.location.host + '/ws/notifications/');
    //
    //     websocket.onopen = (event) => {
    //         console.log('WebSocket is open now.');
    //         websocket.send(JSON.stringify({message: 'Hello Server'}));
    //     };
    //
    //     websocket.onmessage = (event) => {
    //         console.log('Received:', event.data);
    //     };
    //
    //     websocket.onclose = (event) => {
    //         console.log('WebSocket is closed now.');
    //     };
    //
    //     websocket.onerror = (event) => {
    //         console.error('WebSocket error observed:', event);
    //     };
    //
    //     setWs(websocket);
    // }, []);
    //
    //
    // const sendMessage = () => {
    //     if (ws) {
    //         ws.send(JSON.stringify({message: 'Hello from React'}));
    //     }
    // };

    return (
        <div>
            {/*<button onClick={sendMessage}>Send Message</button>*/}
            people
        </div>
    );
}

export default App;
