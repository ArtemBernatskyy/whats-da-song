import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames';
import axios from 'axios';

import './styles/App.scss';
import { AUDIO_PERMISSIONS_CHOICES } from './constants';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      permissionsStatus: AUDIO_PERMISSIONS_CHOICES.UNKNOWN,
      isRecording: false,
    };
    this.mediaRecorder = null;
    this.chunks = [];
  }

  async componentDidMount() {
    await this.checkPermissions();
    if (this.state.permissionsStatus === AUDIO_PERMISSIONS_CHOICES.GRANTED) {
      this.initMediaRecorder();
    }
  }

  showNotification = (color, message) => {
    toast.dismiss();
    toast[color](message, { hideProgressBar: true });
  }

  async initMediaRecorder() {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  async checkPermissions() {
    const permissionsCheck = await navigator.permissions.query({name:'microphone'})
    if (permissionsCheck.state === AUDIO_PERMISSIONS_CHOICES.GRANTED) {
      this.showNotification('info', 'Audio permissions granted');
      this.setState({ permissionsStatus: AUDIO_PERMISSIONS_CHOICES.GRANTED });
    } else if (permissionsCheck.state === AUDIO_PERMISSIONS_CHOICES.PROMPT) {
      this.showNotification('info', 'Plz allow audio permissions');
      this.setState({ permissionsStatus: AUDIO_PERMISSIONS_CHOICES.PROMPT });
      try {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        stream.getTracks().forEach(track => track.stop());
        this.showNotification('success', 'Audio permissions granted');
        this.setState({ permissionsStatus: AUDIO_PERMISSIONS_CHOICES.GRANTED });
      } catch (error) {
        if (error.message && error.message === 'Permission denied') {
          this.showNotification('error', 'Audio permissions denied');
          this.setState({ permissionsStatus: AUDIO_PERMISSIONS_CHOICES.DENIED });
        }
      }
    } else if (permissionsCheck.state === AUDIO_PERMISSIONS_CHOICES.DENIED) {
      this.showNotification('error', 'Audio permissions denied');
      this.setState({ permissionsStatus: AUDIO_PERMISSIONS_CHOICES.DENIED });
    }
  }

  async stopRecording() {
    // stop recording
    this.mediaRecorder.stop();
    // say that we're not recording
    // send audio to backend
    await this.sendAudio();
    this.setState({ isAnimating: false, isRecording: false });
  }

  toggleRecording = async () => {
    const { isRecording } = this.state;

    if (isRecording) {
      this.stopRecording();
    } else {
      // start recording
      // wipe old data chunks
      this.chunks = [];
      // start recorder with 10ms buffer
      this.mediaRecorder.start(10);
      // set timeout for 10 seconds after which we will automatically stop recording
      setTimeout(() => {
        if (this.mediaRecorder.state === 'recording') {
          this.stopRecording();
        }
      }, 10000);
      // say that we're recording
      this.setState({ isAnimating: true, isRecording: true });
    }
  };

  async sendAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: 'audio/webm'});
    const data = new FormData();
    data.append('file', blob, 'recording.webm');
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    try {
      const response = await axios.post(
        `https://dude-what-is-the-song.herokuapp.com/song/searchByFile`,
        data, config
      );
      if (response.status === 200) {
        this.showNotification('success', `${response.data.artist} - ${response.data.title}`);
      } else {
        this.showNotification('warning', "Can't find any matching song")
      }
    } catch {
        this.showNotification('error', 'Backend error');
    }
  }

  render() {
    const { isAnimating, permissionsStatus } = this.state;
    const logoClass = classNames({
      logo: true,
      'logo--animate': isAnimating,
      'logo--disabled': permissionsStatus !== AUDIO_PERMISSIONS_CHOICES.GRANTED,
    });
    return (
      <div>
        <div className="shazam-container">
          <div onClick={this.toggleRecording} className={logoClass}>
              <div className="c-shape"></div>
              <div className="c-shape reverse"></div>
          </div>
          <div className={`outer-circle ${this.state.isAnimating ? 'outer-circle--animate': ''}`}></div>
          <div className={`outer-circle2 ${this.state.isAnimating ? 'outer-circle2--animate': ''}`}></div>
        </div>

        {!isAnimating &&
          <div className="lyrics-search">
            <FontAwesomeIcon icon={faFont} />
          </div>
        }

        <ToastContainer />

      </div>
     )
  }
}

export default App;
