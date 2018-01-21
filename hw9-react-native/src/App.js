import React from 'react';
import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  CameraRoll,
  Alert,
  Modal,
  ScrollView,
  Button,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Camera from 'react-native-camera';

import ModalPreview from './components/ModalPreview';
import ModalGallery from './components/ModalGallery';
import Icon from './components/Icon';

const { width } = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      photos: [],
      galleryModalVisible: false,
      previewModalVisible: false,
      previewPhoto: '',
    };
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 9,
      assetType: 'All'
    })
    .then(r => {
      this.setState({ photos: r.edges });
      this.toggleGalleryModal();
    })
  }

  toggleGalleryModal = () => {
    this.setState({ galleryModalVisible: !this.state.galleryModalVisible });
  }

  togglePreviewModal = () => {
    this.setState({ previewModalVisible: !this.state.previewModalVisible });
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  preview = (uri) => {
    this.setState({ previewPhoto: uri });
    this.togglePreviewModal();
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./assets/ic_flash_off_white.png');
    }

    return icon;
  }

  get collectionsIcon() {
    const icon = require('./assets/ic_collections_white.png');
    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Icon
            style={styles.typeButton}
            onPress={this.switchType}
            source={this.typeIcon}>
          </Icon>
          <Icon
            style={styles.flashButton}
            onPress={this.switchFlash}
            source={this.flashIcon}>
          </Icon>
          <Icon
            style={styles.collectionsButton}
            onPress={this.getPhotos}
            source={this.collectionsIcon}>
          </Icon>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture}
          >
            <Image
                source={require('./assets/ic_photo_camera_36pt.png')}
            />
          </TouchableOpacity>
          <View style={styles.buttonsSpace} />
        </View>

        <ModalGallery
          visible={this.state.galleryModalVisible}
          onToggleGalleryModal={this.toggleGalleryModal}
          photos={this.state.photos}
          onPreview={this.preview}
          styles={styles}
        >
        </ModalGallery>

        <ModalPreview
          visible={this.state.previewModalVisible}
          onTogglePreviewModal={this.togglePreviewModal}
          previewPhoto={this.state.previewPhoto}
          styles={styles}
        >
        </ModalPreview>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  collectionsButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});
