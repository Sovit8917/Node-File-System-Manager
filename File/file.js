import * as fs from "node:fs";

function createFile(pathname) {
    // Sync
//   fs.writeFileSync(pathname, "Hello Nodejs!");
//   fs.appendFileSync(pathname,"Hello Javasript")

fs.writeFile(pathname,"Hello NodeJS!",(err)=>{
    if(err){
        console.log("Something went wrong")
        return
        
    }
    console.log("File has been created Asynchornously");
    
})
  console.log("file Operation done!");
}
createFile("./hello.txt");
