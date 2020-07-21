import React, {Component} from 'react';
import './Header.css';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';

const styles = theme => ({
    appheader:{
        backgroundColor:'#263238'
    },

    search:{
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',
        marginLeft: 0,
        width: '300px',
    }
})

class Header extends Component{
    constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        };
    }

    render(){
        const {classes,screen} = this.props;
        return(
            <div> 
                <Toolbar>
                    <AppBar className={classes.appheader}> 
                    {(screen === "Login" || screen === "Home") && <span className="header-logo">Image Viewer</span>} 
                    <div className={classes.search}></div>
                    </AppBar>
                </Toolbar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)