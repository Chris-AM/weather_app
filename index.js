const { inquirerReadInput } = require('./helpers/inquirer');


const main = async() => {

    const input = await inquirerReadInput('Hi:');
    console.log(input);

}

main();