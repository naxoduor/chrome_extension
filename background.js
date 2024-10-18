    /*global chrome*/

    chrome.runtime.onInstalled.addListener(() => {
      chrome.storage.sync.set({
        adminMessages: [
                {
          id: "msg123",
          content: "Team meeting at 3 PM today 🙂",
          priority: "high",
          timestamp: "2024-09-30T15:00:00Z",
          read: false,
        },
              {
          id: "msg123",
          content: "Team meeting at 3 PM today 🙂",
          priority: "high",
          timestamp: "2024-09-30T15:00:00Z",
          read: false,
        },
        ],
      });
    });
    async function fetchMessages() {
      // Assuming the admin's messages are accessible via some API endpoint
      // const response = await fetch("https://example.com/admin/messages");
      const data = [
        {
          id: "msg123",
          content: "Team meeting at 3 PM today 🙂",
          priority: "high",
          timestamp: "2024-09-30T15:00:00Z",
          read: false,
        },
  
        {
          id: "msg123",
          content: "Team meeting at 3 PM today 🙂",
          priority: "high",
          timestamp: "2024-09-30T15:00:00Z",
          read: false,
        },
      ];
      chrome.storage.sync.set({ adminMessages: data });
    }
    
    async function createNotification() {
      chrome.notifications.create({
        type: "image",
        iconUrl: "logo512.png",
        title: "New Message from Admin",
        message: "meeting",
        imageUrl: "logo512.png", // Image to display in the notification
      });
    }
    
    chrome.runtime.onInstalled.addListener(() => {
      chrome.alarms.create("fetchMessages", {
        delayInMinutes: 0.2,
        periodInMinutes: 0.2,
      });
    });
    
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === "fetchMessages") {
        console.log("fetch message");
        fetchMessages();
        createNotification();
    
        chrome.storage.sync.get(["adminMessages"], (result) => {
          console.log("print message stored in chrome");
          console.log(result);
          console.log("proceed");
          const response = (result.adminMessages);
          console.log(response);
          response.map((msg, index) => {
            console.log("print individual messages");
            console.log(msg.content);
          });
        });
      }
    });
  