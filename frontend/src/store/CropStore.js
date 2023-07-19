import {makeAutoObservable} from 'mobx';

class CropStore {
    columnWidth = 200;
    editWidth = 180;
    field_names = ["crop", "variety", "crop_code", "category"]

    constructor() {
        makeAutoObservable(this);
    }

}

const cropStore = new CropStore();
export default cropStore;
