import React, { useState, useEffect } from "react";
import { ref, push, serverTimestamp, onValue, off } from "firebase/database";
import { database } from "../firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

const Chatbox = () => {
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [numberSubmitted, setNumberSubmitted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [nameMessage, setNameMessage] = useState(null);
  const [showHelpMessage, setShowHelpMessage] = useState(true);

  useEffect(() => {
    const userRef = ref(database, `users/${userName}/chat`);

    const onData = (snapshot) => {
      const data = snapshot.val();
      const messageArray = data ? Object.values(data) : [];

      if (nameMessage) {
        messageArray.unshift(nameMessage);
      }

      setMessages([
        {
          text: "Hi  Welcome To RPMPL",
          timestamp: new Date().getTime(),
          sender: "admin",
        },
        {
          text: "WE ARE ONLINE",
          timestamp: new Date().getTime(),
          sender: "admin",
        },
        {
          text: "WOULD YOU LIKE TO CHAT WITH OUR LIVE AGENT",
          timestamp: new Date().getTime(),
          sender: "admin",
        },
        ...messageArray,
      ]);

      setLoading(false);
    };

    onValue(userRef, onData);

    return () => {
      off(userRef, onData);
    };
  }, [userName, nameMessage]);

  const convertServerTimestampToTime = (serverTimestamp) => {
    const date = new Date(serverTimestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (!nameSubmitted) {
      if (message.trim() !== "") {
        setUserName(message.trim());
        setNameSubmitted(true);

        const userData = {
          text: message.trim(),
          timestamp: serverTimestamp(),
          sender: "userName",
        };

        push(ref(database, `users/${userName}/chat`), userData);

        setNameMessage({
          text: `Welcome, ${message.trim()}! Please enter your phone number:`,
          timestamp: new Date().getTime(),
          sender: "admin",
          system: true,
        });

        setMessage("");
        return;
      }
    }

   // ... (previous code)

   if (nameSubmitted && !numberSubmitted) {
    if (message.trim() !== "") {
      setPhoneNumber(message.trim());
      setNumberSubmitted(true);
  
      const numberData = {
        text: message.trim(),
        timestamp: serverTimestamp(),
        sender: userName,
      };
  
      push(ref(database, `users/${userName}/chat`), numberData);
  
      const helpMessage = "What can we help you with?";
      
      setNameMessage({
        text: nameMessage ? nameMessage.text : helpMessage,
        timestamp: new Date().getTime(),
        sender: "admin",
        system: true,
      });
  
      setMessage("");
      return;
    }
  }

// ... (rest of the code)


    if (nameSubmitted && numberSubmitted && !issueSubmitted) {
      if (message.trim() !== "") {
        const issueData = {
          text: message.trim(),
          timestamp: serverTimestamp(),
          sender: userName,
        };

        push(ref(database, `users/${userName}/chat`), issueData);

        setIssueSubmitted(true);
        setShowHelpMessage(false)
        setMessage("");
        return;
      }
    }

    if (nameSubmitted && numberSubmitted && !issueSubmitted) {
      if (message.trim() !== "") {
        const issueData = {
          text: message.trim(),
          timestamp: serverTimestamp(),
          sender: userName,
        };

        push(ref(database, `users/${userName}/chat`), issueData);

        setIssueSubmitted(true);
        setMessage(""); // Clear the message input
        return;
      }
    }

    if (nameSubmitted && numberSubmitted && issueSubmitted) {
      if (message.trim() !== "" || file) {
        const messageData = {
          text: message,
          timestamp: serverTimestamp(),
          sender: userName,
        };

        if (file) {
          const reader = new FileReader();

          reader.onloadend = () => {
            messageData.file = {
              url: reader.result,
              name: file.name,
              type: file.type,
              size: file.size,
            };

            push(ref(database, `users/${userName}/chat`), messageData);
            setMessage("");
            setFile(null);
          };

          reader.readAsDataURL(file);
        } else {
          push(ref(database, `users/${userName}/chat`), messageData);
          setMessage("");
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const inputPlaceholder = !nameSubmitted
    ? "Enter your name..."
    : !numberSubmitted
    ? "Enter your phone number..."
    : !issueSubmitted
    ? "What can we help you with?"
    : "Type your message...";
    const handleChatboxClose = () => {
      // Add any necessary cleanup operations before refreshing
      window.location.reload();
    };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4" style={{ textAlign: "right" }}>
          <div className="chatbox">
            <div className="chat-header">
              <span className="he"> <img  className="oko" src="https://img.rehousingpackers.in/cndimg/rehousing-packers-pvt-ltd-logo.png"></img></span>
              {/* <span className="two">PACKERS </span>
              <span className="tw"> PVT.L</span> */}
              <button className="close-btn" onClick={handleChatboxClose}  >&#x2715;</button>
            </div>
            <div className="chat-body">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <div>
                  {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                      {msg.sender === userName ? (
                        <div className="msg right-msg">
                          <div
                            className="msg-img"
                            style={{ backgroundImage: "url()" }}
                          ></div>
                          <div className="msg-bubble">
                            <div className="msg-info">
                              <div className="msg-info-name">{msg.sender}</div>
                            </div>
                            {msg.file && (
                              <div className="msg-file">
                                <span>
                                  <img
                                    src={msg.file.url}
                                    alt="Uploaded File"
                                  ></img>
                                </span>
                              </div>
                            )}
                            <div className="msg-text">{msg.text}</div>
                           
                          </div>
                          <div className="msg-info-time">
                            {convertServerTimestampToTime(msg.timestamp)}
                          </div>
                        </div>
                      ) : (
                        <div className="msg left-msg">
                          <div className="msg-bubble">
                            <div className="msg-info">
                              <div className="msg-info-name">{msg.sender}</div>
                              
                            </div>
                            {msg.file && (
                              <div className="msg-file">
                                <span>
                                  <img
                                    src={msg.file.url}
                                    alt="Uploaded File"
                                  ></img>
                                </span>
                              </div>
                            )}
                            <div className="msg-text">{msg.text}</div>
                          </div>
                          <div className="msg-info-time">
                            {convertServerTimestampToTime(msg.timestamp)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  { !nameMessage && (
  <div className="chat-message">
    <div className="msg admin-msg">
      <div className="msg-bubble">
        <div className="msg-text">Enter your Name</div>
      </div>
    </div>
  </div>
  
)}
{numberSubmitted&& showHelpMessage && (
        <div className="chat-message">
          <div className="msg admin-msg">
            <div className="msg-bubble">
              <div className="msg-text">
              What can we help you with?
              </div>
            </div>
          </div>
        </div>
      )}

                </div>
              )}
            </div>
            <div className="chat-footer">
              <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={inputPlaceholder}
              />
              <label htmlFor="fileInput">
                <FontAwesomeIcon icon={faPaperclip} />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
