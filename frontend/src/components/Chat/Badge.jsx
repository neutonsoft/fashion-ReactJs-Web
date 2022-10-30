import React, { Component } from "react";
import "./Badge.css";

class Badge extends Component {
  state = {};

  async componentDidMount() {
    await this.setState({ bottom: -64 });
    while (this.state.bottom < 15) {
      await new Promise(resolve => setTimeout(resolve, 1));
      await this.setState(state => ({ bottom: state.bottom + 1 }));
    }
  }

  render() {
    if (this.state.bottom === undefined) {
      return null;
    }
    return (
      <div
        className="chat-badge"
        style={{ bottom: `${this.state.bottom}px` }}
        onClick={this.props.onClick}
      >
        <svg className="chat-envelope">
          <polyline className="chat-envelope-top" points="5,5 17,14 29,5" />
        </svg>
      </div>
    );
  }
}

export default Badge;
