import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Moment from 'react-moment';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { constants } from '../../common/utils';
import FavoriteIconBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIconFill from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        maxWidth: 500,
        margin: "auto",
    },
    avatar: {
        margin: 10,
    },
    gridList: {
        width: 1100,
        height: 'auto',
        overflowY: 'auto',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90
    },
    hr: {
        marginTop: '10px',
        borderTop: '2px solid #f2f2f2'
    },
    formControl: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    comment: {
        display: 'flex',
        alignItems: 'center'
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        if (sessionStorage.getItem('access-token') == null) {
            props.history.replace('/');
        }
        this.state = {
            data: [],
            media: [],
            userData: {},
            likeSet: new Set(),
            isLiked: false,
            comments: {},
            profile_picture: sessionStorage.getItem('profile-picture')
        }
    }

    onSearchEntered = (value) => {
        console.log('search value', value);
        let filteredMedia = this.state.allMedia;
        console.log(this.state);
        filteredMedia = filteredMedia.filter((data) => {
            let string = data.caption.toLowerCase();
            return string.includes(value.toLowerCase());
        })
        console.log(filteredMedia);
        this.setState({
            media: filteredMedia
        })
    }

    logout = () => {
        sessionStorage.clear();
        this.props.history.replace('/');
    }

    navigateToAccount = () => {
        this.props.history.push('/profile');
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
            const media = jsonResponse.data;
            var arrayLength = media.length;
            for (var i = 0; i < arrayLength; i++) {
                media[i]["likes"] = Math.floor(Math.random() * 20);
                media[i]["hashtags"] = media[i]["caption"].match(/#[a-zA-Z]+\b/gi);
                media[i]["caption"] = media[i]["caption"].replace(/#[a-zA-Z0-9]+\b/gi, "");
            }
            that.setState({
                media: media,
                allMedia: media
            });
            // console.log(that.state.media);
        }).catch((error) => {
            console.log('error user data', error);
        });
    }

    getUserData = () => {
        let that = this;
        const fields = 'username';
        let url = `${constants.generalApi}/${sessionStorage.getItem('user-id')}?fields=${fields}&access_token=${sessionStorage.getItem('access-token')}`;
        return fetch(url, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            that.setState({
                userData: jsonResponse
            });
        }).catch((error) => {
            console.log('error user data', error);
        });
    }

    componentDidMount() {
        this.getUserMediaData();
        this.getUserData();
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

    addCommentClickHandler = (id) => {
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


    commentTypeEvent = (e) => {
        this.setState({
            currentComment: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header
                    userProfileUrl={this.state.profile_picture}
                    screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount} />
                <div className={classes.grid}>
                    <GridList className={classes.gridList} cellHeight={'auto'}>
                        {this.state.media.map(item => (
                            <GridListTile key={item.id}>
                                <HomeItem
                                    classes={classes}
                                    item={item}
                                    likeCounter={this.likeClickHandler}
                                    commentAddEvent={this.addCommentClickHandler}
                                    commentTypeEvent={this.commentTypeEvent}
                                    comments={this.state.comments} />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

class HomeItem extends Component {
    constructor() {
        super();
        this.state = {
            isLiked: false,
            comment: '',
            profile_picture: sessionStorage.getItem('profile-picture'),
        }
    }

    likeClickEvent = (id) => {
        // console.log(this.props);
        if (this.state.isLiked) {
            this.setState({
                isLiked: false
            });
        } else {
            this.setState({
                isLiked: true
            });
        }
        // console.log(id);
        this.props.likeCounter(id)
    }

    commentTypeEvent = (e) => {
        this.setState({
            comment: e.target.value,
        });
        this.props.commentTypeEvent(e);
    }

    commentAddEvent = (id) => {
        if (this.state.comment === "" || typeof this.state.comment === undefined) {
            return;
        }
        this.setState({
            comment: ""
        });
        this.props.commentAddEvent(id);
    }

    render() {
        const { classes, item, comments } = this.props;
        console.log("HomeItem");
        console.log(item);

        return (
            <div className="body-main-container">
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar alt="User Profile Pic" src={this.state.profile_picture} className={classes.avatar} />
                        }
                        title={item.username}
                        subheader={<Moment format="MM/DD/YYYY HH:mm:ss">
                            {item.timestamp}
                        </Moment>}
                    />
                    <CardContent>
                        <CardMedia
                            component="img"
                            image={item.media_url}
                            title={item.caption}
                        />
                        <div className={classes.hr}>
                            <Typography component="p">
                                {item.caption}
                            </Typography>
                            <Typography style={{ color: '#4dabf5' }} component="p" >
                                {item.hashtags.join(' ')}
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="Add to favorites" onClick={this.likeClickEvent.bind(this, item.id)}>
                            {this.state.isLiked && <FavoriteIconFill style={{ color: '#F44336' }} />}
                            {!this.state.isLiked && <FavoriteIconBorder />}
                        </IconButton>
                        <Typography component="p">
                            {item.likes} Likes
                        </Typography>
                    </CardActions>
                    <CardContent>
                        {comments.hasOwnProperty(item.id) && comments[item.id].map((comment, index) => {
                            return (
                                <div key={index} className="row">
                                    <Typography component="p" style={{ fontWeight: 'bold' }}>
                                        {sessionStorage.getItem('username')}:&nbsp;
                                    </Typography>
                                    <Typography component="p" >
                                        {comment}
                                    </Typography>
                                </div>
                            )
                        })}
                        <div className={classes.formControl}>
                            <FormControl style={{ flexGrow: 1 }}>
                                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                                <Input id="comment" value={this.state.comment} onChange={this.commentTypeEvent} />
                            </FormControl>
                            <FormControl>
                                <Button onClick={this.commentAddEvent.bind(this, item.id)}
                                    variant="contained" color="primary">
                                    ADD
                                </Button>
                            </FormControl>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(Home)