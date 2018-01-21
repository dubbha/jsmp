import React from 'react';
import {
  Image,
  View,
  Modal,
  Button,
  TouchableHighlight,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class ModalGallery extends React.Component {
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
              onPress={this.props.onToggleGalleryModal}
            />
            <ScrollView
              contentContainerStyle={this.props.styles.scrollView}>
              {
                this.props.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.props.onPreview(p.node.image.uri)}
                    >
                      <Image
                        style={{
                          width: width/3,
                          height: width/3
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>
        </Modal>
      );
    }
}
