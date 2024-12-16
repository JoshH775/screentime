import { useEffect, useState } from "react"
import './App.css'
import Modal from "./Modal"
import { isShow } from "./utils"
import Loading from "./Loading"

export default function App() {
  

  const [media, setMedia] = useState<Media[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    const fetchMedia = async () => {
      await chrome.storage.sync.get('media', (data) => {
        setMedia(data.media || [])
      })
      setLoading(false)
    }

    fetchMedia()
  }, [media])
  

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setShowModal(true)
  }

  const handleSave = async (updatedMedia: Media) => {
    const newMedia = [...media]
    if (editIndex !== null) {
      newMedia[editIndex] = updatedMedia
      setMedia(newMedia)
    } else {
      newMedia.push(updatedMedia)
      setMedia([...media, updatedMedia])
    }

    await chrome.storage.sync.set({ media: newMedia })

    setShowModal(false)
    setEditIndex(null)
  }

  const addNew = () => {
    setEditIndex(null)
    setShowModal(true)
  }

  const handleDelete = async (index: number) => {
    const newMedia = [...media]
    newMedia.splice(index, 1)
    setMedia(newMedia)
    await chrome.storage.sync.set({ media: newMedia })
  }

  return (
    <div className="main">
      {loading && <Loading />}
      <h1>ScreenTime</h1>
      <ul className="media-list">
        {media.map((m, i) => (
          <li key={i} className="media-item">
            <div className="media-title">{m.title}</div>
            {isShow(m) ? (
              <div className="media-info">
                Season {m.season}, Episode {m.episode} - {m.hours}h {m.minutes}m {m.seconds}s
              </div>
            ) : (
              <div className="media-info">
                {m.hours}h {m.minutes}m {m.seconds}s
              </div>
            )}
            <div className="buttons">
              <div>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </div>

              {m.link && (
                <a href={m.link} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                  Watch
                </a>
              )}
            </div>
            
          </li>
        ))}
      </ul>
      <span className="plus-icon" onClick={addNew}>+</span>

      {showModal && (
        <Modal media={editIndex !== null ? media[editIndex] : null} onClose={() => setShowModal(false)} onSave={handleSave} />
      )}
    </div>
  )
}

export type Movie = {
  title: string
  hours: number
  minutes: number
  seconds: number
}

export type Show = {
  title: string
  season: number
  episode: number
  hours: number
  minutes: number
  seconds: number
}

export type Media = (Movie | Show) & { link?: string }

