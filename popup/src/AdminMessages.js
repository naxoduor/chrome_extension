    /*global chrome*/

import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
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
      <h3>Admin Messages</h3>
      <ul>
        {messages.length > 0 ? (
          messages.map((msg, index) => <li key={index}>{msg.content}</li>)
        ) : (
          <li>No new messages</li>
        )}
      </ul>
    </div>
  );
};

export default AdminMessages;
