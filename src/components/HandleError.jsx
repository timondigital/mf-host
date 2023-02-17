import React from "react";

export class HandleError extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {}
  render() {
    if (this.state.hasError) {
      return (
        <h6 style={{ width: "min-content" }}>
          {" "}
          Upss!! algo fallo en este Micro Frontend.
        </h6>
      );
    }
    return this.props.children;
  }
}
