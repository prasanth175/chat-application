import React, { Component } from 'react';
import { PiUsersLight } from 'react-icons/pi';
import { BsEmojiWink } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import EmojiPicker from 'emoji-picker-react';
import './index.css';
import UserList from '../UserList';

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
const colors = ["#2D4356", "#394867", "#9336B4", "#E966A0", "#1F6E8C"];

class ChatEnvironment extends Component {
  state = {
    search: '',
    showEmojiPicker: false,
    chatMessages: [],
    showUserList: false,
    selectedUser: '',
  };

  chatContainerRef = React.createRef();

  handleEmojiSelect = (emoji) => {
    this.setState((prevState) => ({
      search: prevState.search + emoji.emoji,
    }));
  };

  onSearch = (event) => {
    const { showUserList } = this.state;
    const searchValue = event.target.value;

    if (searchValue.endsWith('@')) {
      this.setState({
        search: searchValue,
        showUserList: true,
      });
    } else {
      this.setState({
        search: searchValue,
        showUserList: showUserList && searchValue.includes('@'),
      });
    }
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.addMessage();
    }
  };

  handleLikeClick = (index) => {
    this.setState((prevState) => {
      const updatedChatMessages = [...prevState.chatMessages];
      updatedChatMessages[index] = {
        ...updatedChatMessages[index],
        likes: updatedChatMessages[index].likes + 1,
      };
      return { chatMessages: updatedChatMessages };
    });
  };

  scrollToBottom = () => {
    if (this.chatContainerRef.current) {
      this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
    }
  };

  toggleEmojiPicker = () => {
    this.setState((prevState) => ({
      showEmojiPicker: !prevState.showEmojiPicker,
    }));
  };

  toggleUserList = () => {
    this.setState((prevState) => ({
      showUserList: !prevState.showUserList,
    }));
  };

  selectUser = (user) => {
    this.setState((prevState) => ({
      search: prevState.search + user + ' ',
      showUserList: false,
      selectedUser: user,
    }));
  };

  addMessage = () => {
    const { search, chatMessages } = this.state;

    if (search.trim() !== '') {
      const randomIndex = Math.floor(Math.random() * user_list.length);
      const username = user_list[randomIndex];
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[randomColorIndex];

      const newMessage = {
        text: search,
        timestamp: new Date().toLocaleTimeString(),
        username: username,
        color: color,
        likes: 0,
      };

      this.setState(
        {
          chatMessages: [...chatMessages, newMessage],
          search: '',
          showUserList: false,
          selectedUser: '',
        },
        () => {
          this.scrollToBottom();
        }
      );
    }
  };

  render() {
    const { search, showEmojiPicker, chatMessages, showUserList, selectedUser } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-top-container">
          <div className="intro-container">
            <p className="intro-heading">Introductions</p>
            <p className="intro-txt">This channel is for Company Wide Chatter</p>
          </div>
          <div className="users-container">
            <p className="users-count">3/100</p>
            <PiUsersLight className="users-img" />
          </div>
        </div>
        <hr className="line" />
        <div className="message-container">
          <div ref={this.chatContainerRef} className="chat-mid-container">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-item">
                <div className="chat-message-container">
                  <div className='logo-container'>
                  <p className="name-logo" style={{ backgroundColor: message.color }}>
                    {message.username[0]}
                  </p>
                  </div>
                  <div className="chat-message">
                    <div className="name-time">
                      <p className="chat-message-username">{message.username}</p>
                      <p className="chat-message-timestamp">{message.timestamp}</p>
                    </div>
                    <div className="message-like">
                      <p className="chat-message-text">{message.text}</p>
                      <div className="like-container">
                        <button className="like-button" onClick={() => this.handleLikeClick(index)}>
                          <AiOutlineLike className="like-img" />
                        </button>
                        <p className="like-count">{message.likes}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="chat-bottom-container">
        <div className="user-list-toggle" onClick={this.toggleUserList}>
              <PiUsersLight className="user-list-toggle-icon" />
            </div>
            {showUserList && (
              <UserList user_list={user_list} onSelectUser={this.selectUser} />
            )}
          <input
            type="text"
            placeholder="Type Message"
            className="search-input"
            onChange={this.onSearch}
            onKeyDown={this.handleKeyPress}
            value={search}
          />
                    <div className="chat-controls">
            <div className="emoji-picker-container">
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={this.handleEmojiSelect}
                  pickerStyle={{ position: 'absolute', top: '100%', right: 0 }}
                />
              )}
            </div>
            <div className="emoji-toggle" onClick={this.toggleEmojiPicker}>
              <BsEmojiWink className="emoji-toggle-icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatEnvironment;
