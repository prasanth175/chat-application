import { Component } from "react";
import { CiCirclePlus } from "react-icons/ci";
import './index.css'

class Dashboard extends Component{
    render(){
        return(
            <div className="dashboard">
                <div className='dashboard-profile'>
                    <p className="profile-logo">PK</p>
                    <div className="profile-container">
                        <p className="name">Prasanth Kumar</p>
                        <p className="profession">FullStack Developer</p>
                    </div>
                </div>
                <div className="conversations">
                    <div className="conversations-container">
                        <p className="conversations-heading">Conversations</p>
                        <CiCirclePlus className="plus-img" />
                    </div>
                    <div className="conversations-list">
                        <div className="conversations-item">
                            <p className="hash">#</p>
                            <p className="group-name">Poland Office</p>
                        </div>
                        <div className="conversations-item">
                            <p className="hash">#</p>
                            <p className="group-name">Introductions</p>
                        </div>
                        <div className="conversations-item">
                            <p className="hash">#</p>
                            <p className="group-name">India Office</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard