import React, { useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
const AlarmWhistle = ({ alarmList }) => {
  const audioEL = useRef()

  useEffect(() => {
    if (!alarmList.res)  audioEL.current.audioEl.play();
  }, [alarmList])
  return (
    <ReactAudioPlayer
      src="/audio/AlarmWhistle.mp3"
      style={{ display: 'none'}}
      controls
      ref={audioEL}
    />
  )
}

export default AlarmWhistle;