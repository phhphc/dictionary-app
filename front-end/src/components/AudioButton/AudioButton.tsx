import { IDictPron } from 'app/interfaces'
import { useRef, useState } from 'react'
import { AiOutlineSound, AiFillSound } from 'react-icons/ai'
import styled from 'styled-components'

type AudioButtonProps = {
    audio: IDictPron['audio']
}
const AudioButton = ({ audio }: AudioButtonProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioTag = useRef<HTMLAudioElement>(null)

    const handlePlay = () => {
        audioTag.current?.play()
    }
    const setPlayStatus = (status: boolean) => () => {
        setIsPlaying(status)
    }

    return (
        <div>
            <AudioButtonToggle onClick={handlePlay}>
                {isPlaying ? <AiFillSound /> : <AiOutlineSound />}
            </AudioButtonToggle>
            <audio
                ref={audioTag}
                onPlaying={setPlayStatus(true)}
                onPause={setPlayStatus(false)}
            >
                {audio.map(({ src, type }, index) => (
                    <source type={type} src={src} key={index} />
                ))}
            </audio>
        </div>
    )
}

export default AudioButton

const AudioButtonToggle = styled.div({
    cursor: 'pointer',
    margin: '0 12px 0 4px',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
})
