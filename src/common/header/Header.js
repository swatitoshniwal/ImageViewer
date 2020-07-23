import React, {Component} from 'react';
import './Header.css';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box'

const styles = theme => ({
    appheader:{
        backgroundColor:'#263238'
    },

    search:{
        position: 'relative',
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',
        marginLeft: '0',
        width: '300px',
    },

    searchIcon: {
        width: theme.spacing(4),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'#000000'
    },

    inputInput: {
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(4),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
           '&:focus': {
            width: 200
            }
        }
      },

    avatar: {
        width: 50,
        height: 50,
    },
})

class Header extends Component{
    constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        };
    }

    handleClick = (e) =>{
        this.setState({
          anchorEl: e.currentTarget
        })
      }

    handleAccount = ()=>{
        this.props.handleAccount();
        this.handleClose();
    }
    
    handleLogout = ()=>{
        this.props.handleLogout();
        this.handleClose();
    }
    
    handleClose = () =>{
        this.setState({ anchorEl: null });
    }

    render(){
        const {classes,screen} = this.props;
        return(
            <div> 
                <AppBar className={classes.appheader}> 
                    <Toolbar>
                        <Box flexGrow={1}>
                            {(screen === "Login" || screen === "Home") && <span className="header-logo">Image Viewer</span>} 
                        </Box>
                        {(screen === "Home") &&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase onChange={(e)=>{this.props.searchHandler(e.target.value)}} 
                                placeholder="Search…" 
                                classes={{input: classes.inputInput}}/>
                            </div>}
                        {(screen === "Home") &&
                            <div>
                                <IconButton onClick={this.handleClick}>
                                    <Avatar alt="Profile Pic" src={this.props.userProfileUrl} 
                                    className={classes.avatar} style={{border: "1px solid #fff"}}/>
                                </IconButton>
                                <Popover
                                    id="simple-menu"
                                    anchorEl={this.state.anchorEl}
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}>
                                    <div style={{padding:'5px'}}>
                                        {(screen === "Home") &&
                                        <div>
                                            <MenuItem onClick={this.handleAccount}>My Account</MenuItem>
                                            <div className={classes.hr}/>
                                        </div>
                                        }
                                        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                    </div>
                                </Popover>
                            </div>
                        }
                    </Toolbar>
                </AppBar>    
            </div>
        )
    }
}

export default withStyles(styles)(Header)