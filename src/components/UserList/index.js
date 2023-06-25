import { Component } from "react";
import './index.css'

class UserList extends Component {
    handleUserClick = (user) => {
      const { onSelectUser } = this.props;
      onSelectUser(user);
    };
  
    render() {
      const { user_list } = this.props;
  
      return (
        <div className="user-list-container">
          {user_list.map((user, index) => (
            <div key={index} className="user-item" onClick={() => this.handleUserClick(user)}>
              {user}
            </div>
          ))}
        </div>
      );
    }
  }

  export default UserList