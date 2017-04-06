/// <reference path="js/jquery.d.ts" />
enum To {
    room = 1,
        player
}
var constants = {
    defaultPlayerName: 'player',
    startLocation: 'westRoom',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..',
    maxHP: 5,


    // ROOMS IN GAME
    games: [

        {
            roomList: {
                westRoom: {
                    shortDescription: 'west room',
                    description: 'You are in the west end of a sloping east-west passage of barren rock.',
                    interactible: ['platinumKey', 'water'],
                    exits: [{
                        direction: 'east',
                        to: 'centerRoom'
                    }],
                },
                centerRoom: {
                    shortDescription: 'center room',
                    description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above. There is a prominent trophy stand in the middle, there is no trophy on it.',
                    interactible: ['copperKey'],
                    exits: [{
                            direction: 'west',
                            to: 'westRoom'
                        },
                        {
                            direction: 'east',
                            to: 'eastRoom'
                        },
                        {
                            direction: 'north',
                            to: 'northRoom'
                        },
                        {
                            direction: 'south',
                            to: 'southRoom'
                        }
                    ],
                },
                eastRoom: {
                    shortDescription: 'east room',
                    description: 'a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
                    interactible: ['copperBox', 'scorpion'],
                    exits: [{
                        direction: 'west',
                        to: 'centerRoom'
                    }],
                },
                northRoom: {
                    shortDescription: 'north room',
                    description: 'a dimly room littered with skulls. It has an eerie quiteness about it, the sound of death',
                    interactible: ['silverBox', 'bottle'],
                    exits: [{
                        direction: 'south',
                        to: 'centerRoom'
                    },{
                        direction: 'west',
                        to: 'treasureRoom',
                        locked: 'woodenDoor',
                        description: 'You expect the door to be a mirage and resolve to walk through it, you walk headlong into the door and hit your face hard.'
                    }]
                },
                southRoom: {
                    shortDescription: 'south room',
                    description: 'a damp musty smelling room. A small window overlooks a cliff where faint sounds of waves crashing can be faintly heard.',
                    interactible: ['goldBox', 'ivoryKey'],
                    exits: [{
                        direction: 'north',
                        to: 'centerRoom'
                    }]
                },
                treasureRoom: {
                    shortDescription: 'treasure room',
                    description: 'a room filled with treasures of all kinds imaginable, there are mounds of glittering gold and shining diamonds in a huge pile',
                    interactible: [],
                    exits: [{
                        direction: 'east',
                        to: 'northRoom',
                    }]
                }

            },

            // INTERACTIBLES IN GAME
            interactible: {
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
                    description: 'A knee high box, made completely from copper. There\'s a small keyhole at the front of the box, a small engraving of a orchid underneath it',
                    take: {
                        description: 'You try to lift the box, but it is too heavy.',
                    },
                    open: {
                        description: 'Fitting the key into the box, you give it a twist. It opens with a creak.',
                        able: true,
                        content: [{
                            description: 'You find a silver key inside the box. You slip it in your pocket for later use.',
                            interactible: ['silverKey'],
                        }],
                        needs: [{
                            key: 'copperKey',
                            description: 'You try to force the lock open, but its too strong.'
                        }]
                    }
                },
                silverBox: {
                    shortDescription: 'silver box',
                    description: 'A box made out of pure silver, you can see your face off its reflection. Its apparent that it was crafted with much care.',
                    take: {
                        description: 'You try to lift the box, but it is bolted to the floor.'
                    },
                    open: {
                        description: 'Fitting the silver key into the box, you open it, anxious for its contents.',
                        able: true,
                        content: [{
                            description: 'You find a gold key inside the box, this seems like a chain of boxes, you think as you pocket the key.',
                            interactible: ['goldKey']
                        }, {
                            description: 'The silver key falls out of the keyhole, just before the box vanishes into thin air. Poof.',
                            interactible: ['silverKey'],
                            to: To.room
                        }],
                        needs: [{
                            key: 'silverKey',
                            description: 'You try to force the lock open, but it won\'t give'
                        }]
                    }
                },
                goldBox: {
                    shortDescription: 'gold box',
                    description: 'A pure gold box, it glistens with a shiny lusture. It is ornately decorated with a ring of jewels around the opening.',
                    take: {
                        description: 'You try to take the gold box, but it does not budge, you overestimate your own strength',
                    },
                    open: {
                        description: 'Fitting the key into the lock, you give it a twist. the box falls open.',
                        able:true,
                        content: [{
                            description: 'Expecting treasure you slowly open the box, you find a normal looking key inside the box. Disappointed, you pocket it.',
                            interactible: ['normalKey'],
                        }],
                        needs: [{
                            key: 'goldKey',
                            description: 'You try to hit the box repeatedly in an effort to open it, nothing happens'
                        }]
                    }
                },
                silverKey: {
                    shortDescription: 'silver key',
                    description: 'A key made out of pure silver. It glistens when you turn it in your hands. A small tulip design is embossed on it.',
                    take: {
                        description: 'You take the silver key, and place it in your pocket for later use.',
                        able: true
                    },
                },
                goldKey: {
                    shortDescription: 'gold key',
                    description: 'A key made out of pure gold. You can see the light glow from it.',
                    take: {
                        description: 'You take the gold key, and place it in your pocket for later use.',
                        able: true
                    },
                },
                normalKey: {
                    shortDescription: 'normal key',
                    description: 'A key that looks like an everyday key, there seems to be nothing special about it',
                    take: {
                        able: true,
                        description: 'You take the normal key hoping that it has a use in the future',
                    }
                },
                scorpion: {
                    shortDescription: 'scorpion',
                    description: 'A menacing scorpion with its stinger raised, poised to strike.',
                    kill: {
                        able: true,
                        removeWeakness: true,
                        health: 1,
                        weakness: [{
                            key: 'sword',
                            description: 'The scorpion strikes, you sidestep the attack and drive your sword through it. It thrashes around for sometime and finally dies.',
                            health: -1,
                            attack: -1,
                            isWeakness: true,
                            weaknessDescription: 'You take a swing at the scorpion with the sword, but the wily creature sidesteps you',
                        }],
                        loot: [{
                            description: 'From the hole in its stomach, a key falls to the floor, intrigued you take it.',
                            interactible: ['graniteKey'],
                        }],
                        loss: {
                            description: 'The scorpion strikes, you try to sidestep it and catch its tail with your bare hands, but it is faster than you and strikes you square in your heart',
                            health: -1,
                        },
                    }
                },
                sword: {
                    shortDescription: 'sword',
                    description: 'A glistening sword made with pure steel. You can see a small ruby set on its hilt.',

                },
                graniteKey: {
                    shortDescription: 'granite key',
                    description: 'A key fashioned from granite, it must have been incredibly difficult to craft.'
                },
                ivoryKey: {
                    shortDescription: 'ivory key',
                    description: 'A key carved from ivory, it must have taken a lot of time and effor to craft.',
                    take: {
                        able: true
                    }
                },
                woodenDoor: {
                    shortDescription: 'wooden door',
                    description: 'A large and impossing wooden door, with an old fashioned knocker. A keyhole is set into the wood with elegance.',
                    open: {
                        able: true,
                        description: 'You open the door lock with the normal Key, you try to push it open but it does not budge, You shove your weight on it, and it creaks and opens a bit allowing you room to pass',
                        needs: [{
                            key: 'normalKey',
                            description: 'You try to break the door open with a kick, but it is too strong and your legs hurt',
                            health: -1
                        }]
                    }
                }

            }
        }
    ],
}

var variables = {
    gameStepText: [],
    gameText: [],
    mute: false,
    thisGame: 0
}

function debug(string) {
    if (constants.debug) {
        console.log("d:", string);
    }
}

class Game {
    static savedGame = {};
    static commandHistory: Array < string > = [];
    static print(string: string) {
        if (variables.mute)
            return;
        // Save till endMarker, when endMarker comes, print it on screen
        if (constants.debug)
            debug("print: " + string);
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
        if (command.silent)
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
        if (command.silent)
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
        ( < HTMLParagraphElement > document.getElementById("health")).innerHTML = "<b>HP :</b> " + player.health + "/" + constants.maxHP;
        var enemy = Room.currentRoom().enemy();
        if (enemy)
            ( < HTMLParagraphElement > document.getElementById("enemyHealth")).innerHTML = "<b>" + enemy.name + " HP :</b> " + enemy.health + "/" + enemy.maxHealth;
        else
            ( < HTMLParagraphElement > document.getElementById("enemyHealth")).innerHTML = "";

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
    if (has(array, element)) {
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
            alternatives: ['ex', 'describe', 'desc'],
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
            execute: (command: Command) => {
                player.open(command.object);
            }
        },
        'kill': {
            desc: 'Try to kill the enemy',
            alternatives: ['attack'],
            extra: '[enemy]',
            missedExtra: 'Please specify what to attack',
            execute: (command: Command) => {
                player.kill(command.object);
            }
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
        for (var key in Command.commands) {
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
    public name: string;
}

// Super of take, open, make classes
class Interaction extends Unique{
    description: string;
    able: boolean;
    needs: Array < Reward > ;
    noremove: boolean;
    canString: string;
    constructor(interactionObject, name) {
        super();
        this.name = name;
        this.noremove = false;
        this.able = false;
        this.canString = 'cannot ';
        this.needs = [];
        this.description = 'You ' + this.canString + 'interact with ' + name;
        if (interactionObject) {
            if (interactionObject.description)
                this.description = interactionObject.description;
            if (interactionObject.able)
                this.able = interactionObject.able;
            if (interactionObject.noremove)
                this.noremove = interactionObject.noremove;
            if (interactionObject.needs) {
                for (var x of interactionObject.needs)
                    this.needs.push(new Reward(x));
            }
        }
        this.canString = this.able ? '' : 'cannot ';
    }



    public satisfiedAll() {
        for (var reward of this.needs)
            if (!reward.satisfied()) {
                reward.giveReward();
                return false;
            }
        return true;
    }

    public satisfiedOne() {
        for (var reward of this.needs)
            if (reward.satisfied()) {
                return reward;
            }
        return false;
    }

    public removeRequirements() {
        for (var reward of this.needs)
            reward.remove();
    }
}

class Take extends Interaction {
    amount: number;
    constructor(takeObject, name: string) {
        super(takeObject, name);
        this.amount = 1;
        this.description = 'You ' + this.canString + 'pick up ' + name;
        if (takeObject) {
            if (takeObject.description)
                this.description = takeObject.description;
            if (takeObject.amount)
                this.amount = takeObject.amount;
        }
    }

    public takeOne() {
        this.amount -= 1;
    }

    public moreThanOne() {
        return this.amount > 1;
    }

    public take(inRoom: string) {
        if (this.moreThanOne()) {
            this.takeOne();
        } else if (this.noremove) {
            // Don't remove item ever on take
        } else {
            var room: Room = Room.currentRoom();
            room.remove(inRoom);
        }
        Game.print(this.description);
        player.addToInventory(inRoom);
    }
}

class Open extends Interaction {
    content: Array < Reward > ;
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'open ' + name;
        this.content = [];
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;

            if (openObject.content)
                for (var x of openObject.content)
                    this.content.push(new Reward(x));
        }
    }

    public getContent() {
        for (var reward of this.content) {
            reward.giveReward();
        }
    }


    public open(inRoom: string) {
        if (this.noremove) {
            // Don't remove item ever on open
        } else {
            var room: Room = Room.currentRoom();
            room.remove(inRoom);
            this.removeRequirements();
        }
        Game.print(this.description);
        this.getContent();
    }

    public openDoor(exit: Exit) {
        exit.unlock();
        this.removeRequirements();
        Game.print(this.description);
    }
}

class Kill extends Interaction {
    loot: Array < Reward > ;
    removeWeakness: boolean;
    health: number;
    maxHealth: number;
    weakness: Array < Weakness > ;
    loss: Reward;
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'kill ' + name;
        this.loot = [];
        this.removeWeakness = false;
        this.health = 1;
        this.health = 1;
        this.weakness = [];
        this.loss = new Reward({});
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;

            if (openObject.removeWeakness)
                this.removeWeakness = openObject.removeWeakness;

            if (openObject.loss)
                this.loss = new Reward(openObject.loss);

            if (openObject.health) {
                this.health = openObject.health;
                this.maxHealth = openObject.health;
            }

            if (openObject.loot)
                for (var x of openObject.loot)
                    this.loot.push(new Reward(x));

            if (openObject.weakness)
                for (var x of openObject.weakness)
                    this.weakness.push(new Weakness(x));
        }
    }

    public getLoot() {
        for (var reward of this.loot) {
            reward.giveReward();
        }
    }

    public updateHealth(health: number, identifier: string) {
        this.health += health;
        if (this.health <= 0) {
            Game.print('You defeated the ' + this.name);
            this.getLoot();
            Room.currentRoom().remove(identifier);
        }
    }

    public kill(inRoom: string) {
        var room: Room = Room.currentRoom();
        for (var x of this.weakness) {
            if (x.canUse()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        for (var x of this.weakness) {
            if (x.has()) {
                x.exploitWeakness(inRoom);
                return;
            }
        }
        this.loss.giveReward();
    }
}


class Reward {
    public key: string;
    public to: To;
    public room: string;
    public description;
    public interactible: Array < string > ;
    public health: number;
    constructor(rewardObject) {
        if (rewardObject.key)
            this.key = rewardObject.key;

        if (rewardObject.room)
            this.room = rewardObject.room;

        if (rewardObject.description)
            this.description = rewardObject.description;

        if (rewardObject.interactible)
            this.interactible = rewardObject.interactible;
        else
            this.interactible = [];

        if (rewardObject.to != undefined)
            this.to = rewardObject.to;
        else
            this.to = To.player;

        if (rewardObject.health)
            this.health = rewardObject.health;
        else
            this.health = 0;
    }

    public remove() {
        player.removeFromInventory(this.key);
    }
    public satisfied() {
        if (!this.key && !this.room)
            return true;
        return player.has(this.key) || Room.currentRoom().is(this.room);
    }

    public giveReward() {
        Game.print(this.description);
        for (var x of this.interactible)
            if (this.to == To.player)
                player.addToInventory(x);
            else
                Room.currentRoom().add(x);
        player.updateHealth(this.health);
    }
}

class Weakness extends Reward {
    public isWeakness: boolean;
    public attack: number;
    public weaknessDescription: string;
    constructor(weaknessObject) {
        super(weaknessObject);
        this.isWeakness = true;
        this.attack = 1;
        this.weaknessDescription = 'The same trick won\' work twice';

        if (weaknessObject.isWeakness)
            this.isWeakness = weaknessObject.isWeakness;

        if (weaknessObject.attack)
            this.attack = weaknessObject.attack;

        if (weaknessObject.weaknessDescription)
            this.weaknessDescription = weaknessObject.weaknessDescription;
    }

    public has() {
        return player.has(this.key);
    }

    public canUse() {
        return player.has(this.key) && this.isWeakness;
    }

    public exploitWeakness(identifier: string) {
        // TODO complete this
        var enemy: Interactible = Interactible.findOne(identifier);
        if (this.canUse()) {
            Game.print(this.description);
            enemy.kill.updateHealth(this.attack, identifier);
            if (enemy.kill.removeWeakness) {
                this.isWeakness = false;
            }
        } else {
            Game.print(this.weaknessDescription);
            player.updateHealth(this.health);
        }
    }
}

class Interactible extends Unique{
    public shortDescription: string;
    public description: string;
    public take: Take;
    public open: Open;
    public kill: Kill;
    // public amount;
    static interactibleListObject = JSON.parse(JSON.stringify(constants.games[variables.thisGame].interactible));
    static interactibleList = {};

    static reset() {
        // TODO use jquery to remove this hack
        for (var key in Interactible.interactibleListObject) {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.name = key;
            insertInter.description = inter.description;
            insertInter.shortDescription = inter.shortDescription;
            insertInter.take = new Take(inter.take, inter.shortDescription);
            insertInter.open = new Open(inter.open, inter.shortDescription);
            insertInter.kill = new Kill(inter.kill, inter.shortDescription);

            Interactible.interactibleList[key] = (insertInter);
        }
    }

    public takeable() {
        return this.take && this.take.able;
    }


    public openable() {
        return this.open && this.open.able;
    }

    public killable() {
        return this.kill && this.kill.able;
    }

    public is(identifier: string) {
        return this.name == identifier || has(this.shortDescription, identifier);
    }

    static findKey(identifier: string) {
        if (identifier in Interactible.interactibleList) {
            return identifier;
        }
        for (var key in Interactible.interactibleList) {
            var inter = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier))
                return key;
        }
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
        this.health = constants.maxHP;
    }

    public die() {
        Game.print("You died");
        Game.print("Game Reset");
        Game.reset();
    }

    public updateHealth(health: number) {

        this.health += health;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
        if (this.health > constants.maxHP)
            this.health = constants.maxHP;

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

    public addToInventory(identifier: string) {
        var item: Interactible = Interactible.findOne(identifier);
        player.inventory.push(identifier);
        Game.print(item.shortDescription + " added to inventory.");
    }

    // Try to take the object
    public take(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier);
        if (inRoom) {
            if (player.has(inRoom)) {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible: Interactible = Interactible.findOne(inRoom);
            if (interactible.takeable()) {
                if (!interactible.take.satisfiedAll())
                    return;
                interactible.take.take(inRoom);
            } else {
                Game.print(interactible.take.description);
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    public removeFromInventory(identifier: string) {
        if (Interactible.findOne(identifier))
            remove(this.inventory, identifier);
    }

    // Try to open the object
    public open(identifier: string) {
        var inRoom:string = Room.currentRoom().has(identifier);
        var exit:Exit = Room.currentRoom().findDoorExit(identifier);
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom);
            if (interactible.openable()) {
                if (!interactible.open.satisfiedAll())
                    return;
                interactible.open.open(inRoom);
            } else {
                Game.print(interactible.open.description);
            }
        } else if (exit) {
            var door:Interactible = Room.currentRoom().findDoor(identifier);
            if(door.openable()){
                if (!door.open.satisfiedAll())
                    return;
                door.open.openDoor(exit);
            } else {
                Game.print(door.open.description);
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    // Try to kill the object
    public kill(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier);
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom);
            if (interactible.killable()) {
                if (!interactible.kill.satisfiedAll())
                    return;
                interactible.kill.kill(inRoom);
            } else {
                Game.print(interactible.kill.description);
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    public printInventory() {
        if (!this.inventoryEmpty()) {
            Game.print("You are carrying: ");
            for (var item of this.inventory) {
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
            if (item == searchItem)
                return item;
            var interactible: Interactible = Interactible.findOne(item);
            if (has(interactible.shortDescription, searchItem))
                return item;
        }
        return false;
    }

    public firstMissing(searchArray) {
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
        this.health = constants.maxHP;
        if (constants.debug) {
            this.inventory = ['normalKey', 'sword'];
            this.location = 'northRoom';
        }
    }

    public moveTo(direction: string) {
        var currentRoom: Room = Room.currentRoom();
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                if(exit.isLocked())
                {
                    Game.print(exit.description);
                    return false;
                }
                player.location = exit.to;
                return true;
            } else {
                Game.print(constants.noExit);
                return false;
            }
        } else {
            Game.print('Current location errored, please restart the game');
            return false;
        }
    }
}

class Exit {
    description: string;
    direction: string;
    to: string;
    locked: string;
    constructor(exitObject) {
        this.direction = exitObject.direction;
        this.to = exitObject.to;
        this.locked = exitObject.locked;
        
        this.description = 'The door is locked';
        if(exitObject.description)
            this.description = exitObject.description;
    }

    public isLocked() {
        return this.locked != undefined;
    }

    public towards(direction: string) {
        return this.direction == direction;
    }

    public unlock() {
        this.locked = undefined;
    }
}

class Room extends Unique {
    shortDescription: string;
    description: string;
    exits: Array < Exit > ;
    interactible: Array < string > ;


    static roomListObject = JSON.parse(JSON.stringify(constants.games[variables.thisGame].roomList));
    static roomList = {};

    static currentRoom() {
        return Room.findOne(player.location);
    }

    public enemy() {
        for (var x of this.interactible) {
            var interactible: Interactible = Interactible.findOne(x);
            if (interactible.killable())
                return interactible.kill;
        }
    }


    public remove(item: string) {
        if (item in this.interactible)
            remove(this.interactible, item);
        else {
            var interactible: string = Interactible.findKey(item);
            remove(this.interactible, interactible);
        }

    }

    public add(item: string) {
        if (Interactible.findOne(item))
            this.interactible.push(item);
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

    public findDoorExit(identifier: string){
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                if(door.is(identifier))
                    return exit;
            }
        }
    }

    public findDoor(identifier:string) {
        // Same as above, reture door instead
        for (var exit of this.exits)
        {
            if(exit.isLocked()){
                var door:Interactible = Interactible.findOne(exit.locked);
                if(door.is(identifier))
                    return door;
            }
        }
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

    public hasLock(identifier) {
        // todo find whats this supposed to be
    }

    public findExit(direction: string) {
        for (var exit of this.exits)
            if (exit.towards(direction))
                return exit;
        return null;
    }

    static reset() {
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            var thisRoom = Room.roomListObject[key];
            room.shortDescription = thisRoom.shortDescription;
            room.description = thisRoom.description;
            room.interactible = thisRoom.interactible;
            if(thisRoom.exits)
                for (var exitObject of thisRoom.exits) {
                    var exit = new Exit(exitObject);
                    room.exits.push(exit);
                }
            Room.roomList[key] = room;
        }
    }
    constructor(name: string) {
        super();
        this.name = name;
        this.exits = [];
        this.interactible = [];
    }

    public is(name: string) {
        return this.name == name || has(this.shortDescription, name);
    }

    public describe() {
        Game.print(this.shortDescription);
        Game.print(this.description);
        // print interactibles in the room
        if (this.interactible.length > 0)
            Game.print(constants.seperator);
        for (var element of this.interactible) {
            var interactible: Interactible = Interactible.findOne(element);
            if (interactible) {
                Game.print("There is " + interactible.shortDescription + " here.");
            }
        }
        // print exits
        if (this.exits != {})
            Game.print(constants.seperator);
        var exitArray = this.exits.map(x => {
            return x.direction;
        });
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString)
        } else if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString)
        }
        for (var exit of this.exits) {
            if (exit.isLocked()) {
                var lockDescription: string = "The " + exit.direction + " exit is locked";
                // TODO, add description of door here
                var door:Interactible = Interactible.findOne(exit.locked);
                if(door)
                    lockDescription+= " with "+ door.shortDescription;
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