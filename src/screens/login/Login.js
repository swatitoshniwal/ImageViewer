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

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value })
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    loginClickHandler = () => {
        this.setState({ incorrectUsernamePassword: "dispNone" });
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });

        if (this.state.username === "" || this.state.password === "") { return }

        if (this.state.username === "swati" && this.state.password === "gandhi") {
            sessionStorage.setItem('username','admin');
            sessionStorage.setItem('user-id', '17841404489820598')
            sessionStorage.setItem('access-token', 'IGQVJXbzBnMzRpZA01mVHdqTy0wa0I5N1RTZAUZAaLTBHRlZAqTnZAhVi0yWkFfMkRBa2R4d2ZARcW5nVm53ZAGJ3NWN4VkxodG9WUnFxWHJwRVhHZAG91RHJZAWldpcW9pMHVBMXR3ZAGVBNjVUSS1ObFVjekpDM0c0eXJDREZAZAME5V');
            this.setState({ loggedIn: true });
            this.navigateToHome();
        } else {
            this.setState({ incorrectUsernamePassword: "dispBlock" });
        }
    }

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