import React, { Component } from 'react'
import playlist from './playlist'
import YouTubePlayer from './YouTubePlayer'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      year: '2013',
      videoIndex: 0
    }
  }

  handleSelectYear (year) {
    return event => {
      this.setState({
        year,
        videoIndex: 0
      })
    }
  }

  handleSelectVideo (videoIndex) {
    return event => {
      this.setState({
        videoIndex
      })
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

        <h1>青春點點點 循環播放器</h1>
        <p>YouTube <a href='https://www.youtube.com/channel/UCxxUtGu7ABDdFAgifw-Zk6A'>啤酒肥花</a> 剪輯</p>

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
            <i class='fab fa-github' />
            {' '}
            Elantris
          </a>
        </footer>
      </div>
    )
  }
}

export default App
