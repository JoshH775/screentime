import { useState } from "react"
import { Media } from "./App"
import './Modal.css'
import { isShow } from "./utils"

type Props = {
    media: Media | null
    onClose: () => void
    onSave: (updatedMedia: Media) => void
}

export default function Modal({ media, onClose, onSave }: Props) {


    const [mediaIsShow, setMediaIsShow] = useState(media && !isShow(media) ? false : true)
    const [title, setTitle] = useState(media?.title || "")
    const [hours, setHours] = useState(media?.hours || 0)
    const [minutes, setMinutes] = useState(media?.minutes || 0)
    const [seconds, setSeconds] = useState(media?.seconds || 0)
    const [episode, setEpisode] = useState(media && isShow(media) ? media.season : 0)
    const [season, setSeason] = useState(media && isShow(media) ? media.season : 0)

    const handleSave = () => {
        const updatedMedia: Media = {
            ...media,
            title,
            hours,
            minutes,
            seconds,
            episode: mediaIsShow ? episode : undefined,
            season: mediaIsShow ? season : undefined,
        }
        onSave(updatedMedia)
    }
    

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <label id='is-show'>
                        Media is a show
                        <input type="checkbox" checked={mediaIsShow} onChange={() => setMediaIsShow(!mediaIsShow)} />
                    </label>
                    <span className="close" onClick={onClose}>X</span>
                </div>
                <div className="modal-body">
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    {mediaIsShow && (
                        <>
                            <label>
                                Season:
                                <input type="number" value={season} min="1" onChange={(e) => setSeason(parseInt(e.target.value))} />
                            </label>
                            <label>
                                Episode:
                                <input type="number" value={episode} min="1" onChange={(e) => setEpisode(parseInt(e.target.value))} />
                            </label>
                        </>
                    )}
                    <div className="time-inputs">
                        <label>
                            Hours:
                            <input type="number" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} />
                        </label>
                        <label>
                            Minutes:
                            <input type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value))} />
                        </label>
                        <label>
                            Seconds:
                            <input type="number" value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value))} />
                        </label>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}