import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faTimes } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash/debounce';
import axios from 'axios';

import '../styles/text_search.scss';



class TextSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      song: null,
    };
    this.emitChangeDebounced = debounce(this.emitChange, 400);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  async emitChange(value) {
    if (!value) {
      this.setState({ song: null });
    };
    try{
      const response = await axios.get(`https://dude-what-is-the-song.herokuapp.com/song/searchByLyrics?l=${value}`);
      if (response.status === 200) {
        const videoId = response.data.appleMusicLink.split('http://www.youtube.com/watch?v=')[1];
        response.data.appleMusicLink = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        this.setState({ song: response.data });
      }
    } catch {};
  }

  render() {
    const { isModalOpen, song } = this.state;
    return (
      <React.Fragment>
        <div className={`modal-window ${isModalOpen ? 'modal-window--visible': ''}`}>
          <div>
            <input onChange={e => this.emitChangeDebounced(e.target.value)} placeholder="Search by lyrics" />

            {song &&
              <div className="television">
                <div className="television__center">
                  <div className="television__screen">
                    <iframe
                      src={song.appleMusicLink} frameBorder="0" allowFullScreen></iframe>
                  </div>
                  <div className="television__channels-wrapper">
                    <ul className="television__channels">
                      <li className="television__channel">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/artembernatskyy/" title="Channel 1" />
                      </li>
                      <li className="television__channel">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/michael-rudyy/" title="Channel 2"/>
                      </li>
                      <li className="television__channel">
                        <a target="_blank" rel="noopener noreferrer" href="hhttps://www.linkedin.com/in/ikasyk/" title="Channel 3"/>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
        <div className={`lyrics-search ${isModalOpen ? 'lyrics-search--opened': ''}`} onClick={this.toggleModal}>
          <FontAwesomeIcon icon={isModalOpen ? faTimes : faFont} />
        </div>
      </React.Fragment>
     )
  }
}

export default TextSearch;
