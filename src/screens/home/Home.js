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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
    card: {
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
                    <GridList className={classes.gridList} cellHeight={'auto'}>
                        {this.state.filteredData.map(item => (
                            <GridListTile key={item.id}>
                                <HomeItem
                                    classes={classes}
                                    item={item}/>
                            </GridListTile>))}
                    </GridList>
                </div>
            </div>
        );
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

        let createdTime = new Date(0);
        createdTime.setUTCSeconds(item.created_time);
        let yyyy = createdTime.getFullYear();
        let mm = createdTime.getMonth() + 1;
        let dd = createdTime.getDate();

        let HH = createdTime.getHours();
        let MM = createdTime.getMinutes();
        let ss = createdTime.getSeconds();

        let time = dd+"/"+mm+"/"+yyyy+" "+HH+":"+MM+":"+ss;
        let hashTags = item.tags.map(hash =>{
        return "#"+hash;
        });
            return(
                <div className="body-main-container">
                    <Card classes={classes.card}>
                        <CardHeader avatar={
                            <Avatar alt="User Profile Pic" src={item.props.userProfileUrl} className={classes.avatar}/>}
                            title={item.props.username}
                            subheader={time}/>
                            <CardContent>
                                <CardMedia
                                    className={classes.media}
                                    image={item.images.standard_resolution.url}
                                    title={item.caption.text}/>
                                    <div  className={classes.hr}>
                                        <Typography component="p">
                                            {item.caption.text}
                                        </Typography>
                                        <Typography style={{color:'#4dabf5'}} component="p" >
                                            {hashTags.join(' ')}
                                        </Typography>
                                    </div>
                            </CardContent>
                    </Card>
                </div>
                )
            }
        }

export default withStyles(styles)(Home)