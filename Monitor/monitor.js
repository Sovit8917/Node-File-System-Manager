import chalk from "chalk";

function monitor(){
    console.log(chalk.bgMagenta(`Monitoring...`));
    
}

setInterval(monitor,1000)
