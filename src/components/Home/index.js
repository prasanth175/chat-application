import { Component } from "react";
import './index.css'
import Dashboard from "../Dashboard";
import ChatEnvironment from "../ChatEnvironment";

class Home extends Component{
    render(){
        return(
            <div className="home-container">
                <Dashboard />
                <ChatEnvironment />
            </div>
        )
    }
}

export default Home