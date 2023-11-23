const fs = require('fs')
const path = require('path')


fs.readFile(path.join(__dirname,"interface.txt"),'utf8',(err,data)=>{
    const splitting = data.split('\n');
    const length = splitting.length;
    const list = []
    for(let i = 0;i<length;i++){
        const current = splitting[i];
        const splitByDash = current.split("-");
        const reconstruct = splitByDash[0] + " " + splitByDash[1] + ", " + splitByDash[2];
        list.push(reconstruct);
        
        
    }

    const combined = list.join('\n');
    fs.writeFile(path.join(__dirname,"list.txt"),combined,(err)=>{

    });
})