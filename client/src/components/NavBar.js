import React from "react";
import { Menu , Image } from "semantic-ui-react";
import Logo from "../images/logo.jpg"

class NavBar extends React.Component{
    render() {
        return(
            <div className="navbar">
                <Menu fixed="top" borderless>
                    <Menu.Item>
                        <Image size="mini" src={Logo}/>
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <a href="/login">Sign In</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="/signup">Sign Up</a>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}
export default NavBar
