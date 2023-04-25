import React from 'react'
import styles from './Header.module.scss'
import { Navbar, Nav } from 'react-bootstrap'
import DarkMode from "../HeaderButtons/DarkMode";
import HelpPopUp from "../HeaderButtons/HelpPopUp";
import GitHubLink from "../HeaderButtons/GitHubLink";
import StatsHelp from "../HeaderButtons/StatsHelp";

export default function Header({ menuItems }) {
    return (
        <Navbar bg="white" expand="lg" sticky="top" className={styles.navbar}>
            <Navbar.Brand href="/"><b>Sportanalyse-</b><span className="text-primary"><i>Anwendung</i></span> 1.0.0</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <DarkMode></DarkMode>
                    <StatsHelp></StatsHelp>
                    <HelpPopUp></HelpPopUp>
                    <GitHubLink></GitHubLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
