import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SaveIcon from 'material-ui/svg-icons/content/save';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { ChromePicker } from 'react-color';
import uriPrefix from './uriPrefix';

const colorObjToRgba = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

class Cabinet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      username: null,
      image: null,
      color: { r: 0, g: 0, b: 0, a: 1 },
      colorPickerVisible: false,
    };

    this.fabric = null;
    this.canvas = null;
  }

  componentDidMount() {
    this.auth();
  }

  componentDidUpdate() {
    if (!this.fabric || !this.canvas) {
      this.fabric = window.fabric;
      this.canvas = new this.fabric.Canvas('c');
      this.canvas.setHeight(320);
      this.canvas.setWidth(1280);

      this.addBorder();
      this.addDefaultSkin();
      this.addItems('beard', 10, 10, 220, 100);
      this.addItems('wear', 8, 230, 10, 155);
      this.addItems('glasses', 4, 180, 240, 100);
      this.addItems('accessories', 5, 160, 800, 85);

      this.canvas.renderAll();
    }

    this.canvas.freeDrawingBrush.color = colorObjToRgba(this.state.color);

    if (!this.state.image) {
      this.loadImage();
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.state.auth && (
            <div>
              <canvas id="c" style={{ border: '1px solid', boxSizing: 'border-box', }}></canvas>
              <Link to="/">
                <FlatButton label="Back to Chat" icon={<ExitToApp />} />
              </Link>
              <FlatButton>
                <Toggle
                  style={{ fontSize: '14px' }}
                  label="DRAW"
                  labelPosition="right"
                  onToggle={this.toggleDrawingMode}
                />
              </FlatButton>
              <a onClick={this.save}>
                <FlatButton label="Save to File" icon={<SaveIcon />} />
              </a>
              <FlatButton onClick={this.saveToServer} label="Save to Server" icon={<SaveIcon />} />
              <FlatButton label="Delete Selected" onClick={this.delete} icon={<DeleteForever />} />
              <FlatButton label="Animate Selected" onClick={this.animate} icon={<DeleteForever />} />
              <FlatButton containerElement='label' label="Load from File" icon={<AttachFile />} style={{ verticalAlign: 'bottom' }}>
                <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={this.loadFile} />
              </FlatButton>
              <div>
                <div style={{ display: 'inline-block', minWidth: '200px', verticalAlign: 'top' }}>
                  <img src={this.state.image} />
                  <span style={{ display: 'block', textAlign: 'center', font: '14px Arial' }}>
                    { this.state.image && `${this.state.username} avatar from server`}
                  </span>
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                  { this.state.colorPickerVisible &&
                      <ChromePicker
                        color={this.state.color}
                        onChange={this.handleColorChange}
                      />
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }

  auth = () => {
    axios.defaults.headers.common.Authorization = `JWT ${sessionStorage.getItem('token')}`;
    return axios.get(`${uriPrefix}/auth`)
      .then((res) => {
        this.setState({
          auth: res.data.auth,
          response: res.data.result,
          username: sessionStorage.getItem('username')
        });
      })
      .catch((err) => {
        if (!err.response.data.auth) this.props.history.push('/login');
      });
  }

  loadImage() {
    axios.get(`${uriPrefix}/api/user/avatar/${this.state.username}`)
      .then((res) => {
        this.setState({ ...this.state, image: res.data });
      });
  }

  addBorder() {
    const rect = new this.fabric.Rect({
      left: 8,
      top: 8,
      width: 204,
      height: 204,
      fill: 'transparent',
      hasBorders: true,
      selectable: false,
      stroke: 'black',
      strokeDashArray: [5, 5],
      strokeWidth: 1,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
    });

    this.canvas.add(rect).sendToBack(rect);
  }

  addDefaultSkin() {
    this.fabric.Image.fromURL('../assets/img/skin.png', (img) => {
      const defaultSkin = img.set({
        left: 27,
        top: 35,
        width: img.width / 2,
        height: img.height / 2,
      });

      defaultSkin.set('selectable', true);
      defaultSkin.hasBorders = false;
      defaultSkin.hasControls = false;

      this.canvas.add(defaultSkin).sendToBack(defaultSkin);
    });
  }

  addItems(type, number, top, left, step) {
    for (let i = 0; i < number; i += 1) {
      this.fabric.Image.fromURL(`../assets/img/${type}_${i + 1}.png`, (img) => {
        const item = img.set({
          width: img.width / 2,
          height: img.height / 2,
          left: left + (step * i),
          top,
        });

        this.canvas.add(item);
      });
      this.canvas.renderAll();
    }
  }

  save = (e) => {
    this.canvas.deactivateAll().renderAll();
    e.currentTarget.href = this.canvas.toDataURL({
      format: 'image/png',
      left: 10,
      top: 10,
      width: 200,
      height: 200,
    });
    e.currentTarget.download = 'avatar.png';
  }

  saveToServer = () => {
    this.canvas.deactivateAll().renderAll();
    const img = this.canvas.toDataURL({
      format: 'image/png',
      left: 10,
      top: 10,
      width: 200,
      height: 200,
    });

    axios.post(`${uriPrefix}/api/user/avatar`, { img })
      .then(() => this.setState({ ...this.state, image: null })); // refresh the image from server
  }

  loadFile = (e) => {
    const input = e.target;

    // const reader = new window.FileReader();
    const reader = new FileReader();

    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result;

      const shape = new this.fabric.Image(img);
      shape.set({ left: 10, top: 10, width: 200, height: 200 });

      this.canvas.add(shape).sendToBack(shape);
      window.requestAnimationFrame(() => this.canvas.renderAll());
    };

    reader.readAsDataURL(input.files[0]);
  }

  delete = () => {
    const activeGroup = this.canvas.getActiveGroup();
    if (activeGroup) {
      activeGroup.forEachObject(obj => this.canvas.remove(obj));
      this.canvas.discardActiveGroup().renderAll();
    } else {
      this.canvas.remove(this.canvas.getActiveObject());
    }
  }

  animate = () => {
    const fabric = this.fabric;
    const canvas = this.canvas;
    const target = this.canvas.getActiveObject();
    if (target) {
      target.animate('angle', '+=360', {
        onChange: canvas.renderAll.bind(canvas),
        duration: 600,
        easing: fabric.util.ease.easeInCubic,
        onComplete: () => {
          target.animate({ width: '+=150px', left: '-=75px', scaleY: 2, }, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 600,
            easing: fabric.util.ease.easeInCubic,
            onComplete: () => {
              target.animate({ width: '-=150px', left: '+=75px', scaleY: 1 }, {
                onChange: canvas.renderAll.bind(canvas),
                duration: 600,
                easing: fabric.util.ease.easeOutCubic,
                onComplete: () => {
                  target.animate({ scaleX: 0, left: '+=50%' }, {
                    onChange: canvas.renderAll.bind(canvas),
                    duration: 600,
                    easing: fabric.util.ease.easeOutCubic,
                    onComplete: () => {
                      target.animate({ scaleX: 1, left: '-=50%' }, {
                        onChange: canvas.renderAll.bind(canvas),
                        duration: 600,
                        easing: fabric.util.ease.easeOutCubic,
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }

  toggleDrawingMode = () => {
    this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    this.setState({
      colorPickerVisible: !this.state.colorPickerVisible,
    });
  }

  handleColorChange = (color) => {
    this.setState({ ...this.state, color: color.rgb });
    this.canvas.freeDrawingBrush.color = colorObjToRgba(color.rgb);
  }
}

Cabinet.propTypes = {
  input: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default Cabinet;
