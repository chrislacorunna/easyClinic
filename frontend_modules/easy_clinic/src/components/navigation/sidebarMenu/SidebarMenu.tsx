import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import IconPeople from '@material-ui/icons/People';
import TodayIcon from '@material-ui/icons/Today';
import {Link} from "react-router-dom";
import {useStore} from "../../../reducers/RootReducer";
import {UserType} from "../../../reducers/Types";
import {LocalHospital, Payment} from "@material-ui/icons";

const SidebarMenu: React.FC = () => {
    const classes = useStyles();
    const [state, dispatch] = [useStore().state, useStore().dispatch];
    const [open, setOpen] = React.useState(false);

    function handleClick() {
        setOpen(!open)
    }

    return (
        <List component="nav" className={classes.appMenu} disablePadding>
            {(state.userType === UserType.ADMIN &&
                <ListItem button onClick={handleClick} className={classes.menuItem}>
                    <ListItemIcon className={classes.menuItemIcon}>
                        <IconPeople />
                    </ListItemIcon>
                <ListItemText className={classes.listItemText} primary="User Management" />
                {open ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem>)}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                    <ListItem button className={classes.menuItemChild}>
                        <ListItemText inset primary={<Link to={'/admins'} className={classes.listItemText}>Admins</Link>} />
                    </ListItem>
                    <ListItem button className={classes.menuItemChild}>
                        <ListItemText  inset primary={<Link to={'/employees'} className={classes.listItemText}>Employees</Link>} />
                    </ListItem>
                    <ListItem button className={classes.menuItemChild}>
                        <ListItemText inset primary={<Link to={'/users'} className={classes.listItemText}>Customers</Link>} />
                    </ListItem>
                </List>
            </Collapse>
            {(state.userType === UserType.EMPLOYEE &&
                <ListItem button className={classes.menuItem}>
                    <TodayIcon className={classes.menuItemIcon}></TodayIcon>
                    <ListItemText inset primary={<Link to={'/createschedule'}
                                                       className={classes.listItemText}>Create Schedule</Link>} />
                </ListItem>
            )}
            {(state.userType !== UserType.NO_GROUP && state.userType !== UserType.DEFAULT &&
                <ListItem button className={classes.menuItem}>
                    <TodayIcon className={classes.menuItemIcon}></TodayIcon>
                    <ListItemText inset primary={<Link to={'/schedule'}
                                                       className={classes.listItemText}>Schedule</Link>} />
                </ListItem>
            )}
            <ListItem button className={classes.menuItem}>
                <LocalHospital className={classes.menuItemIcon}></LocalHospital>
                <ListItemText inset primary={<Link to={'/visit'}
                                                   className={classes.listItemText}>Visits</Link>} />
            </ListItem>
            {(state.userType !== UserType.EMPLOYEE && <ListItem button className={classes.menuItem}>
                <Payment className={classes.menuItemIcon}></Payment>
                <ListItemText inset primary={<Link to={'/payment'}
                                                   className={classes.listItemText}>Payments</Link>} />
            </ListItem>)}
        </List>

    )
}

const drawerWidth = 240;

const useStyles = makeStyles(theme =>
    createStyles({
        appMenu: {
            width: drawerWidth,
            backgroundColor: '#484349'
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemChild: {
            width: drawerWidth,
            backgroundColor: '#585359'
        },
        menuItemIcon: {
            color: '#00b64f',
        },
        listItemText: {
            color: '#fdfdfd',
            textDecoration: 'none'
        }

    }),
)

export default SidebarMenu