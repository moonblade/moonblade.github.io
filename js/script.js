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
    defaultPlayerName: "player",
    startLocation: "startLocation",
    endMarker: '.',
    invalidCommand: "Invalid Command"
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
        variables.gameStepText.push(string);
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        }
    };
    Game.reset = function () {
        var boxList;
        var roomList;
    };
    Game.execute = function (command) {
        Game.print(command.toString());
        switch (command.verb) {
            case 'help':
                Command.generateHelp();
                break;
            // case 'go':
            // break;
            default:
                Game.print(constants.invalidCommand);
                break;
        }
        Game.print(constants.endMarker);
    };
    // Send the gameStep to the screen
    Game.updateGameScreen = function () {
        var gameTextDiv = document.getElementById('gameText');
        var divElement = document.createElement("div");
        for (var key in variables.gameStepText) {
            var pElement = document.createElement("p");
            pElement.textContent = variables.gameStepText[key];
            divElement.appendChild(pElement);
        }
        gameTextDiv.insertBefore(divElement, gameTextDiv.firstChild);
    };
    return Game;
}());
Game.commandList = [];
function has(array, element) {
    return array.indexOf(element) > -1;
}
var Command = (function () {
    function Command() {
        var str = document.getElementById('command').value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        // check if valid, if not valid, clear the command
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
        }
    };
    // Check if a given command is valid
    Command.prototype.isValid = function () {
        // If no command entered invalid
        if (this.verb == '')
            return false;
        for (var key in Command.commands) {
            // If command is one of direct commands, then it is valid
            if (key == this.verb) {
                // If required extra field is not given, then its not valid
                if (Command.commands[key].extra)
                    if (this.object == '')
                        return false;
                return true;
            }
            // If command is one of the alternatives, its valid
            if (Command.commands[key].alternatives)
                if (has(Command.commands[key].alternatives, this.verb)) {
                    // If required extra field is not given, then its not valid
                    if (Command.commands[key].extra)
                        if (this.object == '')
                            return false;
                    this.verb = key;
                    return true;
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
        extra: ['[direction]']
    },
    'take': {
        desc: 'Take an object',
        alternatives: ['pick', 'fill'],
        extra: '[object]'
    },
    'put': {
        desc: 'Put an object',
        alternatives: ['place', 'keep', 'fix', 'pour'],
        extra: '[object]'
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
    'make': {
        desc: 'Make object if the materials are present',
        alternatives: ['craft', 'build'],
        extra: '[object]'
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
    Box.prototype.open = function () {
    };
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
    Character.prototype.has = function (searchItem) {
        for (var _i = 0, _a = this.inventory; _i < _a.length; _i++) {
            var item = _a[_i];
            has(item, searchItem);
            return true;
        }
        return false;
    };
    Character.prototype.moveTo = function (location) {
        console.log("Moving To " + location);
        this.location = location;
    };
    return Character;
}(Unique));
var Room = (function (_super) {
    __extends(Room, _super);
    function Room(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        return _this;
    }
    return Room;
}(Unique));
function doCommand() {
    var command = new Command();
    Game.execute(command);
}
var player = new Character(constants.defaultPlayerName);
// console.log(player) 
