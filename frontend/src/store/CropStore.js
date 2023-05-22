import { makeAutoObservable } from 'mobx';

class CropStore {
    columnWidth = 200;
    editWidth = 180;
    field_names = ["crop", "variety", "crop_code", "category", "growth_stage"]

    constructor() {
        makeAutoObservable(this);
    }

}

const cropStore = new CropStore();
export default cropStore;
