import React from 'react'
import styles from './Header.module.scss'
import { Navbar, Nav } from 'react-bootstrap'
import DarkMode from "../Buttons/DarkMode";
import HelpPopUp from "../Buttons/HelpPopUp";
import GitHubLink from "../Buttons/GitHubLink";

export default function Header({ menuItems }) {
    return (
        <Navbar bg="white" expand="lg" sticky="top" className={styles.navbar}>
            <Navbar.Brand href="/"><b>Sportanalyse-</b><span className="text-primary"><i>Anwendung</i></span> 1.0.0</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <DarkMode></DarkMode>
                    <HelpPopUp></HelpPopUp>
                    <GitHubLink></GitHubLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
