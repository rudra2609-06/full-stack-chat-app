import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./MessageSkeleton.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    selectedUser,
    isLoadingMessages,
    getAllMessages,
    messages,
    messageSubscriber,
    unsubscribeMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    console.log("ran");
    if (selectedUser?._id) {
      getAllMessages(selectedUser._id);
      messageSubscriber();
    }
    return () => unsubscribeMessage();
  }, [
    getAllMessages,
    selectedUser?._id,
    messageSubscriber,
    unsubscribeMessage,
  ]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(
    "all text",
    messages.map((m) => m.text),
  );
  console.log("messages returned", messages);

  setTimeout(() => {
    if (isLoadingMessages) {
      return (
        <div className="flex flex-col flex-1 overflow-auto">
          <ChatHeader />
          <MessageSkeleton />
          <MessageInput />
        </div>
      );
    }
  }, 3 * 1000);

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
        {selectedUser && <ChatHeader />}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            return (
              <div
                key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message?.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-50 rounded-md mb-2"
                    />
                  )}
                  {message.text && <p className="text-white">{message.text}</p>}
                </div>
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>
        <MessageInput />
      </div>
    </>
  );
};

export default ChatContainer;
