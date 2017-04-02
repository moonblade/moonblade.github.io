var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    testCode: true,
};
var variables = {
    gameStepText: [],
    gameText: [],
};
var Game = (function () {
    function Game() {
    }
    Game.print = function (string) {
        // Save till endMarker, when endMarker comes, print it on screen
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        }
        else {
            variables.gameStepText.push(string);
        }
    };
    Game.reset = function () {
        player.reset();
        Room.reset();
    };
    Game.execute = function (command) {
        Game.print(command.toString());
        Game.commandHistory.push(command);
        if (!command.checkValidity()) {
            if (command.missedExtra)
                Game.print(command.missedExtra);
            else
                Game.print(constants.invalidCommand);
        }
        else {
            switch (command.verb) {
                case 'help':
                    Command.generateHelp();
                    break;
                case 'look':
                    Room.roomList[player.location].describe();
                    break;
                case 'go':
                    player.moveTo(command.object);
                    break;
                case 'ls':
                    player.printInventory();
                    Game.print('..');
                    Room.roomList[player.location].describe();
                    break;
                case 'inventory':
                    player.printInventory();
                    break;
                case 'reset':
                    Game.reset();
                    Game.print('Game reset');
                    break;
                default:
                    Game.print(constants.invalidCommand);
                    break;
            }
        }
        Game.print(constants.endMarker);
        Game.updateInventory();
    };
    Game.updateInventory = function () {
        document.getElementById("inventory").innerHTML = "Inventory : " + player.toStringInventory();
    };
    // Send the gameStep to the screen
    Game.updateGameScreen = function () {
        var gameTextDiv = document.getElementById('gameText');
        var divElement = document.createElement("div");
        var pElement = document.createElement("pre");
        for (var key in variables.gameStepText) {
            pElement.textContent += variables.gameStepText[key] + "\n";
            divElement.appendChild(pElement);
        }
        gameTextDiv.insertBefore(divElement, gameTextDiv.firstChild);
    };
    return Game;
}());
Game.savedCommands = {};
Game.commandHistory = [];
function has(array, element) {
    return array.indexOf(element) > -1;
}
var Command = (function () {
    function Command(verb) {
        var str = document.getElementById('command').value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        // if given as input, take that
        if (verb)
            this.verb = verb;
        // Check Validity
        this.checkValidity();
        // Clear the command
        document.getElementById('command').value = "";
    }
    Command.prototype.toString = function () {
        return this.verb + " " + this.object;
    };
    Command.generateHelp = function () {
        Game.print("The following commands are available");
        for (var key in Command.commands) {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            var helpText = key + extra;
            if (command.alternatives) {
                for (var _i = 0, _a = command.alternatives; _i < _a.length; _i++) {
                    var alternative = _a[_i];
                    helpText += "/ " + alternative + extra;
                }
            }
            Game.print(helpText + " : " + command.desc);
            if (command.extraDescription)
                Game.print(command.extraDescription);
        }
    };
    // Check if a given command is valid
    Command.prototype.checkValidity = function () {
        // If no command entered invalid
        if (this.verb == '')
            return false;
        for (var key in Command.commands) {
            // If command is one of direct commands, then it is valid
            if (key == this.verb) {
                // If required extra field is not given, then its not valid
                if (Command.commands[key].extra)
                    if (this.object == '') {
                        this.missedExtra = Command.commands[key].missedExtra;
                        return false;
                    }
                return true;
            }
            // If command is one of the alternatives, its valid
            if (Command.commands[key].alternatives)
                if (has(Command.commands[key].alternatives, this.verb)) {
                    // If required extra field is not given, then its not valid
                    if (Command.commands[key].extra)
                        if (this.object == '') {
                            this.missedExtra = Command.commands[key].missedExtra;
                            return false;
                        }
                    this.verb = key;
                    return true;
                }
            if (Command.commands[key].shortcut) {
                for (var dkey in Command.commands[key].shortcut) {
                    if (this.verb == dkey) {
                        this.verb = Command.commands[key].shortcut[dkey][0];
                        this.object = Command.commands[key].shortcut[dkey][1];
                        return true;
                    }
                }
            }
        }
        return false;
    };
    return Command;
}());
Command.commands = {
    'inventory': {
        desc: 'Print inventory',
        alternatives: ['inv']
    },
    'look': {
        desc: 'Give description of the room you\'re in',
        alternatives: ['info']
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
        desc: 'Combination of inventory and look'
    },
    'save': {
        desc: 'Create a checkpoint that can be loaded later',
        extra: '[tag]',
        missedExtra: 'Please specify tag to save under',
    },
    'load': {
        desc: 'Load a checkpoint that has been saved',
        extra: '[tag]',
        missedExtra: 'Please specify tag to load from',
    },
    'reset': {
        desc: 'Start game from beginning again',
        alternatives: ['redo', 'reboot', 'restart']
    },
    'clear': {
        desc: 'Clear the screen of game text'
    },
    'help': {
        desc: 'Print this help menu'
    },
};
var Unique = (function () {
    function Unique() {
    }
    return Unique;
}());
Unique.ids = [];
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.open = function () { };
    return Box;
}(Unique));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.inventory = [];
        _this.location = constants.startLocation;
        return _this;
    }
    Character.prototype.toStringInventory = function () {
        var inventoryString = "";
        for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
            var element = _a[_i];
            inventoryString += element + ", ";
        }
        return inventoryString;
    };
    Character.prototype.inventoryEmpty = function () {
        return this.inventory.length < 1;
    };
    Character.prototype.printInventory = function () {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
                var item = _a[_i];
                // TODO Change to description of item
                Game.print(item);
            }
        }
        else {
            Game.print(constants.emptyInventory);
        }
    };
    Character.prototype.has = function (searchItem) {
        for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
            var item = _a[_i];
            has(item, searchItem);
            return true;
        }
        return false;
    };
    Character.prototype.reset = function () {
        this.location = constants.startLocation;
        this.inventory = [];
        if (constants.testCode) {
            this.inventory = ['some', 'stuff', 'other', 'good'];
        }
    };
    Character.prototype.moveTo = function (direction) {
        var currentRoom = Room.findOne(this.location);
        if (currentRoom != null) {
            console.log(currentRoom);
            var exit = currentRoom.findExit(direction);
            if (exit) {
                player.location = exit.to;
            }
            else {
                Game.print(constants.noExit);
            }
            // this.location = location;
        }
        else {
            Game.print('Current location errored, please restart the game');
        }
    };
    return Character;
}(Unique));
var Room = (function (_super) {
    __extends(Room, _super);
    function Room(name) {
        var _this = _super.call(this) || this;
        _this.exits = {};
        _this.name = name;
        return _this;
    }
    Room.findOne = function (roomName) {
        if (roomName in Room.roomList) {
            return Room.roomList[roomName];
        }
        for (var key in Room.roomList) {
            if (Room.roomList[key].shortDescription == roomName) {
                return Room.roomList[key];
            }
        }
        return null;
    };
    Room.prototype.findExit = function (direction) {
        if (direction in this.exits) {
            return this.exits[direction];
        }
        else {
            return null;
        }
    };
    Room.reset = function () {
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
    };
    Room.prototype.describe = function () {
        Game.print(this.shortDescription);
        Game.print(this.description);
    };
    return Room;
}(Unique));
Room.roomListObject = {
    'westRoom': {
        shortDescription: 'west room',
        description: 'You are in the west end of a sloping east-west passage of barren rock.',
        interactible: {
            contents: ['platinumKey', 'water'],
        },
        exits: {
            east: {
                to: 'centerRoom'
            },
        }
    },
    'centerRoom': {
        shortDescription: 'center room',
        description: 'the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
        interactible: {
            contents: ['copperKey'],
        },
        exits: {},
    }
};
Room.roomList = {};
function doCommand() {
    var command = new Command();
    Game.execute(command);
}
var player = new Character(constants.defaultPlayerName);
Game.reset();
// initial look command
window.onload = function () {
    var command = new Command('look');
    Game.execute(command);
    // Focus on input
    document.getElementById('command').focus();
};
