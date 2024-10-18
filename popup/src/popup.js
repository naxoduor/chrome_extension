    /*global chrome*/

import React, { useState, useEffect } from 'react';
import './popup.css'

const PopUp = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchStorageData = () => {
    chrome.storage.sync.get(['adminMessages'], (result) => {
      setMessages(result.adminMessages || 'No data');
    });
  };


  useEffect(() => {
    try{
      fetchStorageData();
    }
    finally{
      setLoading(false)
    }

    // Fetch messages from Chrome storage or an external source
    const handleStorageChange = (changes, areaName) => {
      if (changes.key) {
        setMessages(changes.key.newValue);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

   
  }, []
);

if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Messages</h1>
      <ul>
        {messages.length > 0 ? (
          messages.map((msg, index) => <li key={index}><h3>{msg.content}</h3></li>)
        ) : (
          <li>No new messages</li>
        )}
      </ul>
    </div>
  );
};

export default PopUp;
