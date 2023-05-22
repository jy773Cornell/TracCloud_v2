import React from 'react'
import cropStore from './CropStore'

class RootStore {
    constructor() {
        this.cropStore = cropStore
    }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export {useStore}