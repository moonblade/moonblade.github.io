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
};
var Command = (function () {
    function Command() {
    }
    Command.prototype.isValid = function () {
    };
    Command.prototype.get = function () {
        var str = document.getElementById('command').value;
        // splits string into an array of words, taking out all whitespace
        var parts = str.split(/\s+/);
        // command is the first word in the array, which is removed from the array
        this.verb = parts.shift();
        // the rest of the words joined together.  If there are no other words, this will be an empty string
        this.object = parts.join(' ');
        if (!this.isValid()) {
            this.verb = '';
            this.object = '';
        }
        document.getElementById('command').value = "";
    };
    return Command;
}());
var Unique = (function () {
    function Unique() {
    }
    return Unique;
}());
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Box;
}(Unique));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.inventory = [];
        _this.location = constant.startLocation;
        return _this;
    }
    Character.prototype.moveTo = function (location) {
        console.log("Moving To " + location);
        this.location = location;
    };
    return Character;
}(Unique));
var Interactable = (function (_super) {
    __extends(Interactable, _super);
    function Interactable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Interactable;
}(Unique));
function doCommand() {
    command.get();
}
var command = new Command();
var player = new Character(constant.defaultPlayerName);
console.log(player);
