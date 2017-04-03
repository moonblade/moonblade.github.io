/// <reference path="js/jquery.d.ts" />
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a ']
}

var variables = {
    gameStepText: [],
    gameText: [],
    mute: false
}

function debug(string) {
    if (constants.debug) {
        console.log(string);
    }
}

class Game {
    static savedGame = {};
    static commandHistory: Array < string > = [];
    // static commandHistory:Array<Command> = [];
    static print(string: string) {
        if (variables.mute)
            return;
        // Save till endMarker, when endMarker comes, print it on screen
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        } else {
            variables.gameStepText.push(string);
        }
    }

    static printBold(string: string) {
        Game.print("<b>" + string + "</b>");
    }

    static save(command: Command) {
        // TODO remove this hack, use jQuery and do it properly
        Game.savedGame[command.object] = JSON.parse(JSON.stringify(Game.commandHistory));
        Game.print("Game saved")
    }

    static load(command: Command) {
        if (command.object in Game.savedGame) {
            Game.reset();
            Game.clear();
            variables.mute = true;
            // TODO load game
            for (let com of Game.savedGame[command.object]) {
                // Execute each of those commands
                Game.execute(new Command(com));
            }
            variables.mute = false;
            Game.print("Game loaded");
        } else {
            if (Object.keys(Game.savedGame).length > 0) {
                Game.print("No such save game exists");
                Game.print("Saved Games are :");
                for (var key in Game.savedGame) {
                    Game.print(key);
                }
            } else {
                Game.print("No save games present");
            }

        }
    }

    static reset() {
        player.reset();
        Room.reset();
        Game.commandHistory = [];
    }

    static clear() {
        var gameTextDiv = ( < HTMLElement > document.getElementById('gameText'));
        gameTextDiv.innerHTML = "<p></p>";
    }

    static execute(command: Command) {
        Game.printBold(command.toString());
        if (!command.noSave) {
            Game.commandHistory.push(command.toString());
            debug(Game.commandHistory);
        }
        if (!command.checkValidity()) {
            if (command.missedExtra)
                Game.print(command.missedExtra);
            else
                Game.print(constants.invalidCommand);
        } else 
            command.execute();
        Game.print(constants.endMarker);
        Game.checkEasterEgg();
        Game.updateInventory();
    }

    static checkEasterEgg() {
        var easterEggSize = constants.easterEgg.length;
        var easterEggString = JSON.stringify(constants.easterEgg);
        var lastCommandsString = JSON.stringify(Game.commandHistory.slice(-easterEggSize));
        if (easterEggString == lastCommandsString) {
            debug("EASTER EGG FOUND");
            // TODO add an interactible here
        }
    }

    static updateInventory() {
        ( < HTMLParagraphElement > document.getElementById("inventory")).innerHTML = "Inventory : " + player.toStringInventory();
    }

    // Send the gameStep to the screen
    static updateGameScreen() {
        var gameTextDiv = ( < HTMLElement > document.getElementById('gameText'))
        var pElement = document.createElement("pre");
        // Browser compatible pre element word wrap
        pElement.style.display = "table";
        pElement.style.whiteSpace = "pre-wrap";
        pElement.style.whiteSpace = "-pre-wrap";
        pElement.style.whiteSpace = "-o-pre-wrap";
        pElement.style.whiteSpace = "-moz-pre-wrap";
        pElement.style.wordWrap = "break-word";
        for (var key in variables.gameStepText) {
            pElement.innerHTML += variables.gameStepText[key] + "\n";
        }
        gameTextDiv.insertBefore(pElement, gameTextDiv.firstChild);

    }
}

// Can be used to check if element present in array, or substring present in string 
// second one is kind of hack
// TODO remove hack and do properly
function has(array, element) {
    return array && array.indexOf(element) > -1;
}

class Command {
    static commands = {
        'inventory': {
            desc: 'Print inventory',
            alternatives: ['inv'],
            execute: (command: Command) => {
                player.printInventory();
            }
        },
        'look': {
            desc: 'Give description of the room you\'re in',
            alternatives: ['info'],
            execute: (command: Command) => {
                Room.roomList[player.location].describe();
            }
        },
        'go': {
            desc: 'Go to the specified direction',
            alternatives: ['move', 'walk'],
            extraDescription: '\tYou can also use north, east, south, west, up, down, n, e, s, w as well',
            extra: ['[direction]'],
            shortcut: {
                'north': ['go', 'north'],
                'n': ['go', 'north'],
                'south': ['go', 'south'],
                's': ['go', 'south'],
                'east': ['go', 'east'],
                'e': ['go', 'east'],
                'west': ['go', 'west'],
                'w': ['go', 'west'],
                'up': ['go', 'up'],
                'down': ['go', 'down'],
            },
            missedExtra: 'Please specify direction to go',
            execute: (command: Command) => {
                if (player.moveTo(command.object))
                    Room.roomList[player.location].describe();

            }
        },
        'take': {
            desc: 'Take an object',
            alternatives: ['pick', 'fill'],
            extra: '[object]',
            missedExtra: 'Please specify what to take',
        },
        'put': {
            desc: 'Put an object',
            alternatives: ['place', 'keep', 'fix', 'pour'],
            extra: '[object]',
            missedExtra: 'Please specify what to put',
        },
        'open': {
            desc: 'Try to open the object',
            alternatives: ['unlock'],
            extra: '[object]',
            missedExtra: 'Please specify what to open',
        },
        'attack': {
            desc: 'Try to kill the enemy',
            alternatives: ['kill'],
            extra: '[enemy]',
            missedExtra: 'Please specify what to attack',
        },
        'make': {
            desc: 'Make object if the materials are present',
            alternatives: ['craft', 'build'],
            extra: '[object]',
            missedExtra: 'Please specify what to make',
        },
        'ls': {
            desc: 'Combination of inventory and look',
            execute: (command: Command) => {
                player.printInventory();
                Game.print('..');
                Room.roomList[player.location].describe();

            }
        },
        'save': {
            desc: 'Create a checkpoint that can be loaded later',
            extra: '[tag]',
            defaultExtra: 'saveGame',
            noSave: true,
            missedExtra: 'Please specify tag to save under',
            execute: (command: Command) => {
                Game.save(command);
            }
        },
        'load': {
            desc: 'Load a checkpoint that has been saved',
            extra: '[tag]',
            noSave: true,
            defaultExtra: 'saveGame',
            missedExtra: 'Please specify tag to load from',
            execute: (command: Command) => {
                Game.load(command);
            }
        },
        'reset': {
            desc: 'Start game from beginning again',
            alternatives: ['redo', 'reboot', 'restart'],
            execute: (command: Command) => {
                Game.reset();
                Game.print('Game reset');
            }
        },
        'clear': {
            desc: 'Clear the screen of game text',
            execute: (command: Command) => {
                Game.clear();
            }
        },
        'help': {
            desc: 'Print this help menu',
            execute: (command: Command) => {
                Command.generateHelp();
            }
        },
    }
    verb: string;
    object: string;
    missedExtra: string;
    defaultExtra: string;
    noSave: boolean;
    execute;
    constructor(str ? : string) {
        if (!str)
            var str = ( < HTMLInputElement > document.getElementById('command')).value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        // if given as input, take that
        // Check Validity
        this.checkValidity();
        // Clear the command
        ( < HTMLInputElement > document.getElementById('command')).value = "";
    }


    public toString() {
        return this.verb + " " + this.object;
    }

    static generateHelp() {
        Game.print("The following commands are available");
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            var helpText = key + extra;
            if (command.alternatives) {
                for (let alternative of command.alternatives)
                    helpText += "/ " + alternative + extra;
            }
            Game.print(helpText + " : " + command.desc);
            if (command.extraDescription)
                Game.print(command.extraDescription);
        }
    }

    // Check if a given command is valid
    public checkValidity() {
        // If no command entered invalid
        if (this.verb == '')
            return false;
        for (var key in Command.commands) {
            var com = Command.commands[key];
            // If shortcut, replace with actual command
            if (com.shortcut) {
                for (var dkey in com.shortcut) {
                    if (this.verb == dkey) {
                        this.verb = com.shortcut[dkey][0];
                        this.object = com.shortcut[dkey][1];
                    }
                }
            }
            // If command is one of direct commands, then it is valid
            // If command is one of the alternatives, its valid
            if (key == this.verb || has(com.alternatives, this.verb)) {
                // If required extra field is not given, then its not valid
                this.verb = key;
                this.noSave = com.noSave;
                this.execute = () => {
                    com.execute(this);
                }
                if (com.extra)
                    if (this.object == '') {
                        this.missedExtra = com.missedExtra;
                        this.defaultExtra = com.defaultExtra;
                        if (this.defaultExtra) {
                            this.object = this.defaultExtra;
                            return true;
                        }
                        return false;
                    }
                return true;
            }
        }
        return false;
    }
}

class Unique {
    static ids = [];
    public id: string;
    public name: string;
    public desc: string;
}

class Interactible {
    public shortDescription: string;
    public description: string;
    public take;
    static interactibleListObject = {
        platinumKey: {
            shortDescription: 'platinum key',
            description: 'The key is made out of solid platinum, It must have cost a lot to make. It has an intricate pattern of a rose engraved on it.',
            take: {
                description: 'You bend down and pick up the platinum key. You examine it for a second and slip it in your pocket.',
                able: true,
            },
        }
    };
    static interactibleList = {};

    static reset() {
        // TODO use jquery to remove this hack
        Interactible.interactibleList = JSON.parse(JSON.stringify(Interactible.interactibleListObject));
    }

    static findOne(identifier: string) {
        if (identifier in Interactible.interactibleList) {
            return Interactible.interactibleList[identifier];
        }
    }
}

class Character extends Unique {
    inventory: Array < any > ;
    location: string;
    constructor(name: string) {
        super();
        this.name = name;
        this.inventory = [];
        this.location = constants.startLocation;
    }

    public toStringInventory() {
        var inventoryString = "";
        for (var element of this.inventory) {
            inventoryString += element + ", ";
        }
        return inventoryString;
    }

    public inventoryEmpty() {
        return this.inventory.length < 1;
    }

    public printInventory() {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var item of this.inventory) {
                // TODO Change to description of item
                Game.print(item);
            }
        } else {
            Game.print(constants.emptyInventory);
        }

    }
    public has(searchItem: string) {
        for (let item of this.inventory) {
            has(item, searchItem)
            return true;
        }
        return false;
    }

    public reset() {
        this.location = constants.startLocation;
        this.inventory = [];
        if (constants.debug) {
            this.inventory = ['some', 'stuff', 'other', 'good']
        }
    }

    public moveTo(direction: string) {
        var currentRoom: Room = Room.findOne(this.location);
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                player.location = exit.to;
                return true;
            } else {
                Game.print(constants.noExit);
                return false;
            }
            // this.location = location;
        } else {
            Game.print('Current location errored, please restart the game');
            return false;
        }
    }
}

class Room extends Unique {
    shortDescription: string;
    description: string;
    exits = {};
    static roomListObject = {
        'westRoom': {
            shortDescription: 'west room',
            description: 'You are in the west end of a sloping east-west passage of barren rock.',
            interactible: ['platinumKey', 'water'],
            exits: {
                east: {
                    to: 'centerRoom'
                },
                up: {
                    to: 'westRoom',
                    locked: 'woodenDoor'
                },
            }
        },
        'centerRoom': {
            shortDescription: 'center room',
            description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
            interactible: ['copperKey'],
            exits: {
                west: {
                    to: 'westRoom'
                }
            },
        }
    }
    static roomList = {};

    static findOne(roomName: string) {
        if (roomName in Room.roomList) {
            return Room.roomList[roomName];
        }
        for (var key in Room.roomList) {
            if (Room.roomList[key].shortDescription == roomName) {
                return Room.roomList[key];
            }
        }
        return null;
    }

    public findExit(direction: string) {
        if (direction in this.exits) {
            return this.exits[direction];
        } else {
            return null;
        }
    }

    static reset() {
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            room.shortDescription = Room.roomListObject[key].shortDescription;
            room.description = Room.roomListObject[key].description;
            Room.roomList[key] = room;
        }
        // Make exits
        for (var key in Room.roomListObject) {
            for (var exitKey in Room.roomListObject[key].exits) {
                var exit = Room.roomListObject[key].exits[exitKey];
                var roomExit = {};
                roomExit['to'] = exit.to;
                roomExit['toRoom'] = Room.findOne(exit.to);
                roomExit['locked'] = exit.locked;
                Room.roomList[key].exits[exitKey] = roomExit;
            }
        }
    }
    constructor(name: string) {
        super();
        this.name = name;
    }

    public describe() {
        Game.print(this.shortDescription);
        Game.print(this.description);
        // print exits
        var exitArray = Object.keys(this.exits)
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString)
        }
        if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString)
        }
        for (var key in this.exits) {
            if (this.exits[key].locked) {
                var lockDescription: string = "The " + key + " exit is locked.";
                // TODO, add description of door here

                Game.print(lockDescription);
            }
        }
    }
}

function doCommand() {
    var command = new Command();
    Game.execute(command);
}

let player = new Character(constants.defaultPlayerName);
Game.reset();

// initial look command
window.onload = () => {
    var command = new Command('look');
    Game.execute(command);
    // Focus on input
    ( < HTMLInputElement > document.getElementById('command')).focus();
}