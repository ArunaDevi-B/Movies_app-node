"use strict";

const fs = require("fs");

// const quote ="Practise makes a man perfect";
// fs.writeFile("./awesome.ppt", quote, (error)=>{
//     console.log("completed writing awesome.html");
// })

// const quote1 = "Everyone is great in their one way";

// for (let i = 1; i <= 10; i++){
//     fs.writeFile(`./Backup/text-${i}.html`, quote1, (err)=>{
//         console.log("completed creating 10 files using for loop");
//     })
// }

// const quote3 = "Be Happy:D!!!"
// const [, , n] = process.argv;
// for (let i=1; i<=n; i++){
//     fs.writeFile(`./Backup/text-${i}.html`, quote3, (error)=>{
//         console.log(`Completed creating html files text-${i}.html`)
//     })
// }

// fs.readFile("./Cool.txt", "utf-8",(error,data)=>{
//     if(error){
//         console.log(error);
//     }
//     console.log(data);
// })

// const data = "\nHope you enjoyed it!!!"
// fs.appendFile("./Cool.txt",data,(error)=>{
//     if(error){
//         console.log(error);
//     }
//     console.log("It was added successfully!")
// })

// fs.unlink("./delete.txt",(error)=>{
//     if(error){
//         console.log(error);
//     }
//     console.log("Deleted Successfully!")
// })

// fs.readdir("./Backup",(err,data)=>{
//     data.forEach(fileName=>{
//         fs.unlink(`./Backup/${fileName}`,(error)=>{
//             if(error){
//                 console.log(error);
//             }
//             console.log("Deleted Successfully");
//         })
//     })
// })
// const quote3 = "Its raining here!";
// for(let i=1;i<=10;i++){
// fs.writeFile(`./Backup/text-${i}.html`,quote3,(error)=>{
//     console.log(`Created files text${i}.html`);
// })
// }

fs.readdir("./Backup/",(err,data)=>{
    data.forEach(fileName=>{
        fs.unlink(`./Backup/${fileName}`,(error)=>{
            if(error){
                console.log(error);
            }
            console.log("Deleted All files", fileName);
        })

    })
})