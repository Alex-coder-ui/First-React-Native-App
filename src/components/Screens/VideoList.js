import React, {Component} from 'react'
import {ScrollView, StyleSheet, Text, TouchableHighlight} from 'react-native'
import {screenWidth} from '../constants/constants'
import {Actions} from 'react-native-router-flux'
import {NavBar} from '../uikit'


const url = 'https://raw.githubusercontent.com/Alex-coder-ui/First-react-app/master/public/Videos.json'

class VideoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: [],
            title: 'Playlist',
        };
    }

    componentDidMount = async () => {
        try {
            const response = await fetch(url);
            const videoData = await response.json();
            this.setState({videoData});
            console.log(videoData);
        } catch (error) {
            throw error
        }

    }

    onPress = (item) => {
        Actions.VideoPlayer({item: item});
        console.log(item)
    };


    render() {
        const {videoData} = this.state
        return (
            <ScrollView>
                <NavBar title={this.state.title}/>
                {
                    videoData.map((item) => {
                        return (
                            <TouchableHighlight
                                key={item.id}
                                videoData={item}
                                onPress={() => this.onPress(item)}
                                underlayColor='#fff'
                            >
                                <Text style={styles.item}>{item.name}</Text>
                            </TouchableHighlight>
                        )
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        width: screenWidth / 2.8,
    },
    item: {
        fontSize: 20,
        margin: 5,
    }
});

export {VideoList};
