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
    }
};

class Login extends Component{

    constructor() {
        super();
        this.state = {
        };
    }

    render(){
        return(
            <div className= "main-container">
                <Header screen={"Login"}/>
                <Card style={styles.card}>
                    <CardContent>
                        <Typography style={styles.title}> LOGIN </Typography><br />
                        <FormControl>
                            <InputLabel htmlFor="username"> Username </InputLabel>
                            <Input id="username" type="text" username={this.state.username}/>
                        </FormControl><br/><br/>
                        <FormControl>
                            <InputLabel htmlFor="password"> Password </InputLabel>
                            <Input id="password" type="password"/>
                        </FormControl><br/><br/>
                        <Button variant="contained" color="primary">LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default Login;