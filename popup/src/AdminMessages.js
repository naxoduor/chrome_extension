    /*global chrome*/

// import React, { useState, useEffect } from 'react';

// const AdminMessages = () => {
//   const [messages, setMessages] = useState(null);

//   useEffect(() => {
//     // chrome.storage.local.get(['adminMessages'], (result) => {
//     //  const response = await JSON.parse(result.adminMessages)
//      setMessages("message")
//   // })
//   }, []
// );


// const [data, setData] = useState(null);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const fetchData = async () => {
    // try {
      // const result = await chrome.storage.sync.get(['adminMessages'])
      // console.log("fetch the bamn data")
      // const result = await response.json();
      // setData(JSON.parse(result.adminMessages));
      // setData(["Data"])
    // } catch (error) {
      // console.error('Error fetching data:', error);
    // } finally {
      // setLoading(false);
//     }
//   };

//   fetchData();
// }, []); 

// if (loading) return <div>Loading...</div>;
// return <div>Data: {data}</div>;

//   return (
//     <div>
//       <h3>Admin Messages</h3>
//       <ul>
//         {messages.length > 0 ? (
//           messages.map((msg, index) => <li key={index}>ONE</li>)
//         ) : (
//           <li>No new messages</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default AdminMessages;


import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchStorageData = () => {
    chrome.storage.sync.get(['adminMessages'], (result) => {
      console.log("log result")
      console.log(result)
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
          messages.map((msg, index) => <li key={index}>{msg.message}</li>)
        ) : (
          <li>No new messages</li>
        )}
      </ul>
    </div>
  );
};

export default AdminMessages;
