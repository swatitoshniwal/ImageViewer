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
import CardContent from '@material-ui/core/CardContent';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';
import {constants} from '../../common/utils';

const styles = theme => ({
    card: {
        maxWidth: 500,
        margin: "auto",
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
    },
    hr:{
        marginTop:'10px',
        borderTop:'2px solid #f2f2f2'
    },
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

    getUserMediaData = () => {
        let that = this;
        let url = `${constants.listMediaApi}?fields=id,caption&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url,{
            method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
            userData:jsonResponse.data
            });
            console.log(that.state.userData);
            Object.keys(that.state.userData).forEach(function(key) {
                console.log(that.state.userData[key].caption);
              });
        }).catch((error) => {
          console.log('error user data',error);
        });
    }
    
    getMediaData = (mediaID) => {
        let that = this;
        let url = `${constants.mediaApi}/${mediaID}?fields=id,media_type,media_url,username,timestamp,caption&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url,{
            method:'GET',
        }).then((response) =>{
            return response.json();
        }).then((jsonResponse) =>{
            that.setState({
            media_url: jsonResponse.media_url,
            username: jsonResponse.username,
            timestamp: jsonResponse.timestamp,
            caption: jsonResponse.caption
            });
            //console.log(that.state.caption);
        }).catch((error) => {
          console.log('error user data',error);
        });
    }

    componentDidMount(){
        this.getUserMediaData();
        this.getMediaData("17848947320182404");
        // console.log(this.data.username);
    }

    render(){
        const{classes, item} = this.props;
        const profile_picture = "https://cmsimages.tribuneindia.com/gallary_content/2020/7/2020_7$largeimg_1146665666.jpg";

        return(
            <div>
                <Header
                    userProfileUrl={profile_picture}
                    screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}/>
                <div className={classes.grid}>
                    <GridList className={classes.gridList} cellHeight={'auto'}>
                        <div className="body-main-container">
                            <Card className={classes.card}>
                                <CardHeader
                                    avatar={
                                        <Avatar src={profile_picture} className={classes.avatar}/>
                                    }
                                    title={this.state.username}
                                    subheader={ <Moment format="MM/DD/YYYY HH:mm:ss">
                                            {this.state.timestamp}
                                    </Moment>}
                                />    
                                <CardContent>
                                    <CardMedia component="img"
                                        image={this.state.media_url}
                                        title={this.state.caption}
                                    />
                                    <div  className={classes.hr}>
                                        <Typography component="p">
                                            {this.state.caption}
                                        </Typography>
                                    </div>
                                </CardContent> 
                            </Card>
                        </div>
                    </GridList>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home)