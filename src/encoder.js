

export function encodeSaveData(saveObject) {
    let saveString = '';
    for (const key in saveObject) {
        if (saveObject.hasOwnProperty(key)) {
            saveString += `${key}#${saveObject[key]}:|`;
        }
    }
    return saveString
        .slice(0, -2)
        .replace("#undefined", ""); // 不要问我为什么这么写，我懒德找bug了
}



