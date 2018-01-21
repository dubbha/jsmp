import React from 'react';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Icon extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.props.onPress}
      >
        <Image
          source={this.props.source}
        />
      </TouchableOpacity>
    );
  }
}