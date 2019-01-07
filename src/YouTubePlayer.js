import React, { Component } from 'react'

class YouTubePlayer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      player: {}
    }
  }

  componentDidMount () {
    let tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    let firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    let player = {}
    window.onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('player', {
        height: '390',
        width: '640',
        videoId: this.props.videoId,
        playerVars: {
          rel: '0',
          showinfo: '0'
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              this.props.playNext()
            }
          }
        }
      })
      this.setState({ player })
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.videoId !== prevProps.videoId) {
      this.state.player.loadVideoById(this.props.videoId)
    }
  }

  render () {
    return (
      <div className='YouTubePlayer'>
        <div id='player' />
      </div>
    )
  }
}

export default YouTubePlayer
