import React from "react";
import {useState} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import Cart from "../../assets/library/Cart button";
import "./header.css";

const Header = ({ items, data, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const totalQuantity = items.reduce(
    (totalQuantity, cartItem) => totalQuantity + cartItem.quantity,
    0
  );

  const clearToken = () =>{
    window.localStorage.clear();
    window.localStorage.setItem("token","EXPIRED");
  }
  const goHome = () => {
    window.location.href = "/home";
  };

  const logout = () =>{
    const timeout = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    const logoutInfo = {
      name: user,
      status: "EXPIRED",
      timeout: timeout
    }

    axios.post("http://localhost:9999/logs",logoutInfo)
    .then((res)=>{
      if(res.data==="DONE"){
        clearToken();
        goHome();
      }
    })
  }

  return (
    <Navbar className="nbs1" dark expand="md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <NavbarBrand href="/home" className="text-dark ts ghbs">
        {" "}
        CAKIES{" "}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="text-dark">
              Products
            </DropdownToggle>
            <DropdownMenu right>
              {data.map((item) => {
                return (
                  <DropdownItem>
                    <NavLink className="text-dark" href={item.path}>
                      {item.menuname}
                    </NavLink>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="text-dark ">
              About
            </DropdownToggle>
            <DropdownMenu>
              <NavbarText className="text-dark">
                {" "}
                **** Designed by **** Đỗ Trí Dũng 20209012{" "}
              </NavbarText>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink className="text-dark" href="/store">
              Store
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <FormGroup>
        <Input
          className="form-control mr-sm-2"
          type="Search"
          placeholder="..."
          aria-label="Search"
        />
      </FormGroup>
      <Button
        color="primary"
        className="btn btn-outline-success my-2 my-sm-0 text-dark"
        type="submit"
      >
        {" "}
        Search{" "}
      </Button>
      <Link to="/cart" className="bts1">
        <Cart />
        <span className="cls">{totalQuantity === 0 ? "" : totalQuantity}</span>
      </Link>
      {user === "" && (
        <Button className="lgbs" href="/login">
          <input
            type="image"
            src="/user-svgrepo-com.svg"
            height="20"
            width="20"
            alt="login"
          />
        </Button>
      )}
      {user !== "" && (
        <div className="uias">
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-dark">
                  {user}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </div>
      )}
    </Navbar>
  );
};

export default Header;
