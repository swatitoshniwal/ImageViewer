import React, {Component} from 'react';
import './Header.css';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';

const styles = theme => ({
    appheader:{
        backgroundColor:'#263238'
    },
})

class Header extends Component{
    constructor(props){
    super(props);
    this.state = {
        anchorEl: null,
        };
    }

    render(){
        const {classes} = this.props;
        return(
            <div> 
                <Toolbar>
                    <AppBar className={classes.appheader}> 
                        <header className="header-logo">Image Viewer</header> 
                    </AppBar>
                </Toolbar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)