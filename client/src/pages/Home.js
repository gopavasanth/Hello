import React from "react"
import NavBar from "../components/NavBar";
import LandingPage from "../components/home/LandingPage";
class Home extends React.Component{
    render() {
        return(
            <div className="home">
                <NavBar/>
                <LandingPage/>
            </div>
        )
    }
}
export default Home;
