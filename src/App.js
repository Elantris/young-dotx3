import React, { Component } from 'react'
import playlist from './playlist'
import YouTubePlayer from './YouTubePlayer'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    let saved = window.localStorage.getItem('saved')
    if (!saved) {
      saved = {
        year: '2013',
        videoIndex: 0
      }
      window.localStorage.setItem('saved', JSON.stringify(saved))
    } else {
      saved = JSON.parse(saved)
    }

    this.state = {
      year: saved.year,
      videoIndex: saved.videoIndex
    }
  }

  handleSelectYear (year) {
    return event => {
      let saved = {
        year,
        videoIndex: 0
      }
      window.localStorage.setItem('saved', JSON.stringify(saved))
      this.setState(saved)
    }
  }

  handleSelectVideo (videoIndex) {
    return event => {
      let saved = {
        year: this.state.year,
        videoIndex
      }
      window.localStorage.setItem('saved', JSON.stringify(saved))
      this.setState(saved)
    }
  }

  playNext () {
    return () => {
      this.setState({
        videoIndex: (this.state.videoIndex + 1) % playlist[this.state.year].length
      })
    }
  }

  render () {
    return (
      <div className='App container'>

        <h1>青春點點點 錄音檔循環播放清單</h1>

        <div className='columns mb-16'>
          <div className='column col-5'>
            <div className='btn-group btn-group-block'>
              {Object.keys(playlist).map(v => (
                <div
                  key={`year-select-${v}`}
                  className={`btn ${v === this.state.year ? 'active' : ''}`}
                  onClick={this.handleSelectYear(v)}
                >
                  {v}
                </div>
              ))}
            </div></div>
          <div className='column col-7' />
        </div>

        <div className='divider mb-16' />

        <div className='columns mb-16'>
          <div className='column col-5'>
            <ul className='menu playlist'>
              <li className='divider' data-content='LINKS' />
              {playlist[this.state.year].map((v, i) => (
                <li key={`video-link-${v.id}`} className='menu-item'>
                  <a
                    className={`c-hand ${i === this.state.videoIndex ? 'active' : ''}`}
                    onClick={this.handleSelectVideo(i)}
                  >
                    {v.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className='column col-7'>
            <YouTubePlayer
              videoId={playlist[this.state.year][this.state.videoIndex].id}
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
