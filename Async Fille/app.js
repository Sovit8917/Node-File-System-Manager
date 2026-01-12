import * as fs from "node:fs/promises";

async function createFolder(foldername) {
  await fs.mkdir(foldername, { recursive: true });
}

// Delete Files
const deletFile = async (filepath) => {
  try {
    await fs.unlink(filepath);
    console.log(`${filepath} has been deleted!`);
  } catch (error) {
    console.log("Something went wrong! ", error);
  }
};

// Folder Delete

const deletFolder = async (folderpath) => {
  try {
    await fs.rm(folderpath, { recursive: true });
    console.log(`${folderpath} has been deleted!`);
  } catch (error) {
    console.log("Something went wrong! ", error);
  }
};

// Create Files

async function createFile(pathname, content = "") {
  await fs.writeFile(pathname, content);
}
async function readFile(pathname) {
  const data = await fs.readFile(pathname, "utf-8");
  console.log("data: ", data);
}
async function writetoFile(pathname, content = "") {
  await fs.appendFile(pathname, content);
}

// get file Info

const getfileInfo = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);
    console.log(`${filePath}: `, stats);
    return {
        size: `${(stats.size/1024).toFixed(2)}KB`,
        created: stats.birthtime.toLocaleString(),
        modified : stats.mtime.toLocaleString(),

    }
  } catch (error) {
    console.log("Something went wrong! ", error);
  }
};

 getfileInfo("./hello.txt").then((data)=>{
    console.log(data);
    
 })


// createFolder('./content/images/logos')
// deletFolder('./content/images/logos')
// createFile('./hello.txt', "Hello Node.JS ! \n")


