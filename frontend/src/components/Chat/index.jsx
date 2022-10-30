import React, { Component } from "react";
import Badge from "./Badge";
import Chat from "./Chat";

class App extends Component {
  state = { opened: false, value: "" };

  onOpen = () => this.setState({ opened: true });
  onClose = () => this.setState({ opened: false });

  render() {
    if (!this.state.opened) {
      return <Badge key="1" onClick={this.onOpen} />;
    }
    return <Chat onClose={this.onClose} />;
  }
}

export default App;
