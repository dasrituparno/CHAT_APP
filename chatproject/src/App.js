import React, { useState } from 'react';
// import './App.css';

function App() {
  const [artsChat, setArtsChat] = useState([]);
  const [scienceChat, setScienceChat] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [username, setUsername] = useState('');
  const [artsMessageId, setArtsMessageId] = useState(1);
  const [scienceMessageId, setScienceMessageId] = useState(1);

  const handleSendMessage = () => {
    if (!username) {
      alert('Please enter your username.');
      return;
    }

    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }

    const chatData = {
      username: username,
      group: selectedGroup,
      message_id: selectedGroup === 'arts' ? artsMessageId : scienceMessageId,
      message: message
    };

    // Increment the message ID counter for the selected group
    if (selectedGroup === 'arts') {
      setArtsMessageId(artsMessageId + 1);
      setArtsChat([...artsChat, chatData]);
    } else if (selectedGroup === 'science') {
      setScienceMessageId(scienceMessageId + 1);
      setScienceChat([...scienceChat, chatData]);
    }
    setMessage('');

    // Post message to backend
    fetch('http://your-backend-api-url/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Message sent', data);
    })
    .catch(error => {
      console.error('failed', error);
    });
  };

  return (
    <div className="App">
      <h1>Chat Here</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setSelectedGroup('arts')}>Arts</button>
        <button onClick={() => setSelectedGroup('science')}>Science</button>
      </div>
      {selectedGroup === 'arts' && (
        <div>
          <h2>Arts Chat</h2>
          {artsChat.map((chat, index) => (
            <p key={index}>
              <strong>{chat.username}:</strong> {chat.message}
            </p>
          ))}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
      {selectedGroup === 'science' && (
        <div>
          <h2>Science Chat</h2>
          {scienceChat.map((chat, index) => (
            <p key={index}>
              <strong>{chat.username}:</strong> {chat.message}
            </p>
          ))}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
