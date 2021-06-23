import React, { useState, useCallback, useMemo, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Button, Input } from "antd";
import css from "./_.module.css";

const WebSocket = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org");
  const [message, setMessage] = useState();
  const [socketUrlTmp, setSocketUrlTmp] = useState();
  const messageHistory = useRef([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  messageHistory.current = useMemo(() => {
    return messageHistory.current.concat(lastMessage);
  }, [lastMessage]);

  const handleClickChangeSocketUrl = () => {
    if (socketUrlTmp) {
      console.log(socketUrlTmp);
      setSocketUrl(socketUrlTmp);
      setSocketUrlTmp(null);
    }
  };
  const handleClickSendMessage = () => {
    sendMessage(message);
    setMessage(null);
  };
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className={css.container}>
      <span>The WebSocket is currently {connectionStatus}</span>
      <div>
        <Input
          placeholder="Socket url"
          value={socketUrlTmp}
          onChange={(e) => setSocketUrlTmp(e.target.value)}
          onPressEnter={handleClickChangeSocketUrl}
        />
        <Button className={css.btn} onClick={handleClickChangeSocketUrl}>
          Set Socket Url
        </Button>
      </div>
      <div>
        <Input
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleClickSendMessage}
        />
        <Button
          className={css.btn}
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Send Message
        </Button>
      </div>

      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.current.map((message, idx) =>
          message !== null ? <li key={idx}>{message.data}</li> : null
        )}
      </ul>
    </div>
  );
};

export default WebSocket;
