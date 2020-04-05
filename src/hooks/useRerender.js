import {useState} from 'react'

export default () => {
    const [renderKey, setRenderKey] = useState({})

    const triggerRerender = () => setRenderKey({})

    return triggerRerender
}