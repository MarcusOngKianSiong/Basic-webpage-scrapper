const fs = require('fs').promises
const path = require('path')

// const titlePattern = `^(.+)h5 class="card-title"(.+)$`
// const sourceOrg = `(.+)<div class="mb-3" style="background-color:LightSalmon;border-radius:10px;text-align:center">$`
// const link = `^(.+)data-bs-link="https://(.+)$`
// const startDate = `(.+)Register by: (.*)`;
// const endDate = `(.+)Submit by: (.*)`;

// const titleRegex = new RegExp(titlePattern);
// const sourceOrgRegex = new RegExp(sourceOrg);
// const linkRegex = new RegExp(link);
// const startDateRegex = new RegExp(startDate);
// const endDateRegex = new RegExp(endDate);


function searchBetweenStrings(string,patternBefore,patternAfter){
    const createRegex = `.*${patternBefore}(.*)${patternAfter}.*`;
    const reg = new RegExp(createRegex);
    const outcome = reg.exec(string)
    if(outcome){
        return outcome[1]
    }else{
        return false;
    }
}

function handleDateConversion(date){
    /* 
        Assumption:
            - date input format: Feburary-3-2021
            - Data type: string
    */
    // const split = date.split("-");
    const dateFormatter = new Date(date);
    return dateFormatter.toISOString().slice(0,10)
}

function createRegexCheckers(obj){
    // CHECKERS
    checkObjectContentType(obj,"string");

    const lineRegexCheckers = {};
    for(const regexName in obj){
        lineRegexCheckers[regexName] = new RegExp(obj[regexName]);
    }
    return lineRegexCheckers;
}

/*
    Steps: 
        1. Create the regex
        2. Obtain all the necessary data
        3. Loop through the data to find lines that match
            3.1. Loop through each line regex
                3.1. Check if the current looped line matches current line regex
                3.2. If so, store it
                3.3. break
        4. Combine the entire stored string (3) into a single string
        5. Put it into the output file
*/
global.scrap = async function(){
    // LOOK AT GLOBALUTILITIES.JS FILE
    try{
        isStringFormat(filePath);
        isObject(regexPattern);
        isObject(dataExtractionRegex);
        objectIsNotEmpty(regexPattern);
        objectIsNotEmpty(dataExtractionRegex);
        doesFileExist(filePath);
        checkIfBothObjectHasTheSameKeys(regexPattern,dataExtractionRegex);
    }catch(err){
        console.log(err)
        return false
    }
    
    // Step 1: Obtain the regex checkers
    const lineRegexCheckers = createRegexCheckers(regexPattern);    // Line regex checkers
    const dataExtractionRegexCheckers = createRegexCheckers(dataExtractionRegex);
    const data = await fs.readFile(filePath,'utf8')

    // Step 2: Obtain all the necessary data
        // Step 2.1. HTML
            const splitByNewLine = data.split('\n');
            const length = splitByNewLine.length
    
    // Step 3: Find the lines that match the regex patterns
        const allMatches = {};
        for(const lineRegexName in lineRegexCheckers){
            allMatches[lineRegexName] = [];
        }
        for(let i = 0;i<length;i++){
            const currentLine = splitByNewLine[i];
            for(const lineRegexName in lineRegexCheckers){
                if(lineRegexCheckers[lineRegexName].exec(currentLine)){
                    allMatches[lineRegexName].push(currentLine);
                    break;
                }
            }
        }
        
    // Step 4: Extract the data from that line
        // I am betting that I can use the order to piece together a single row of data. 
        /* 
            Assumption:
                - both the line regex name and the data extraction regex name is the same
        */
        const extractedData = {}
        for(const lineRegexName in lineRegexCheckers){
            extractedData[lineRegexName] = [];
        }
        const matchedLength = allMatches.length;
        for(const name in allMatches){
            const currentLineMatchArray = allMatches[name];
            const length = currentLineMatchArray.length;
            for(let i = 0;i<length;i++){
                const currentLine = currentLineMatchArray[i];
                const regexOutcome = dataExtractionRegexCheckers[name].exec(currentLine);
                if(regexOutcome){
                    extractedData[name].push(regexOutcome[1]);
                }
            }
        }
    
    // Step 5: Create the rows
        /*
            Assumption:
                - A potential way to counter the "something going wrong" factor in my mind: Assumptions. 
                - Assumes that all the arrays held by each key to be the same in length
                - Assumes that there is at least one item in the list of regexes. 
        */
        // convert everything into a single string
        const collectionOfRows = []
        const allLength = Object.values(extractedData)[0].length;
        for(let i = 0;i<allLength;i++){
            let string = ''
            for(const item in extractedData){
                string+=extractedData[item][i]+',';
            }
            collectionOfRows.push(string.slice(0,string.length-1));
        }
        
    // Step 6: Join everything into a single string, split by new line
        const joinEverything = collectionOfRows.join("\n");
        
    // Step 7: Pass the combined string into output.txt
        await fs.writeFile(outputLocation,joinEverything,'utf-8');
        console.log("Scrapping Completed");
        return true;
}

