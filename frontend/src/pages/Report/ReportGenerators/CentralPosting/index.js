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

            // Extract the filename from the Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = "file";
            if (contentDisposition) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            const downloadLink = document.createElement("a");
            downloadLink.href = downloadUrl;

            downloadLink.download = filename
            downloadLink.click();
            URL.revokeObjectURL(downloadUrl);
            resolve();
        } catch (error) {
            console.error("Failed to generate and download file:", error);
            reject(error);
        }
    });
};
