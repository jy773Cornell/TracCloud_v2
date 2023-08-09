import CentralPostingGenerator from "./CentralPosting";

const central_posting_generator = async (dataList, rowsSelected, format, uid, employerID) => {
    const reportData = dataList.filter(item => rowsSelected.includes(item.id));
    await CentralPostingGenerator(reportData, format, uid, employerID);
};

const reportGeneratorList = {
    central_posting: central_posting_generator,
};

export default function reportGenerator(id) {
    return reportGeneratorList[id];
}