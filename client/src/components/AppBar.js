import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import CreateIcon from "@material-ui/icons/Create";
import ExitIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ThemeProvider from "./Theme";

const DummyNav = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  box-sizing: border-box;
  background: rgba(245, 245, 245, 1);
  border-bottom: solid 0.5px rgba(0, 0, 0, 0.3);
`;

const NavComponent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const NavTitle = styled.h1`
  font-size: 1.1rem;
  letter-spacing: 0.07em;
  margin: 0;
  color: #e2281b;
  cursor: default;
`;

const Input = styled.input`
  font-size: 0.9rem;
  padding: 5px;
  min-width: 250px;
  background: rgba(245, 245, 245, 1);
  border: solid 2px #e2281b;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 5px;
  margin: 6px 0;
  box-sizing: border-box;
  transition: border-top-color ease-in-out 150ms,
    border-bottom-color ease-in-out 150ms;

  :focus {
    border-top-color: #e2281b;
    border-bottom-color: #e2281b;
    background: #fff;
  }
`;

class AppBar extends Component {
  state = {};
  render() {
    return (
      <ThemeProvider>
        <DummyNav />
        <NavWrapper>
          <NavComponent>
            <NavTitle>For Free</NavTitle>
            <Link to="/">
              <IconButton>
                <HomeIcon nativeColor="black" />
              </IconButton>
            </Link>
          </NavComponent>
          <NavComponent>
            <SearchIcon style={{ padding: "0 10px" }} />
            <Input placeholder="Search For Free" />
          </NavComponent>
          <NavComponent>
            <Link to="/post">
              <IconButton>
                <CreateIcon nativeColor="black" />
              </IconButton>
            </Link>
            <Link to="/profile">
              <IconButton>
                <Badge badgeContent={4}>
                  <AccountCircle nativeColor="black" />
                </Badge>
              </IconButton>
            </Link>
            <IconButton onClick={this.props.handleLogout}>
              <ExitIcon nativeColor="black" />
            </IconButton>
          </NavComponent>
        </NavWrapper>
      </ThemeProvider>
    );
  }
}

export default AppBar;
