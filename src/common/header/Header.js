import React, {Component} from 'react';
import './Header.css';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    appheader:{
        backgroundColor:'#263238'
    },

    search:{
        borderRadius: '4px',
        backgroundColor: '#c0c0c0',
        marginLeft: 0,
        width: '300px',
    },

    grow:{
        flexGrow: 1
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
                <AppBar className={classes.appheader}> 
                    <Toolbar>
                        <div className={classes.grow}/>
                        {(screen === "Login" || screen === "Home") && <span className="header-logo">Image Viewer</span>} 
                        {(screen === "Home") &&
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase onChange={(e)=>{this.props.searchHandler(e.target.value)}} placeholder="Search…" classes={{
                                input: classes.inputInput
                                }}/>
                            </div>
                        }
                    </Toolbar>
                </AppBar>    
            </div>
        )
    }
}

export default withStyles(styles)(Header)