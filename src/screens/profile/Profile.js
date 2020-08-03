import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
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
import { constants } from '../../common/utils';

const styles = {
    paper: {
        position: 'relative',
        width: "180px",
        backgroundColor: "#fff",
        top: "30%",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "20px"
    },
    media: {
        height: '200px',
        paddingTop: '56.25%', // 16:9
    },
    imageModal: {
        backgroundColor: "#fff",
        margin: "0 auto",
        boxShadow: "2px 2px #888888",
        padding: "10px",
    }

};

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
            username: sessionStorage.getItem('username'),
            editOpen: false,
            fullNameRequired: 'dispNone',
            likeSet: new Set(),
            comments: {}
        }
    }

    getUserMedia = () => {
        let that = this;
        const fields = 'id,media_type,media_url,username,timestamp,caption';
        let url = `${constants.listMediaApi}?fields=${fields}&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            const media = jsonResponse.data;
            var arrayLength = media.length;
            for (var i = 0; i < arrayLength; i++) {
                media[i]["likes"] = Math.floor(Math.random() * 20);
                media[i]["hashtags"] = media[i]["caption"].match(/#[a-zA-Z]+\b/gi);
                media[i]["caption"] = media[i]["caption"].replace(/#[a-zA-Z0-9]+\b/gi, "");
            }
            that.setState({
                media: media,
                number_posts: arrayLength
            });
            console.log(that.state.media);
        }).catch((error) => {
            console.log('error user data', error);
        });
    }

    componentDidMount() {
        this.getUserMedia();
        // this.getUserData();
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    navigateToAccount = () =>{
        this.props.history.push('/profile');
    }

    handleOpenImageModal = (event) => {
        var result = this.state.media.find(item => {
            return item.id === event.target.id
        })
        console.log(result);
        this.setState({ imageModalOpen: true, currentItem: result });
    }

    handleCloseImageModal = () => {
        this.setState({ imageModalOpen: false });
    }

    inputFullNameChangeHandler = (e) => {
        this.setState({
            newFullName: e.target.value
        })
    }

    updateClickHandler = () => {
        if (this.state.newFullName === '') {
            this.setState({ fullNameRequired: 'dispBlock' })
        } else {
            this.setState({ fullNameRequired: 'dispNone' })
        }

        if (this.state.newFullName === "") { return }

        this.setState({
            full_name: this.state.newFullName
        })

        this.handleCloseEditModal()
    }

    handleOpenEditModal = () => {
        this.setState({ editOpen: true });
    }

    handleCloseEditModal = () => {
        this.setState({ editOpen: false });
    }

    likeClickHandler = (id) => {
        // console.log('like id:', id);
        var foundItem;
        for (var i = 0; i < this.state.media.length; i++) {
            if (this.state.media[i].id === id) {
                foundItem = this.state.media[i];
                break;
            }
        }

        if (typeof foundItem !== undefined) {
            if (!this.state.likeSet.has(id)) {
                foundItem.likes++;
                this.setState(({ likeSet }) => ({
                    likeSet: new Set(likeSet.add(id))
                }))
            } else {
                foundItem.likes--;
                this.setState(({ likeSet }) => {
                    const newLike = new Set(likeSet);
                    newLike.delete(id);
                    return {
                        likeSet: newLike
                    };
                });
            }
        }
    }

    onAddCommentClicked = (id) => {
        console.log('id', id);
        if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
            return;
        }

        let commentList = this.state.comments.hasOwnProperty(id) ?
            this.state.comments[id].concat(this.state.currentComment) : [].concat(this.state.currentComment);

        this.setState({
            comments: {
                ...this.state.comments,
                [id]: commentList
            },
            currentComment: ''
        })
    }

    commentChangeHandler = (e) => {
        this.setState({
            currentComment: e.target.value
        });
    }

    render() {
    //    const { classes, item, comments } = this.props;
        console.log(this.state.full_name);

        return (
            <div>
                <Header
                    screen={"Profile"}
                    userProfileUrl={this.state.profile_picture}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}
                />
                <div className="information">
                    <Avatar
                        alt="User Image"
                        src={this.state.profile_picture}
                        style={{ width: "70px", height: "70px" }}
                    />
                    <span style={{ marginLeft: "20px" }}>
                        <div style={{ width: "600px", fontSize: "big" }}> {this.state.username} <br />
                            <div style={{ float: "left", width: "200px", fontSize: "x-small" }}> Posts: {this.state.number_posts} </div>
                            <div style={{ float: "left", width: "200px", fontSize: "x-small" }}> Follows: {this.state.follows} </div>
                            <div style={{ float: "left", width: "200px", fontSize: "x-small" }}> Followed By: {this.state.followed_by}</div> <br />
                        </div>
                        <div style={{ fontSize: "small" }}>
                            {this.state.full_name}&nbsp;&nbsp;&nbsp;&nbsp;
                            <Fab color="secondary" aria-label="edit" size="small" className="edit-button" onClick={this.handleOpenEditModal}>
                                <EditIcon />
                            </Fab>
                        </div>
                        <Modal
                            aria-labelledby="edit-modal"
                            aria-describedby="modal to edit user full name"
                            open={this.state.editOpen}
                            onClose={this.handleCloseEditModal}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <div style={styles.paper}>
                                <Typography variant="h5" id="modal-title">
                                    Edit
                                </Typography><br />
                                <FormControl required>
                                    <InputLabel htmlFor="fullname">Full Name</InputLabel>
                                    <Input id="fullname" onChange={this.inputFullNameChangeHandler} />
                                    <FormHelperText className={this.state.fullNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br /><br />
                                <Button variant="contained" color="primary" onClick={this.updateClickHandler}>
                                    UPDATE
                                </Button>
                            </div>
                        </Modal>
                    </span>
                </div>
                {this.state.media != null &&
                    <GridList cellHeight={'auto'} cols={3} style={{ padding: "40px" }}>
                        {this.state.media.map(item => (
                            <GridListTile key={item.id}>
                                <CardMedia
                                    id={item.id}
                                    style={styles.media}
                                    image={item.media_url}
                                    title={item.caption}
                                    onClick={this.handleOpenImageModal}
                                />
                            </GridListTile>
                        ))}
                    </GridList>}

                {this.state.currentItem != null &&
                    <Modal
                        aria-labelledby="image-modal"
                        aria-describedby="modal to show image details"
                        open={this.state.imageModalOpen}
                        onClose={this.handleCloseImageModal}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "#fff", width: '70%', height: '70%' }}>
                            <div style={{ width: '50%', padding: 10 }}>
                                <img style={{ height: '100%', width: '100%' }}
                                    src={this.state.currentItem.media_url}
                                    alt={this.state.currentItem.caption} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', padding: 10 }}>
                                <div style={{ borderBottom: '2px solid #f2f2f2', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Avatar
                                        alt="User Image"
                                        src={this.state.profile_picture}
                                        style={{ width: "50px", height: "50px", margin: '10px' }} />
                                    <Typography component="p">
                                        {this.state.username}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <Typography component="p">
                                            {this.state.currentItem.caption}
                                        </Typography>
                                        <Typography style={{ color: '#4dabf5' }} component="p" >
                                            {this.state.currentItem.hashtags.join(' ')}
                                        </Typography>
                                        {this.state.comments.hasOwnProperty(this.state.currentItem.id) && this.state.comments[this.state.currentItem.id].map((comment, index) => {
                                            return (
                                                <div key={index} className="row">
                                                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                                                        {sessionStorage.getItem('username')}:&nbsp;
                                                    </Typography>
                                                    <Typography component="p">
                                                        {comment}
                                                    </Typography>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <div className="row">
                                            <IconButton aria-label="Add to favorites" onClick={this.likeClickHandler.bind(this, this.state.currentItem.id)}>
                                                {this.state.likeSet.has(this.state.currentItem.id) && <FavoriteIconFill style={{ color: '#F44336' }} />}
                                                {!this.state.likeSet.has(this.state.currentItem.id) && <FavoriteIconBorder />}
                                            </IconButton>
                                            <Typography component="p">
                                                {this.state.currentItem.likes} Likes
                                            </Typography>
                                        </div>
                                        <div className="row">
                                            <FormControl style={{ flexGrow: 1 }}>
                                                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                                                <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler} />
                                            </FormControl>
                                            <FormControl>
                                                <Button onClick={this.onAddCommentClicked.bind(this, this.state.currentItem.id)}
                                                    variant="contained" color="primary">
                                                    ADD
                                                </Button>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>}
            </div>
        )
    }
}

export default withStyles(styles)(Profile)