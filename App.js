import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'
import {VideoList, VideoPlayer} from './src/components/Screens'
import {TabIcon} from './src/components/uikit'


export default class App extends Component {

    render() {
        const {container} = styles;
        return (
            <Router navigationBarStyle={container}>
                <Scene key="root" tabs={true} showLabel={false} wrap={false} tabBarPosition="bottom">
                    <Scene key="VideoList" component={VideoList} title="Playlist" icon={TabIcon}/>
                    <Scene
                        showLabel={false}
                        key="VideoPlayer"
                        component={VideoPlayer}
                        title="VideoPlayer"
                        icon={TabIcon}
                        onExit={() => this.forceUpdate()}
                        unmountScene={true}
                        tabs={true}
                    />
                </Scene>
            </Router>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        fontSize: 18,
    },
});
