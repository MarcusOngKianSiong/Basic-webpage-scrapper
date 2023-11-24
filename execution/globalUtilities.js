const fs = require('fs')

global.doesFileExist = (filePath) => {
	const outcome = fs.existsSync(filePath);
	if(outcome){
		return true;
	}else{
		throw new Error("file does not exist");
	}
}

global.isStringFormat = (string, parameterName) => {
    if(typeof string !== "string"){
        throw new Error(`${parameterName} is not of type string`);
    }
    return true;
}

global.isObject = (obj,paramName) => {
    if(typeof obj !== "object"){
        throw new Error(`${paramName} is not of type object`);
    }
    return true;
}

global.objectIsNotEmpty = (obj,paramName) => {
    if(Object.keys(obj).length === 0){
        throw new Error(`${paramName} received an empty object`);
    }
    return true;
}

global.checkObjectContentType = (obj,typeName) => {
    for(const item in obj){
        if(typeof typeName !== typeName){
            throw new Error(`Object value should be of type ${typeName}`)
        }
    }
    return true;
}

global.checkIfBothObjectHasTheSameKeys = (obj1,obj2) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const length1 = obj1Keys.length;
    const length2 = obj2Keys.length;

    if(length1 !== length2){
        throw new Error("Length is not the same")
    }

    for(let i = 0;i<length1;i++){
        if(obj1Keys[i] !== obj2Keys[i]){
            throw new Error("Keys are not the same between two objects");
        }
    }

    return true;

}