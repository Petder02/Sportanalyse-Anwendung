import React from 'react'
import styles from './Header.module.scss'
import { Navbar, Nav } from 'react-bootstrap'
import DarkMode from "../HeaderButtons/DarkMode";
import HelpPopUp from "../HeaderButtons/HelpPopUp";
import GitHubLink from "../HeaderButtons/GitHubLink";
import StatsHelp from "../HeaderButtons/StatsHelp";
import BackButton from "../HeaderButtons/BackButton";

export default function Header({ menuItems }) {

    const url = window.location.href;
    let splitURL = url.split("/");
    let sportName = splitURL[splitURL.length - 1];
    sportName = sportName.replace("#", "");
    sportName = sportName.replace("-", " ");
    sportName = sportName.charAt(0).toUpperCase() + sportName.slice(1);

    // URLs
    const footballHelp = "https://www.espn.com/nfl/news/story?id=2128923";
    const basketballHelp = "https://www.rookieroad.com/basketball/list-basketball-statistics/";
    const baseballHelp = "https://www.rookieroad.com/baseball/list-baseball-statistics/";

    return (
        <Navbar bg="white" expand="lg" sticky="top" className={styles.navbar}>
            <Navbar.Brand href="/"><b>Sportanalyse-</b><span className="text-primary"><i>Anwendung</i></span> 1.0.0 |  <span className="text-primary">  {sportName}</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <BackButton />
                    <DarkMode />
                    <StatsHelp
                        url={sportName.includes("football") ? footballHelp : sportName.includes("Basketball") ? basketballHelp : baseballHelp}
                    />
                    <HelpPopUp />
                    <GitHubLink />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
