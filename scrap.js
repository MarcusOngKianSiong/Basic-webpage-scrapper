const fs = require('fs')
const path = require('path')



const titlePattern = `^(.+)h5 class="card-title"(.+)$`
const sourceOrg = `(.+)<div class="mb-3" style="background-color:LightSalmon;border-radius:10px;text-align:center">$`
const link = `^(.+)data-bs-link="https://(.+)$`
const startDate = `(.+)Register by: (.*)`;
const endDate = `(.+)Submit by: (.*)`;



const titleRegex = new RegExp(titlePattern);
const sourceOrgRegex = new RegExp(sourceOrg);
const linkRegex = new RegExp(link);
const startDateRegex = new RegExp(startDate);
const endDateRegex = new RegExp(endDate);



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

function scrap(){
    fs.readFile(path.join(__dirname,'Hackathons and Competitions in Singapore - SandboxSG.html'),'utf8',(err,data)=>{
        
        // Obtain collection of data
        const splitByNewLine = data.split('\n');
        const length = splitByNewLine.length
        // console.log(splitByNewLine.length);
        // console.log(splitByNewLine)
        const collection = []
        let current = [];
        let counter = 1;
        for(let i = 0;i<length;i++){
            const currentLine = splitByNewLine[i];
            if(titleRegex.exec(currentLine)){
                const patternBefore = `">`;
                const patternAfter = `(<| )`;
                const outcome = searchBetweenStrings(currentLine,patternBefore,patternAfter);
                if(outcome === false){
                    console.log(currentLine)
                }
                current.push(outcome);
                continue;
            }
            if(linkRegex.exec(currentLine)){
                const patternBefore = `data-bs-link="`;
                const patternAfter = `"`;
                const outcome = searchBetweenStrings(currentLine,patternBefore,patternAfter);
                current.push(outcome);
                continue;
            }
            if(sourceOrgRegex.exec(currentLine)){
                const patternBefore = '<b>';
                const patternAfter = '</b>';
                const outcome = searchBetweenStrings(splitByNewLine[i+1],patternBefore,patternAfter);
                current.push(outcome);
                if(current.length === 4){
                    const commaSeparated = current.join(',');
                    collection.push(commaSeparated);
                }
                current = []
                continue;
            }
            if(startDateRegex.exec(currentLine)){
                const patternBefore = 'Register by: '
                const patternAfter = '</small>'
                const outcome = searchBetweenStrings(currentLine,patternBefore,patternAfter);
                const outcomeReplaceComma = outcome.replace(",","")
                console.log(outcomeReplaceComma)
                const outcomeReplaceSpace = outcomeReplaceComma.replaceAll(" ","-")
                
                current.push(outcomeReplaceSpace);
            }

            
        }
        
        // convert everything into a single string
        let str = ''
        const collectionLength = collection.length;
        for(let i = 0;i<collectionLength;i++){
            str+=collection[i]+'\n';
        }

        // console.log(str)
        // store it in a file
        fs.writeFileSync(path.join(__dirname,"list.txt"),str,{encoding: 'utf8'});

    })
}
scrap()







// const a = "somethingnothinghellogoodbye";
// console.log(searchBetweenStrings(a,"nothing","goodbye"))