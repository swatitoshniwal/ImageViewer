import React, {Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {withStyles} from '@material-ui/core/styles';
import {constant} from '../../common/utils'

const styles = theme => ({

})

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        const{classes} = this.props;
        return(
            <div>
                <Header
                    screen={"Home"}
                    searchHandler={this.onSearchEntered}
                    handleLogout={this.logout}
                    handleAccount={this.navigateToAccount}/>

            </div>
        )
    }
}

export default withStyles(styles)(Home);