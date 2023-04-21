import React from 'react';
import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

const reportGenerateUrl = '/api/report/central-posting';

export default async function CentralPostingGenerator(reportData, format) {
    try {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({reportData: reportData, format: format}),
        };
        const reportFile = await fetch(reportGenerateUrl, requestOptions).then((response) => response.arrayBuffer());

        const workbook = await XlsxPopulate.fromDataAsync(reportFile);
        const xlsxBlob = await workbook.outputAsync({type: "blob"});
        const downloadUrl = URL.createObjectURL(xlsxBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "Central Posting.xlsx";
        downloadLink.click();
        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Failed to generate and download xlsx:", error);
    }
};
