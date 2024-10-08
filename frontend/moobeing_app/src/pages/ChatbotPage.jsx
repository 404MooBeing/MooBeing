import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { postChat } from "../apis/ChatApi";
import { SyncLoader } from "react-spinners";
import sendButton from "../assets/button/SendButton.png";
import chatbot from "../assets/radishes/chatbotRad.png"
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  background-color: #F5FDED;
  box-sizing: border-box;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  flex-grow: 1;
  background-color: #F5FDED;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 66vh;
  overflow-y: scroll;
  padding: 20px 15px 30px 25px;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AIMessage = styled.div`
  align-self: flex-start;
  background-color: #dff0d8;
  padding: 10px 20px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  max-width: 60%;
  font-size: 16px;
  line-height: 1.5;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background-color: #348833;
  color: white;
  padding: 10px 12px;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  max-width: 60%;
  font-size: 16px;
  line-height: 1.5;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 70px; 
  z-index: 10;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 90%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 45px 10px 18px;
  font-size: 16px;
  border: 1.5px solid #348833;
  border-radius: 20px;
  outline: none;
  box-sizing: border-box;
`;

const SubmitButton = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background-image: url(${sendButton});
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

const DateDisplay = styled.div`
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
`;

const LoadingMessage = styled.div`
  align-self: flex-start;
  padding: 10px;
`;

const ChatbotImg = styled.img`
  width: 30px;
  height: 35px;
  margin-right: 10px;
  margin-bottom: -10px;
`

const ChatbotPage = () => {
  dayjs.locale('ko');
  const currentDay = dayjs().format("YYYY.MM.DD (ddd)");
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { type: 'user', text: userInput };
    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await postChat(userInput);
      const aiMessage = { type: 'ai', text: response.answer };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('채팅 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Container>
      <ChatContainer>
        <MessageContainer ref={messageContainerRef}>
          <DateDisplay>{currentDay}</DateDisplay>
          {messages.map((msg, index) =>
            msg.type === 'user' ? (
              <UserMessage key={index}>{msg.text}</UserMessage>
            ) : (
              <>
                <ChatbotImg src={chatbot} alt="Chatbot" />
                <AIMessage key={index}>{msg.text}</AIMessage>
              </>
            )
          )}
          {isLoading && (
            <LoadingMessage>
              <SyncLoader color="#348833" size={8} />
            </LoadingMessage>
          )}
        </MessageContainer>
      </ChatContainer>
      <InputArea>
        <InputWrapper>
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="궁금한 것을 물어보세요."
          />
          <SubmitButton onClick={handleSendMessage} />
        </InputWrapper>
      </InputArea>
    </Container>
  );
};

export default ChatbotPage;