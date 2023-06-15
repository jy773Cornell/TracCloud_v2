import React from 'react';
import dayjs from "dayjs";
import {getCookie} from "../../../../utils";

const reportGenerateUrl = '/api/report/central-posting';

export default function CentralPostingGenerator(reportData, format) {
    return new Promise(async (resolve, reject) => {
        try {
            const csrftoken = getCookie('csrftoken');
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken,},
                body: JSON.stringify({reportData: reportData, format: format}),
            };
            const response = await fetch(reportGenerateUrl, requestOptions);
            const reportFile = await response.arrayBuffer();
            const blob = new Blob([reportFile], {type: format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            const downloadUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement("a");
            downloadLink.href = downloadUrl;

            downloadLink.download = "Central Posting " + dayjs().format('YYYY-MM-DD_HH-mm-ss') + (format === "pdf" ? ".pdf" : ".xlsx");
            downloadLink.click();
            URL.revokeObjectURL(downloadUrl);
            resolve();
        } catch (error) {
            console.error("Failed to generate and download file:", error);
            reject(error);
        }
    });
};