/// <reference path="js/jquery.d.ts" />
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..'
}

var variables = {
    gameStepText: [],
    gameText: [],
    mute: false
}

function debug(string) {
    if (constants.debug) {
        console.log("d:", string);
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
            Game.mute();
            // TODO load game
            for (let com of Game.savedGame[command.object]) {
                // Execute each of those commands
                Game.execute(new Command(com));
            }
            Game.unmute();
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
        Interactible.reset();
        Game.commandHistory = [];
    }

    static mute() {
        variables.mute = true;
    }

    static unmute() {
        variables.mute = false;
    }

    static clear() {
        var gameTextDiv = ( < HTMLElement > document.getElementById('gameText'));
        gameTextDiv.innerHTML = "<p></p>";
    }

    static execute(command: Command) {
        if(command.silent)
            Game.mute();
        Game.printBold(command.toString());
        if (!command.noSave) {
            Game.commandHistory.push(command.toString());
        }
        if (!command.checkValidity()) {
            if (command.missedExtra)
                Game.print(command.missedExtra);
            else
                Game.print(constants.invalidCommand);
        } else
            command.execute();
        Game.print(constants.endMarker);
        if(command.silent)
            Game.unmute();
        Game.checkEasterEgg();
        Game.updateHUD();
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

    static updateHUD() {
        ( < HTMLParagraphElement > document.getElementById("inventory")).innerHTML = "<b>Inventory :</b> " + player.toStringInventory();
        ( < HTMLParagraphElement > document.getElementById("health")).innerHTML = "<b>HP :</b> " + player.health;
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
    return array && (array.indexOf(element) > -1);
}

// to remove an element from an array
function remove(array, element) {
    // remove if exist
    if(has(array, element))
    {
        var index = array.indexOf(element);
        array.splice(index, 1);        
    }
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
        'examine': {
            desc: 'Give description of the item',
            extra: '[item]',
            alternatives: ['ex'],
            missedExtra: 'Please specify what to examine',
            execute: (command: Command) => {
                player.examine(command.object);
            }
        },
        'go': {
            desc: 'Go to the specified direction',
            alternatives: ['move', 'walk'],
            extraDescription: '\tYou can also use north, east, south, west, up, down, n, e, s, w as well',
            extra: '[direction]',
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
            execute: (command: Command) => {
                player.take(command.object);
            }
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
                Game.print(constants.seperator);
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
            silent: true,
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
    silent: boolean;
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


    static generateControlString() {
        var controlString = "<b>Controls :</b> ";
        for(var key in Command.commands)
        {
            var command = Command.commands[key];
            var extra = (command.extra ? " " + command.extra : "");
            controlString += key + extra + ", ";         
        }
        return controlString;
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
                this.silent = com.silent;
                this.execute = () => {
                    if (com.execute)
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

class Take {
    description:string;
    able:boolean;
    noremove:boolean;    
    needs:Array<Reward>;
    amount:number;
    constructor(name) {
        this.able = false;
        this.noremove = false;
        this.needs = [];
        this.amount = 1;
        this.description = 'Cannot take ' + name; 
    }

    public needsArray() {
        return this.needs.map((x)=>{
            return x.key;
        });
    }

    public moreThanOne() {
        return this.amount > 1;
    }

    public takeOne() {
        this.amount -= 1;
    }

    public cannotTake(identifier) {
        for (var reward of this.needs)
        {
            if(reward.is(identifier))
            {   
                reward.giveReward();
                return;
            }
        }
    }
}

class Reward {
    public key:string;
    public description;
    public interactible:Array<string>;
    public health:number;
    constructor(rewardObject)
    {
        if(rewardObject.key)
            this.key = rewardObject.key;

        if(rewardObject.description)
            this.description = rewardObject.description;

        if(rewardObject.interactible)
            this.interactible = rewardObject.interactible;
        else
            this.interactible = [];
        
        if(rewardObject.health)
            this.health = rewardObject.health;
        else
            this.health = 0;
    }

    public is(key:string) {
        return this.key==key;
    }

    public giveReward(){
        Game.print(this.description);
        for(var x of this.interactible)
            player.addToInventory(x);
        player.changeHealth(this.health);
    }
}

class Interactible {
    public shortDescription: string;
    public description: string;
    public take:Take;
    // public amount;
    static interactibleListObject = {
        platinumKey: {
            shortDescription: 'platinum key',
            description: 'The key is made out of solid platinum, It must have cost a lot to make. It has an intricate pattern of a rose engraved on it.',
            take: {
                description: 'You bend down and pick up the platinum key. You examine it for a second and slip it in your pocket.',
                able: true,
            },
        },
        water: {
            shortDescription: 'water',
            description: 'Crystal clear water',
            take: {
                description: 'Uncapping your bottle, you scoop up some fresh water into it.',
                able: true,
                noremove: true, 
                needs: [{
                    key: 'bottle',
                    description: 'You try to cup the water in your hands, but its not very effective. You realize that you need some kind of container to store water.',
                    interactible: ['bottle']
                }],
            },
        },
        bottle: {
            shortDescription: 'bottle',
            description: 'A regular old plastic bottle.',
            take: {
                description: 'You pick up the bottle',
                able: true
            }
        },
        copperKey: {
            shortDescription: 'copper key',
            description: 'A key made of copper, it has an orchid emblem enbossed on it.',
            take: {
                description: 'You bend down and pick up the key. You keep it in the hopes of using it later',
                able: true,
            },
        },
        copperBox: {
            shortDescription: 'copper box',
            description: 'A knee high box, made completely from copper. There\'s a small keyhole at the front of the box, a picutre of an orchid underneath it',
            take: {
                description: 'You try to lift the box, but it is too heavy.'
            },
            open: {
                description: 'Fitting the key into the box, you give it a twist. It opens with a creak.',
                needs: {
                    copperKey: {
                    }
                }
            }
        }
        
    };
    static interactibleList = {};

    static reset() {
        // TODO use jquery to remove this hack
        for(var key in Interactible.interactibleListObject)
        {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.description = inter.description;
            insertInter.shortDescription = inter.shortDescription;
            insertInter.take = new Take(insertInter.shortDescription);
            if(inter.take){
                if(inter.take.description)
                    insertInter.take.description = inter.take.description;
                if(inter.take.able)
                    insertInter.take.able = inter.take.able;
                if(inter.take.noremove)
                    insertInter.take.noremove = inter.take.noremove;
                if(inter.take.needs){
                    for(var x of inter.take.needs)
                        insertInter.take.needs.push(new Reward(x));
                }
                
            }
            Interactible.interactibleList[key] = (insertInter);
        }
    }

    public takeable() {
        return this.take && this.take.able;
    }

    static findOne(identifier: string) {
        if (identifier in Interactible.interactibleList) {
            return Interactible.interactibleList[identifier];
        }
        for (var key in Interactible.interactibleList) {
            var inter = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier))
                return inter;
        }
    }
}

class Character extends Unique {
    inventory: Array < any > ;
    location: string;
    health: number;
    constructor(name: string) {
        super();
        this.name = name;
        this.inventory = [];
        this.location = constants.startLocation;
        this.health = 5;
    }

    public die() {
        Game.print("You died");
        Game.reset();
    }

    public changeHealth(health:number) {

        this.health += health;
        if(this.health<=0)
        {
            this.health = 0;
            this.die();
        }

    }

    public toStringInventory() {
        var inventoryString = "";
        for (var element of this.inventory) {
            var interactible: Interactible = Interactible.findOne(element);
            inventoryString += interactible.shortDescription + ", ";
        }
        return inventoryString;
    }

    public inventoryEmpty() {
        return this.inventory.length < 1;
    }

    public examine(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier);
        var withPlayer = player.has(identifier);
        if (inRoom)
            Game.print(Interactible.findOne(inRoom).description);
        else if (withPlayer)
            Game.print(Interactible.findOne(withPlayer).description);
        else
            Game.print("No " + identifier + " found");
    }

    public addToInventory(identifier: string){
        var item:Interactible = Interactible.findOne(identifier);
        player.inventory.push(identifier);
        Game.print(item.shortDescription + " added to inventory.");
    }

    public take(identifier: string){
        var inRoom = Room.currentRoom().has(identifier);
        if(inRoom)
        {
            if(player.has(inRoom))
            {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible:Interactible = Interactible.findOne(inRoom);
            if(interactible.takeable())
            {
                var needArray:Array<string> = interactible.take.needsArray();
                if(!player.hasAll(needArray)){
                    var notHaveIdentifier = needArray[player.firstMissing(needArray)];
                    interactible.take.cannotTake(notHaveIdentifier);
                    return;
                }
                // TODO make this oop type, don't access elements
                if(interactible.take.moreThanOne()){
                    interactible.take.takeOne();
                }
                else if (interactible.take.noremove){
                    // Don't remove item ever on take
                }
                else{
                    var room:Room = Room.currentRoom();
                    remove(room.interactible,inRoom);
                }
                player.addToInventory(inRoom);
            }
            else {
                Game.print(interactible.take.description);
            }
        }else{
            Game.print("Could not find " + identifier + " here");
        }
    }

    public printInventory() {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var item of this.inventory) {
                // TODO Change to description of item
                var interactible: Interactible = Interactible.findOne(item);
                Game.print(interactible.shortDescription);
            }
        } else {
            Game.print(constants.emptyInventory);
        }

    }

    public has(searchItem: string) {
        if (searchItem in this.inventory)
            return searchItem;
        for (let item of this.inventory) {
            var interactible: Interactible = Interactible.findOne(item);
            if (has(interactible.shortDescription, searchItem))
                return item;
        }
        return false;
    }

    public firstMissing(searchArray)
    {
        if (!searchArray || searchArray.length < 1)
            return -1;
        for (var key in searchArray) {
            if (!this.has(searchArray[key]))
                return key;
        }
        return -1;
    
    }
    
    public hasAll(searchArray) {
        return this.firstMissing(searchArray) == -1;
    }



    public reset() {
        this.location = constants.startLocation;
        this.inventory = [];
        if (constants.debug) {
            this.inventory = [];
            this.location = 'westRoom';
            // this.location = 'eastRoom';
        }
    }

    public moveTo(direction: string) {
        var currentRoom: Room = Room.currentRoom();
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
    interactible: Array < string > ;


    static roomListObject = {
        westRoom: {
            shortDescription: 'west room',
            description: 'You are in the west end of a sloping east-west passage of barren rock.',
            interactible: ['platinumKey', 'water'],
            exits: {
                east: {
                    to: 'centerRoom'
                },
            }
        },
        centerRoom: {
            shortDescription: 'center room',
            description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
            interactible: ['copperKey'],
            exits: {
                west: {
                    to: 'westRoom'
                },
                east: {
                    to: 'eastRoom'
                }
            },
        },
        eastRoom: {
            shortDescription: 'east room',
            description: 'a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
            interactible: ['copperBox', 'scorpion'],
            exits: {
                west: {
                    to: 'centerRoom'
                }
            }
        }

    }
    static roomList = {};

    static currentRoom() {
        return Room.findOne(player.location);
    }

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

    public has(identifier: string) {
        for (var element of this.interactible) {
            // Check if element is part of room, else if shortDescription in room
            if (has(element, identifier))
                return element;
            var interactible: Interactible = Interactible.findOne(element);
            if (interactible && has(interactible.shortDescription, identifier))
                return element;
        }
        return false;
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
            room.interactible = Room.roomListObject[key].interactible;
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
        // print interactibles in the room
        if(this.interactible.length > 0)
            Game.print(constants.seperator);
        for(var element of this.interactible)
        {
            var interactible:Interactible = Interactible.findOne(element);
            if(interactible){
                Game.print("There is " + interactible.shortDescription + " here.");
            }
        }
        // print exits
        if(this.exits != {})
            Game.print(constants.seperator);
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
    ( < HTMLElement > document.getElementById('controls')).innerHTML = Command.generateControlString();
    ( < HTMLInputElement > document.getElementById('command')).focus();
}