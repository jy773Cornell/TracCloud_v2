import React from 'react';
import dayjs from "dayjs";
import {getCookie} from "../../../../utils";

const reportGenerateUrl = '/media/report/central-posting/';

export default function CentralPostingGenerator(reportData, format, uid, employerID) {
    return new Promise(async (resolve, reject) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
                body: JSON.stringify({reportData: reportData, format: format, user_id: employerID, author_id: uid}),
            };
            const response = await fetch(reportGenerateUrl, requestOptions);
            if (response.ok) {
                resolve();
            }
        } catch (error) {
            console.error("Failed to generate file:", error);
            reject(error);
        }
    });
};
