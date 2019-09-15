import React, {Component} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Video from 'react-native-video'
import {NavBar} from '../uikit'
import {screenHeight, screenWidth} from '../constants/constants'


class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            uri: '',
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        };
    }

    video: Video;

    componentDidMount = () => {
        this.setItem();
        console.log(this.props.item.id);
    }

    setItem = () => {
        this.setState({
            id: this.props.item.id,
            name: this.props.item.name,
            uri: this.props.item.uri,
        })
    };

    onLoad = (data) => {
        this.setState({duration: data.duration});
    };

    onProgress = (data) => {
        this.setState({currentTime: data.currentTime});
    };

    onEnd = () => {
        this.setState({paused: true})
        this.video.seek(0)
    };


    onAudioBecomingNoisy = () => {
        this.setState({paused: true})
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
        this.setState({paused: !event.hasAudioFocus})
    };

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };

    renderResizeModeControl(resizeMode) {

        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => {
                this.setState({resizeMode})
            }}>
                <Text style={[styles.controlOption, {fontWeight: isSelected ? 'bold' : 'normal'}]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    };


    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

        return (
            <View style={styles.mainContainer}>
                <NavBar title={this.state.name}/>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.fullScreen}
                        onPress={() => this.setState({paused: !this.state.paused})}
                    >
                        <Image source={require('../Images/icons8-play-100.png')}
                               style={this.state.paused ? {opacity: 0.9} : {opacity: 0}}/>
                        <Video
                            ref={(ref: Video) => {
                                this.video = ref
                            }}
                            source={{uri: this.state.uri}}
                            style={styles.fullScreen}
                            paused={this.state.paused}
                            volume={this.state.volume}
                            muted={this.state.muted}
                            resizeMode={this.state.resizeMode}
                            onLoad={this.onLoad}
                            onProgress={this.onProgress}
                            onEnd={this.onEnd}
                            onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                            onAudioFocusChanged={this.onAudioFocusChanged}
                            repeat={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({paused: !this.state.paused})}>
                        <Image source={require('../Images/icons8-play-100.png')}
                               style={this.state.paused ? {height: 80, width: 80} : {opacity: 0}}/>
                    </TouchableOpacity>

                    <View style={styles.controls}>
                        <View style={styles.generalControls}>

                            <View style={styles.resizeModeControl}>
                                {this.renderResizeModeControl('cover')}
                                {this.renderResizeModeControl('contain')}
                                {this.renderResizeModeControl('stretch')}
                            </View>
                        </View>

                        <View style={styles.trackingControls}>
                            <View style={styles.progress}>
                                <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                                <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        width: screenWidth,
        height: screenHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});

export {VideoPlayer};

