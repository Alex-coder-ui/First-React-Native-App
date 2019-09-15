import React from 'react'
import {Text, View} from 'react-native'

class TabIcon extends React.Component {
    render() {
        const color = `#${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
        return (
            <View style={{backgroundColor: color, width: '100%', height: '100%', justifyContent: 'center'}}>
                <Text style={{
                    color: this.props.selected ? 'pink' : 'white',
                    textAlign: 'center',
                    fontSize: 20
                }}>{this.props.title}</Text>
            </View>
        );
    }
}

export {TabIcon}