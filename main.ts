var constant = {
    defaultPlayerName: "player",
    startLocation: "startLocation",
    commands: {
        'help': {
            desc: 'Print this help menu'
        },
        'north': {
            desc: 'Go to the specified direction',
            alternatives: ['south', 'east', 'west', 'north', 'up', 'down']
        },
        'inventory': {
            desc: 'Print inventory',
            alternatives: ['inv']
        },
        'look': {
            desc: 'Give description of the room you\'re in',
            alternatives: ['info']
        },
        'open': {
            desc: 'Try to open the object',
            alternatives: ['unlock'],
            extra: '[object]'
        },
        'attack': {
            desc: 'Try to kill the enemy',
            alternatives: ['kill'],
            extra: '[enemy]'
        },
        'put': {
            desc: 'Put an object',
            alternatives: ['place', 'keep', 'fix', 'pour'],
            extra: '[object]'
        },
        'take': {
            desc: 'Take an object',
            alternatives: ['pick', 'fill'],
            extra: '[object]'
        },
        'clear': {
            desc: 'Clear the screen of game text'
        },
        'make': {
            desc: 'Make object if the materials are present',
            alternatives: ['craft', 'build'],
            extra: '[object]'
        },
        'reset': {
            desc: 'Start game from beginning again',
            alternatives: ['redo', 'reboot', 'restart']
        },
        'ls': {
            desc: 'Combination of inventory and look'
        },
        'save': {
            desc: 'Create a checkpoint that can be loaded later',
            extra: '[tag]'
        },
        'load': {
            desc: 'Load a checkpoint that has been saved',
            extra: '[tag]'
        },
    }
}

class Command {

    verb: String;
    object: String;
    constructor() {

    }

    public isValid()
    {

    }

    public get() {
        var str = ( < HTMLInputElement > document.getElementById('command')).value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        if(!this.isValid())
        {
            this.verb = '';
            this.object = '';
        }
        (<HTMLInputElement>document.getElementById('command')).value = "";
    }
}

class Unique {
    public id: String;
    public name: String;
    public desc: String;
}
class Box extends Unique {
    public material: String;
    public locked: boolean;
    public unlocksWith: any;
    public contents: Array < any > ;

}

class Character extends Unique {
    inventory: Array < any > ;
    location: String;
    constructor(name: String) {
        super();
        this.name = name;
        this.inventory = [];
        this.location = constant.startLocation;
    }

    public moveTo(location) {
        console.log("Moving To " + location);
        this.location = location;
    }
}

class Interactable extends Unique {}


function doCommand() {
    command.get();

}

var command = new Command();
let player = new Character(constant.defaultPlayerName);
console.log(player)