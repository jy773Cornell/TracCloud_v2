import {makeAutoObservable} from 'mobx';
import {useState} from "react";

class SprayCardStore {

    chemicalOptions = [];

    flatten(data) {
        let result = [];
        for (let i = 0; i < data.length; i++) {
            let obj = {};
            obj = {...data[i]};
            delete obj.children;
            result.push(obj);
            if (data[i].children) {
                result = result.concat(this.flatten(data[i].children));
            }
        }
        return result;
    }

    async getSprayData(uid) {
        const requestOptions = {
            method: "GET", headers: {"Content-Type": "application/json"},
        };

        const responses = await Promise.all([
            fetch("/api/crop/list/get/" + "?uid=" + uid, requestOptions),
            fetch("/api/site/list/get/" + "?uid=" + uid, requestOptions),
            fetch("/api/chemical/list/get/" + "?uid=" + uid, requestOptions),
            fetch("/api/equipment/list/get/" + "?uid=" + uid, requestOptions),
            fetch("/api/operation/purchase/list/get/" + "?uid=" + uid, requestOptions),
            fetch("/api/operation/application/list/get/?" + "uid=" + uid, requestOptions),
            fetch("/api/crop/category/", requestOptions),
            fetch("/api/operation/application/target/", requestOptions),
            fetch("/api/operation/application/desicisionsupport/", requestOptions),
            fetch("/api/unit/", requestOptions),

            fetch("/workflow/usertree/subtree/get/?" + "uid=" + uid, requestOptions),
        ]);

        const jsonDataPromises = responses.map((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        });

        const jsonData = await Promise.all(jsonDataPromises);


        return {
            "record_data": {
                cropList: jsonData[0].data,
                siteList: jsonData[1].data,
                chemicalList: jsonData[2].data,
                equipmentList: jsonData[3].data,
                purchaseList: jsonData[4].data,
                sprayApplicationList: jsonData[5].data,
                cropCategory: jsonData[6].data,
                applicationTarget: jsonData[7].data,
                decisionSupport: jsonData[8].data,
                unit: jsonData[9].data,
                userSubTree: jsonData[10].data,
            },
            "option_data": {
                chemicalOptions: jsonData[4].data.map(item => {
                    const chemical = jsonData[2].data.find(chem => chem.chemid === item.chemical);
                    return {
                        label: `${chemical.epa_reg_no}  |  ${chemical.trade_name}  |  ${chemical.active_ingredient}  |  ${chemical.rei}  |  ${chemical.phi}  |  \$${item.cost_per_unit} per ${chemical.unit}  | ${item.pur_datetime}`,
                        unit: chemical.unit,
                        cost_per_unit: `\$${item.cost_per_unit} per ${chemical.unit}`,
                        id: item.prid,
                    };
                }),
                decisionSupportOptions: jsonData[8].data.map(item => ({
                    label: item.name, id: item.dsid
                })),
                cropOptions: jsonData[0].data.map(item => ({
                    label: `${item.crop} (${item.variety}, ${item.growth_stage})`,
                    id: item.cid
                })),
            }
        };
    }

    constructor() {
        makeAutoObservable(this);
    }

}

const sprayCardStore = new SprayCardStore();
export default sprayCardStore;
