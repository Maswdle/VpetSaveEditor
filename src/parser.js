export function parseSaveData(saveData) {
    const saveDataArray = saveData.split(':|');

    const saveObject = {};
    saveDataArray.forEach(item => {
        const [key, value] = item.split('#');
        saveObject[key] = value;
    });

    return saveObject;
}


