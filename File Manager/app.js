#!/usr/bin/env node

import * as readline from "node:readline/promises";
import fs from "node:fs/promises";
import { stdin, stdout } from "node:process";
import chalk from "chalk";
import path from "node:path";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

// Create Folder .......

async function createFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(chalk.green("✅ Folder created successfully."));
  } catch (error) {
    console.log(chalk.red("❌ Error creating folder:", error.message));
  }
}

// Create File ........

async function createFile(pathname, content = "") {
  try {
    await fs.writeFile(pathname, content);
    console.log(chalk.green("✅ File created successfully."));
  } catch (error) {
    console.log(chalk.red("❌ Error creating file:", error.message));
  }
}

// 3. Apeend File  ,........

async function appendToFile(pathname, content = "") {
  try {
    await fs.appendFile(pathname, content);
    console.log(chalk.green("✅ File Content Edit successfully."));
  } catch (error) {
    console.log(chalk.red("❌ Error Edit file:", error.message));
  }
}

// 4. delete file ........
const deleteFile = async (filepath) => {
  try {
    await fs.unlink(filepath);
    console.log(chalk.green(`${filepath} has been deleted!`));
  } catch (error) {
    console.log("Something went wrong! ", error.message);
  }
};

// 5. Delete Folder

const deleteFolder = async (folderpath) => {
  try {
    await fs.rm(folderpath, { recursive: true });
    console.log(chalk.green(`${folderpath} has been deleted!`));
  } catch (error) {
    console.log(chalk.red("Something went wrong! ", error.message));
  }
};

// 6. List Items .....

const listItems = async (listpath = "./") => {
  try {
    const items = await fs.readdir(listpath, { withFileTypes: true });
    return items.map((item) => {
      return {
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
        path: path.join(import.meta.dirname, item.name),
      };
    });
  } catch (error) {
    console.log(chalk.red("❌ Error While fetch :", error.message));
  }
};
async function menu() {
    console.clear()
  console.log(chalk.blue.bold("\n 📁 File system manager"));
  4;

  const options = [
    "Create Folder",
    "Create File",
    "Write to File",
    "Delete File",
    "Delete Folder",
    "List Items",
    "Exit",
  ];

  options.forEach((elem, idx) => {
    console.log(chalk.yellow(`${idx + 1}`) + chalk.white(` ${elem}`));
  });

  const ans = await rl.question(chalk.cyan("\nSelect option: "));

  switch (ans) {
    case "1":
      const folderPath = await rl.question(chalk.cyan("Folder Path: "));

      await createFolder(folderPath);
      break;

    case "2":
      const filePath = await rl.question(chalk.cyan("File Path: "));

      const initalContent = await rl.question(chalk.cyan("initial content : "));

      await createFile(filePath, initalContent);
      break;
    case "3":
      const appendfilePath = await rl.question(chalk.cyan("File Path: "));

      const appendContent = await rl.question(chalk.cyan("Content : "));

      await appendToFile(appendfilePath, `\n${appendContent}`);
      break;
    case "4":
      const deleteFilepath = await rl.question(chalk.cyan("File to delete: "));

      await deleteFile(deleteFilepath);
      break;
    case "5":
      const deleteFolderepath = await rl.question(
        chalk.cyan("Folder to delete: ")
      );

      await deleteFolder(deleteFolderepath);
      break;

    case "6":
      const listPath = await rl.question(
        chalk.cyan("Folder path(Enter for current): ")
      );

      const items = await listItems(listPath || "./");
      console.log(chalk.blue("\nContents: "));

      items.forEach((item) => {
        const icon = item.type === "folder" ? "📁" : "📂";
        console.log(`${icon} ${chalk.yellow(item.name)}`);
      });
      break;
    case "7":
      rl.close();
      return;

      default : 
      console.log(chalk.red("⚠️  Invaild Option"));
      
  }

  await rl.question(chalk.gray('\n Press Enter to Continue ...'))
  menu()
}
menu();
