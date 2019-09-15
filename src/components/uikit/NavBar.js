import {Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import {screenWidth} from '../constants/constants'


class NavBar extends Component {
    constructor(props) {
        super(props);
        // this.name=this.props.name
        this.state = {
            title: '',
        };
    }

    render() {
        return (
            <View style={styles.backgroundStyle}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18
                    }}>{this.props.title}</Text>
                    <Image
                        source={require('../Images/player.png')}
                        style={styles.movieStyle}/>

                </View>
            </View>
        );
    }
}


const styles = {
    backgroundStyle: {
        backgroundColor: 'white'
    },
    movieStyle: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        left: screenWidth / 1.32,
        justifyContent: 'flex-end',
        position: 'relative'

    },
};


export {NavBar};
