import styled from 'styled-components/macro'
import {useRef, useState} from "react";
import axios from "axios";

export function ImageUpload({reloadPhotos}) {

    const inputRef = useRef()
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const handleUpload = (event) => {
        event.preventDefault()
        setError()
        const file = inputRef.current.files[0]
        const formData = new FormData()
        formData.set('image', file)

        setLoading(true)
        axios.post('/photo/upload', formData)
            .then(res => res.data)
            .then(() => reloadPhotos())
            .catch(error => setError(error))
            .finally(() => setLoading(false))
    }

    return (
        <Wrapper onSubmit={handleUpload}>
            {loading ?
                <span>Loading...</span>
                :
                <>
                    <input type="file" ref={inputRef}/>
                    <button>Upload</button>
                </>
            }
            {error && <span>Error: {error.message}</span>}

        </Wrapper>
    )
}

const Wrapper = styled.form`
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  border: 1px solid #efefef;
  background: white;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0px 1px 1px #444;
`
