import React, { Component } from 'react'
import playlist from './playlist'
import YouTubePlayer from './YouTubePlayer'
import './App.css'

const keywords = [
  '青春期五四三',
  '馬克信箱',
  '青春大學',
  '青春影城',
  'MM音樂教室'
]

class App extends Component {
  constructor (props) {
    super(props)

    window.localStorage.clear()

    this.state = {
      searchText: '',
      selectedVideo: playlist[0].id
    }
  }

  handleChangeSearch () {
    return event => {
      this.setState({
        searchText: event.target.value
      })
    }
  }

  handleSelectKeyword (searchText) {
    return event => {
      this.refs.inputSearch.value = searchText
      this.setState({ searchText })
    }
  }

  handleSelectVideo (videoId) {
    return event => {
      this.setState({
        selectedVideo: videoId
      })
    }
  }

  playNext () {
    return () => {
      let list = []
      if (this.state.searchText === '') {
        list = playlist
      } else {
        list = playlist.filter(v => v.title.includes(this.state.searchText))
      }
      let videoIndex = list.findIndex(v => v.id === this.state.selectedVideo)
      if (videoIndex !== -1) {
        let nextVideoId = list[(videoIndex + 1) % list.length].id
        this.setState({
          selectedVideo: nextVideoId
        })
      }
    }
  }

  render () {
    return (
      <div className='App container'>

        <h1>青春點點點 錄音檔循環播放清單</h1>

        <div className='columns mb-16'>
          <div className='column col-5 col-lg-12'>
            <div className='form-group mb-16'>
              <input
                ref='inputSearch'
                type='text'
                className='form-input'
                placeholder='Search'
                onChange={this.handleChangeSearch()}
              />
            </div>
          </div>
          <div className='column col-7 col-lg-12'>
            {keywords.map((v, i) => (
              <button
                key={`keyword-${v}`}
                className='btn mr-2'
                onClick={this.handleSelectKeyword(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className='divider mb-16' />

        <div className='columns mb-16'>
          <div className='column col-5 col-lg-12'>
            <ul className='menu playlist mb-16'>
              <li className='divider' data-content='LINKS' />
              {playlist.map((v, i) => (
                <li
                  key={`video-link-${v.id}`}
                  className={`menu-item ${this.state.searchText && !v.title.includes(this.state.searchText) ? 'd-hide' : ''}`}
                >
                  <a
                    className={`c-hand ${v.id === this.state.selectedVideo ? 'active' : ''}`}
                    onClick={this.handleSelectVideo(v.id)}
                  >
                    {v.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='column col-7 col-lg-12'>
            <YouTubePlayer
              videoId={this.state.selectedVideo}
              playNext={this.playNext()}
            />
          </div>
        </div>

        <div className='divider mb-16' />

        <footer className='text-center'>
          <a href='https://github.com/Elantris' target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-github' />
            {' '}
            Elantris
          </a>
        </footer>
      </div>
    )
  }
}

export default App
