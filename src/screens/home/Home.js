import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {withStyles} from '@material-ui/core/styles';
import {constant} from '../../common/utils'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
    prop: {
        maxWidth: 1100,
    },
    gridList:{
        width: 1100,
        height: 'auto',
        overflowY: 'auto',
    },
    grid:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:90
    }
});

class Home extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem('access-token')==null){
            props.history.replace('/');
        }
        this.state = {
            data: [],
            filteredData:[],
            userData:{},
        }
    }

    onSearchEntered= (value) =>{
        console.log('search value', value);
        let filteredData = this.state.data;
        filteredData = filteredData.filter((data) =>{
          let string = data.caption.text.toLowerCase();
          let subString = value.toLowerCase();
          return string.includes(subString);
        })
        this.setState({
          filteredData
        })
      }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }
    
    navigateToAccount = () =>{
        this.props.history.push('/profile');
      }

    render(){
        const{classes} = this.props;
        return(
            <div>
                <Header
                    userProfileUrl={this.state.userData.profile_picture}
                    screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}/>
                <div className={classes.grid}>
                    <GridList className={classes.gridList}>
                        {this.state.filteredData.map(item => (
                            <GridListTile key={item.id}>
                                <HomeItem
                                    classes={classes}
                                    item={item}/>
                            </GridListTile>))}
                    </GridList>
                </div>
            </div>

        )
    }
}

class HomeItem extends Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        const{classes, item} = this.props;
            return(
                <div className="body-main-container">
                    <Card classes={classes.prop}>
                        <CardHeader avatar={
                            <Avatar alt="User Profile Pic" src={item.props.userProfileUrl} className={classes.avatar}/>}
                        title={item.props.username}
                        subheader={setTimeout}/>
                    </Card>
                </div>
                )
            }
        }

export default withStyles(styles)(Home)