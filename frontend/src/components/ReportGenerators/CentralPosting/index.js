import React from 'react';
import XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';

const templateUrl = `${process.env.PUBLIC_URL}/ReportTemplates/CentralPosting-template.xlsx`;

export default async function CentralPostingGenerator() {
    console.log(templateUrl)
    try {
        const templateData = await fetch(templateUrl).then((response) => response.arrayBuffer());
        const workbook = await XlsxPopulate.fromDataAsync(templateData);

        const sheet = workbook.sheet("Central Posting");
        sheet.cell("A1").value("Hello");
        sheet.cell("B1").value("World");

        const xlsxBlob = await workbook.outputAsync({type: "blob"});
        const downloadUrl = URL.createObjectURL(xlsxBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "output.xlsx";
        downloadLink.click();

        URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error("Failed to generate and download xlsx:", error);
    }
};
