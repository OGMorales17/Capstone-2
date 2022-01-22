import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { NavLink } from "react-router-dom";


function MainListItems() {

    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText >
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/" >Home</NavLink>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/news" >News</NavLink>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/market" >Market</NavLink>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/education" >Education</NavLink>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText>
                    <NavLink style={{ color: 'inherit', textDecoration: 'inherit' }} to="/tools" >Tools</NavLink>
                </ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
    );
}

export default MainListItems;