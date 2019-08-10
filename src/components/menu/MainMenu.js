import React from 'react';
import { NavLink } from 'react-router-dom'
import { PAGES } from "../../consters/pagesconster";
import '../../stylesheets/menus.scss'


const selectedStyle = {
    backgroundColor: "white",
    color: "slategray"
}

export const MainMenu = () => 
    <nav className="main-menu">
        <NavLink to="/" >
            [首頁]
        </NavLink>
        {// Use conster of Pages to map NavLink
            PAGES.map((page) => {
            return <NavLink to ={page.router} activeStyle={selectedStyle}>{`[${page.zh_name}]`}</NavLink>
        })}
    </nav>

export const TopMenu = ({ match , children }) =>
<ul className="TopMenu">
    {/* NO make */ }
</ul>
