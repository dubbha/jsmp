import React from 'react';
import {
  Image,
  View,
  Modal,
  Button,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class ModalPreview extends React.Component {
  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => console.log('closed')}
      >
      <View style={this.props.styles.modalContainer}>
        <Button
          title='Close'
          onPress={this.props.onTogglePreviewModal}
        />
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.onTogglePreviewModal}
        >
        <Image
          style={{
            width: width,
            height: width,
          }}
          source={{uri: this.props.previewPhoto}}
        />
        </TouchableHighlight>
      </View>
      </Modal>);
  }
}
