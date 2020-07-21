import React, {Component} from 'react';
import Header from '../../common/header/Header';
import './Login.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card:{

    }
}

class Login extends Component{
    render(){
        return(
            <div className= "main-container">
                <Header screen={"Login"}/>
                <Card style={styles.card}>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
            
        )
    }
}

export default Login;