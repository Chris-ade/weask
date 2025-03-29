import React from "react";

class CustomDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }

  customDate = (value) => {
    const now = new Date();
    const dateValue = new Date(value);

    const diff = now.getTime() - dateValue.getTime();
    return this.calculateDifference(diff);
  };

  calculateDifference = (diff) => {
    const secondDiff = Math.floor(diff / 1000);
    const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (dayDiff < 0) {
      return "";
    }

    if (dayDiff === 0) {
      if (secondDiff < 60) {
        return `${secondDiff}s`;
      }
      if (secondDiff < 3600) {
        return `${Math.floor(secondDiff / 60)}m`;
      }
      if (secondDiff < 7200) {
        return "1h";
      }
      if (secondDiff < 86400) {
        return `${Math.floor(secondDiff / 3600)}h`;
      }
    }
    if (dayDiff < 7) {
      return `${dayDiff}d`;
    }
    if (dayDiff < 31) {
      return `${Math.floor(dayDiff / 7)}w`;
    }
    if (dayDiff < 365) {
      return `${Math.floor(dayDiff / 30)}mo`;
    }
    return `${Math.floor(dayDiff / 365)}y`;
  };

  render() {
    const { value } = this.props;
    return <span>{this.customDate(value)}</span>;
  }
}

export default CustomDate;
