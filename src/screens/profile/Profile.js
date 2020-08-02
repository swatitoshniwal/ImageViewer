import React, {Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import {constants} from '../../common/utils';

const styles={

};

const profile_picture = "https://cmsimages.tribuneindia.com/gallary_content/2020/7/2020_7$largeimg_1146665666.jpg";

class Profile extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            profile_picture: sessionStorage.getItem('profile-picture'),
            full_name: sessionStorage.getItem('user-fullname'),
            follows: 10,
            followed_by: 20,
            username: sessionStorage.getItem('username')
        }
    }

    getUserMediaData = () => {
        let that = this;
        const fields = 'id,media_type,media_url,username,timestamp,caption';
        let url = `${constants.listMediaApi}?fields=${fields}&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            const mediadata = jsonResponse.data;
            var arrayLength = mediadata.length;
            for (var i = 0; i < arrayLength; i++) {
                mediadata[i]["likes"] = Math.floor(Math.random() * 20);
            }
            that.setState({
                media: mediadata,
                number_posts: arrayLength
            });
            console.log(that.state.media);
        }).catch((error) => {
            console.log('error user data', error);
        });
    }

    componentDidMount() {
        this.getUserMediaData();
        // this.getUserData();
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    render(){
        const {classes, item, comments} = this.props;
        console.log(this.state.full_name);
    
        return(
            <div>
                <Header
                    screen={"Profile"}
                    userProfileUrl={this.state.profile_picture}
                    handleLogout={this.logout}/>
                <div className="information">
                    <Avatar
                        alt="User Image"
                        src={this.state.profile_picture}
                        style={{width: "70px", height: "70px"}}
                    />
                    <span style={{marginLeft: "20px"}}>
                        <div style={{width: "600px", fontSize: "big"}}> {this.state.username} <br />
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Posts: {this.state.number_posts} </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Follows: {this.state.follows} </div>
                            <div style={{float: "left", width: "200px", fontSize: "x-small"}}> Followed By: {this.state.followed_by}</div> <br />
                        </div>
                        <div style={{fontSize: "small"}}> 
                            {this.state.full_name}&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <Button style={{marginLeft: "20px"}} onClick={this.handleOpenEditModal}></Button> */}
                            <Fab color="secondary" aria-label="edit" size="mini" className="edit-button">
                                <EditIcon />
                            </Fab>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Profile)