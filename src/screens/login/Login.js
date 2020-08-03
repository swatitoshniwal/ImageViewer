import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = {
    card:{
        padding: '15px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '325px',
        transform: 'translateX(-50%)',
    },
    title: {
        fontSize: 20
    },
};

class Login extends Component{

    constructor() {
        super();
        this.state = {
            username:"",
            usernameRequired:"dispNone",
            password:"",
            passwordRequired:"dispNone",
            incorrectUsernamePassword: "dispNone",
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true
        };
    }

    //Accept input user name for the session
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    //Accept password for the session
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    //Verify username and password to assign access-token and other hard-coded values for the session
    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username === "" || this.state.password === "") { return }

        if (this.state.username === "swati" && this.state.password === "gandhi") {
            sessionStorage.setItem('username','swati.toshniwal2');//Generic username, not specifically related to IG
            sessionStorage.setItem('user-id', 'instagram-user-id');//Add Instagram user-id here
            sessionStorage.setItem('access-token', 'add-access-token-here');//access token generated using IG API
            sessionStorage.setItem('profile-picture', "https://cmsimages.tribuneindia.com/gallary_content/2020/7/2020_7$largeimg_1146665666.jpg");//Hard-coded url for profile picture
            sessionStorage.setItem('user-fullname', 'Shakuntala Devi');//Generic full username, hard-coded 
            this.setState({ loggedIn: true });
            this.navigateToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }

    //Returns to Home page
    navigateToHome = () =>{
        this.props.history.push('/home');
    }

    render(){
        return(
            <div className= "main-container">
                <Header screen={"Login"}/>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />
                        <FormControl required style={{width: '100%'}}>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
                            <FormHelperText className={this.state.usernameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <FormControl required style={{width:'100%'}}>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password" onChange={this.inputPasswordChangeHandler}/>
                            <FormHelperText className={this.state.passwordRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/><br/>
                        <div className={this.state.incorrectUsernamePassword}>
                            <span className="red"> Incorrect username and/or password </span>
                        </div><br />
                        <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default Login;