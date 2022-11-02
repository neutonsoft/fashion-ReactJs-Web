import React from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import moment from "moment";
import "stream-chat-react/dist/css/v2/index.css";
import "./Chat.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const App = ({ onClose }) => {
  const [channel, setChannel] = useState(null);
  const [chatClient, setClient] = useState(null);
  const [user, setUser] = useState({
    user_id: null,
    user_token: null,
    channel: null,
  });
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    let user_id = null;
    let user_token = null;
    let channel = null;
    const getUserInfo = async () => {
      user_id = localStorage.getItem("fashion_chat_user_id");
      user_token = localStorage.getItem("fashion_chat_user_token");
      channel = localStorage.getItem("fashion_chat_channel");
      if (!user_id && !user_token) {
        const { data } = await axios.get("/api/v1/chat_token");
        user_id = data.user_id;
        user_token = data.user_token;
        localStorage.setItem("fashion_chat_user_id", user_id);
        localStorage.setItem("fashion_chat_user_token", user_token);
        localStorage.setItem("fashion_chat_channel", "channel_" + user_id);
      }
      if (user_id && user_token)
        setUser({
          user_id,
          user_token,
          channel,
        });
    };
    getUserInfo();
  }, []);
  useEffect(() => {
    if (user.user_id && user.user_token) {
      const { user_id, user_token } = user;
      const chatClient = StreamChat.getInstance("xxyvqq925edc");
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4xIn0.KHYPsv8zoP-Lie-i5UrDIvu7hLcwxGaJEEBNgse_80g";

      const admin_id = "admin1";
      isAuthenticated === true
        ? chatClient.connectUser(
            {
              id: admin_id,
              name: "admin1",
              image: `https://getstream.io/random_png/?id=${admin_id}&name=admin1`,
            },
            adminToken
          )
        : chatClient.connectUser(
            {
              id: user_id,
              name: user_id,
              image: `https://getstream.io/random_png/?id=${user_id}&name=${user_id}`,
            },
            user_token
          );

      const channel = chatClient.channel("messaging", user.channel, {
        image: "https://www.drupal.org/files/project-images/react.png",
        name: "Talk about React",
        members: [admin_id, user_id],
      });
      setClient(chatClient);
      setChannel(channel);
    }
  }, [user]);
  return (
    <div className="chat-container">
      <div className="chat-header" onClick={() => onClose()}>
        <div />
        <div className="chat-title">Online chat</div>
        <div className="chat-close">
          <svg>
            <line className="chat-close-line" x1="0" y1="0" x2="10" y2="10" />
            <line className="chat-close-line" x1="0" y1="10" x2="10" y2="0" />
          </svg>
        </div>
      </div>
      {chatClient && channel && (
        <Chat client={chatClient} theme="str-chat__theme-light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      )}
    </div>
  );
};

export default App;
