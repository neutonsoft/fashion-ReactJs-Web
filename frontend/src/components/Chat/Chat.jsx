import React, { Component, Fragment } from "react";
import { getFullTime } from "./strings";
import "./Chat.css";

class Chat extends Component {
  state = {
    loading: false,
    loadingMessages: false,
    userId: null,
    inputValue: "",
    messages: [],
  };

  socket = null;

  async componentDidMount() {
    this.setState({ loading: true });
  }

  onSend = () => {
    this.setState({ inputValue: "" });
  };

  onChange = (e) => {
    e.preventDefault();
    this.setState({ inputValue: e.target.value });
  };

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      this.onSend();
    }
  };

  renderSpinner = (...text) => (
    <div
      className="chat-content chat-no-messages-content"
      style={{ textAlign: "center" }}
    >
      <div className="chat-loader" />
      <div>
        {text.map((el, index) => (
          <Fragment key={index}>
            {el}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  );

  renderNoContent = () => (
    <div className="chat-content chat-no-messages-content">
      <div className="chat-no-messages">
        Write your request and we will answer as soon as possible
      </div>
    </div>
  );

  renderMessages = () => (
    <div className="chat-content">
      {this.state.messages.length === 0 && (
        <div className="chat-no-messages">
          Write your request and we will answer as soon as possible
        </div>
      )}
      {this.state.messages.map(({ content, time, user_id }, index) => (
        <div
          key={index}
          className={`chat-message ${
            this.state.userId === user_id
              ? "chat-my-message"
              : "chat-consultant-message"
          }`}
        >
          <p>{content}</p>
          <p className="chat-message-time">{getFullTime(time)}</p>
        </div>
      ))}
      <br />
    </div>
  );

  render() {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <div />
          <div className="chat-title">Online chat</div>
          <div className="chat-close" onClick={this.props.onClose}>
            <svg>
              <line className="chat-close-line" x1="0" y1="0" x2="10" y2="10" />
              <line className="chat-close-line" x1="0" y1="10" x2="10" y2="0" />
            </svg>
          </div>
        </div>
        {(() => {
          if (this.state.error) {
            return this.renderSpinner("Error", this.state.error, "Retrying");
          }
          if (this.state.loading) {
            return this.renderSpinner();
          }
          if (this.state.loadingMessages) {
            return this.renderSpinner();
          }

          if (this.state.messages.length === 0) {
            return this.renderNoContent();
          }
          return this.renderMessages();
        })()}
        <div className="chat-input">
          <input
            className="chat-input-field"
            value={this.state.inputValue}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
          <svg className="chat-input-send" onClick={this.onSend}>
            <polyline
              className="chat-input-send-line"
              points="0,2 25,12.5 0,23 5,12.5 0,2"
            />
          </svg>
        </div>
      </div>
    );
  }
}

export default Chat;
