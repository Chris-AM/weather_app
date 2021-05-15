const inquirer = require('inquirer');
require('colors');

//////////////////////////////////////////////////////////////////////
//
//              here comes the inquirer questions
// A question object is a hash containing question related values
//
//////////////////////////////////////////////////////////////////////

const questions = [{
        type: 'list', //shows a list
        name: 'option',
        message: 'what do you want to do?',
        choices: [{
                value: '1',
                name: `${'1.'.green} Create TODO List`
            },
            {
                value: '2',
                name: `${'2.'.green} Show TODO List`
            },
            {
                value: '3',
                name: `${'3.'.green} Show TODO Completed List`
            },
            {
                value: '4',
                name: `${'4.'.green} Show Pending TODO List`
            },
            {
                value: '5',
                name: `${'5.'.green} Check TODO List`
            },
            {
                value: '6',
                name: `${'6.'.green} Drop TODO`
            },
            {
                value: '0',
                name: `${'0.'.green} EXIT`
            }

        ]
    }

];

const pause = [{
    type: 'input',
    name: 'pauseMenu',
    message: `press ${'ENTER'.green} to continue`
}];



const inquirerMenu = async() => {

    console.clear();

    console.log("========================".rainbow);
    console.log("   Select an option".green);
    console.log("========================\n".rainbow);


    const { option } = await inquirer.prompt(questions);

    return option;
}

const inquirerPause = async() => {

    console.log('\n');
    await inquirer.prompt(pause);

}

////////////////////////////////////////////////////////
//
// I need a method to  store my task and then print it
//
///////////////////////////////////////////////////////

const inquirerReadInput = async(message) => {

    const question = [{
        type: 'input',
        name: 'description',
        message,
        ///////////////////////////////////////////
        //
        // I'm forcing the user to put an input
        //
        //////////////////////////////////////////
        validate(value) {
            if (value.length !== 0) {
                return true;
            }
            return `${'ERROR'.red.bold}, ${'you must put an input'.red}`;

        }
    }];

    const { description } = await inquirer.prompt(question);
    return description;


}

const inquirerCheckToDo = async(tasks = []) => {

    const choices = tasks.map((task, i) => {

        const index = `${i+1}.`.green;

        return {
            value: task.id,
            name: `${index} ${task.description}`,
            checked: (task.completedIn) ? true : false
        }
    })


    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select your tasks',
        choices
    }];

    const { ids } = await inquirer.prompt(question);
    return ids;

}

const inquirerDeleteList = async(tasks = []) => {

    const choices = tasks.map((task, i) => {

        const index = `${i+1}.`.green;

        return {
            value: task.id,
            name: `${index} ${task.description}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancel`
    })

    const question = [{
        type: 'list',
        name: 'id',
        message: 'Delete',
        choices
    }];

    const { id } = await inquirer.prompt(question);
    return id;

}

const inquirerDeleteConfirm = async(message) => {
    const question = [{

        type: 'confirm',
        name: 'ok',
        message

    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    inquirerReadInput,
    inquirerDeleteList,
    inquirerDeleteConfirm,
    inquirerCheckToDo
}