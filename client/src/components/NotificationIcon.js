import React, {Component} from "react";
import "./NotificationIcon.css";

class NotificationIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0
         }
    }

    componentDidUpdate() {
        if (this.state.count !== this.props.count) {
            this.setState({count: this.props.count})
            console.log("COUNT")
            console.log(this.state.count)
        }
    }

    componentDidMount() {
        if (this.props.count != null ) {
            this.setState({count: this.props.count})
            console.log("COUNT")
            console.log(this.props.count)
        }
    }
    render() { 
        if (this.state.count == null || this.state.count == 0) {
            return (<div></div>)
        }

        return (
            <div id="notification-icon">
                <div id="badge">
                    {this.state.count}
                </div>
            </div>
         );
    }
}
 
export default NotificationIcon;