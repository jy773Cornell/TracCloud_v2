import React from 'react'
import cropStore from './CropStore'
import sprayCardStore from "./SprayCardStore";

class RootStore {
    constructor() {
        this.cropStore = cropStore
        this.sprayCardStore = sprayCardStore
    }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export {useStore}