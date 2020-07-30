import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
// import {constants} from '../../common/utils'

const styles = theme => ({
    card: {
        maxWidth: 300,
        margin: "auto",

    },
    media: {
        paddingTop: "70%"
    },
    avatar: {
        margin: 10,
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
        const{classes, item} = this.props;
        return(
            <div>
                <Header
                    userProfileUrl={this.state.userData.profile_picture}
                    screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}/>
                <div className={classes.grid}>
                    <GridList className={classes.gridList} cellHeight={'auto'}>
                        <GridListTile>
                            <div className="body-main-container">
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt="User Profile Pic" src={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"} className={classes.avatar}/>
                                            }/>
                                    <CardMedia
                                        className={classes.media}
                                        image={
                                        "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                                        }
                                    />
                                </Card>
                            </div>
                        </GridListTile>
                    </GridList>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home)