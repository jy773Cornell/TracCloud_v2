import React from 'react'
import sprayCardStore from "./SprayCardStore";

class RootStore {
    constructor() {
        this.sprayCardStore = sprayCardStore
    }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)

export {useStore}