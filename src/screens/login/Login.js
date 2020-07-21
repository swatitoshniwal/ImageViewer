import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const styles = {
    card:{
        padding: '15px',
        position: 'relative',
        top: '90px',
        left: '50%',
        width: '325px',
        transform: 'translateX(-50%)',
    }
}

class Login extends Component{
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
                            <InputLabel htmlFor="password"> Username </InputLabel>
                            <Input id="password" type="password"/>
                        </FormControl><br/><br/>
                    </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default Login;