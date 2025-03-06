const fs = require("fs")
const axios = require("axios").default
const fullList = require("./abc").fullList
const lostList = require("./lost").lostList

// for (let index = 0; index < lostList.length; index++) {
//     const element = lostList[index];
//     try {
//         fs.unlinkSync("./dist/uploads/"+element)
//     } catch (error) {
//         console.log(error)
//     }
// }

console.log(fullList.length)

const list = fs.readdirSync("./dist/uploads");


// console.log(JSON.stringify(list[0]))
const lost = []

list.forEach((x)=>{
    if(!includeFun(x)){
        console.log(lost.length)
        lost.push((x))
    }
})

function includeFun(x) {
    let flag = false;
    for (let index = 0; index < fullList.length; index++) {
        const e = fullList[index];
       if(e == x) {
        flag = true 
        break;
       }
    }
    return flag
}

fs.writeFileSync("./lost.txt",JSON.stringify(lost))
console.log(lost.length)