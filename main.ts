/// <reference path="js/jquery.d.ts" />
var constants = {
    defaultPlayerName: 'player',
    endMarker: '.',
    invalidCommand: 'Invalid Command',
    emptyInventory: 'Your inventory is empty',
    noExit: 'There is no exit in that direction',
    debug: true,
    easterEgg: ['go up', 'go up', 'go down', 'go down', 'left ', 'right ', 'left ', 'right ', 'b ', 'a '],
    seperator: '..',
    maxHP: 10,


    games: [{
        startLocation: 'westRoom',
        // NAME OF GAME
        name: 'zorkish',
        // ROOMS IN GAME
        roomList: {
            westRoom: {
                shortDescription: 'west room',
                description: 'You are in the west end of a sloping east-west passage of barren rock.',
                interactible: ['platinumKey', 'water'],
                exits: [{
                    direction: 'east',
                    to: 'centerRoom',
                }],
            },
            centerRoom: {
                shortDescription: 'center room',
                description: 'You are in the very heart of the dungeon, a windowless chamber lit only by the eerie light of glowing fungi high above.',
                interactible: ['copperKey', 'trophyStand'],
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
                description: 'You arrive at a room of finished stone with high arched ceiling and soaring columns. The room has an aura of holyness to it.',
                interactible: ['copperBox', 'scorpion'],
                exits: [{
                    direction: 'west',
                    to: 'centerRoom'
                },{
                    direction: 'south',
                    to: 'cavern',
                    locked: 'stoneDoor'
                }],
            },
            cavern: {
                shortDescription: 'cavern',
                description: 'You are in a cavern, the ceiling is at least ten foot high, on the wall there is a drawing of a man hunting a dear and another roasting it.',
                interactible: ['spider', 'juttingRock'],
                exits: [{
                    direction: 'north',
                    to: 'eastRoom'
                },{
                    direction: 'down',
                    to: 'undergroundPool',
                    locked: 'greenDoor'
                }]
            },
            northRoom: {
                shortDescription: 'north room',
                description: 'You are in a dimly room littered with skulls. It has an eerie quiteness about it, the sound of death',
                interactible: ['silverBox', 'bottle'],
                exits: [{
                    direction: 'south',
                    to: 'centerRoom'
                }, {
                    direction: 'east',
                    to: 'treasureRoom',
                    locked: 'woodenDoor',
                    description: 'You expect the door to be a mirage and resolve to walk through it, you walk headlong into the door and hit your face hard.'
                }, {
                    direction: 'west',
                    to: 'cell',
                    locked: 'wroughtIronDoor',
                    description: 'You shake the grills hoping to break it down, but it doesnt budge.'
                }]
            },
            cell: {
                shortDescription: 'cell block',
                description: 'A damp cell block, with iron grills and a tiny window, It gives you the impression of extreme loneliness. A faint smell of garlics hang in the air',
                examineReward: {
                    description: 'You follow your nose to find the source of the smell, and on the windowsill you find moss growing. The smell is coming from the moss',
                    to: 'room',
                    interactible: ['garlicMoss']
                },
                interactible: ['snake'],
                exists: [{
                    direction: 'east',
                    to: 'northRoom'
                }]
            },
            southRoom: {
                shortDescription: 'south room',
                description: 'You are in a small room. No bigger than a broom closet. It smells musty.',
                interactible: ['goldBox', 'dryBox'],
                exits: [{
                    direction: 'north',
                    to: 'centerRoom'
                }, {
                    direction: 'west',
                    to: 'burningRoom',
                    locked: 'marbleDoor'
                }]
            },
            treasureRoom: {
                shortDescription: 'treasure room',
                description: 'You are in a room filled with treasures of all kinds imaginable, there are mounds of glittering gold and shining diamonds in a huge pile',
                interactible: ['platinumBox', 'decayingBox', 'goldCoin'],
                exits: [{
                    direction: 'west',
                    to: 'northRoom',
                }]
            },
            burningRoom: {
                shortDescription: 'burning room',
                description: 'You are in a room with granite slabs for floors and ceiling, the room is really hot, you can barely stand on the floor',
                interactible: ['fire', 'metalClub'],
                exits: [{
                    direction: 'east',
                    to: 'southRoom'
                }]
            },
            undergroundPool: {
                shortDescription: 'dark cave',
                description: 'You are in a dark cave, in the flickering light of the flame you see a pool of water, the ceiling is covered with bats. You see two glowing red eyes looking directly at you',
                interactible: ['vampire'],
                exits: [{
                    direction: 'up',
                    to: 'cavern',
                    hidden: true,
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
                        noremove: true,
                        description: 'You try to cup the water in your hands, but its not very effective. You realize that you need some kind of container to store water.',
                    }],
                },
                put: {
                    description: 'You pour the water out',
                    dissipate: true,
                    candidates: [{
                        key: 'fire',
                        attack: true
                    },{
                        key: 'redGlowingBox',
                        attack: true
                    }]
                }
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
                        description: 'The silver key falls out of the keyhole.',
                        interactible: ['silverKey'],
                        to: 'room'
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
                    description: 'Fitting the key into the lock, you give it a twist. ',
                    able: true,
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
            platinumBox: {
                shortDescription: 'platinum box',
                description: 'A box that looks to be made from platinum, on closer inspection it is a wooden box coated in a platinum finish.',
                take: {
                    description: 'You try to take the box, but its too slippery',
                },
                open: {
                    description: 'You open the platinum box with its key.',
                    able: true,
                    content: [{
                        description: 'Peering inside, you see a sparkle, excited you grab it. Its the hilt of a marvellous sword. You take the sword out of the box',
                        interactible: ['sword']
                    }],
                    needs: [{
                        key: 'platinumKey',
                        description: 'You try to pry open the box, but it does not give.'
                    }]
                }
            },
            decayingBox: {
                shortDescription: 'decaying box',
                description: 'A wooden box that is almost crumbling due to rot, You can\'t even find the lock on it. It might contain something',
                take: {
                    description: 'You try to lift the box, a rotting splinter pierces your hand.',
                    able: false,
                    loss: {
                        health: -1
                    }
                },
                open: {
                    description: 'You smash the box with the club.',
                    able: true,
                    needs: [{
                        key: 'metalClub',
                        noremove: true,
                        description: 'You try to pry open the box, a rotting splinter pierces your hand',
                        health: -1
                    }],
                    content: [{
                        description: 'The box breaks into rotting pieces of wood',
                        interactible: ['wood'],
                        to: 'room'
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
                put: {
                    able: true,
                    candidates: [{
                        key: 'fire',
                        description: 'You drop the silver key into the fire.',
                        interactible: ['liquidSilver'],
                        to: 'room'
                    }]
                }
            },
            liquidSilver: {
                shortDescription: 'liquid silver',
                description: 'Silver melted with heat of the fire, its in a puddle on the ground',
                take: {
                    description: 'You try to take the molten liquid in your hands, Your hands get burned off',
                    loss: {
                        health: -2
                    }
                }
            },
            silverSword: {
                shortDescription: 'silver sword',
                description: 'Silver coated sword, made by coating your sword with a layer of liquid silver.',
                take: {
                    able: true,
                },
                make: {
                    description: 'You coat the liquid on the blade of your sword, making it near invincible',
                    able: true,
                    needs: [{
                        key: 'sword',
                        description: 'You need to have sword to coat it and make silver sword',
                    }, {
                        key: 'liquidSilver',
                        to: 'room',
                        description: 'You cant make silver sword without coating silver, You need the silver to be in coatable form'
                    }],
                }
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
            metalClub: {
                shortDescription: 'metal club',
                description: 'A club made of metal. It does not look very strong, could be used to break something.',
                take: {
                    able: true,
                    description: 'You pick up the metal club and keep it with you.',
                }
            },
            scorpion: {
                shortDescription: 'scorpion',
                description: 'A menacing scorpion with its stinger raised, poised to strike.',
                take: {
                    description: 'You try to coax the scorpion into your hand. It jumps into your hand, and stings you',
                    loss: {
                        health: -2
                    }
                },
                kill: {
                    able: true,
                    removeWeakness: true,
                    health: 1,
                    weakness: [{
                        key: 'sword',
                        description: 'The scorpion strikes, you sidestep the attack and drive your sword through it. It thrashes around for sometime and finally dies.',
                        health: -2,
                        attack: -1,
                        isWeakness: true,
                        weaknessDescription: 'You take a swing at the scorpion with the sword, but the wily creature jerks away and stings you',
                    }],
                    loot: [{
                        description: 'From the hole in its stomach, a key falls to the floor, intrigued you take it.',
                        interactible: ['graniteKey'],
                    },{
                        interactible: ['scorpionCarcass'],
                        to: 'room'
                    }],
                    loss: {
                        description: 'The scorpion strikes, you try to avoid it and catch its tail with your bare hands, but it is faster than you and stings you square in your heart',
                        health: -2,
                    },
                }
            },
            vampire: {
                shortDescription: 'vampire',
                description: 'With a black cloak hiding a muscular body, a pale face wearing a menacing grin, he is truly a being to invoke terror',
                take: {
                    description: 'You tried to take the vampire into your hands, He looks at you with hunger and bites you.',
                    loss: {
                        health: -7
                    }
                },
                kill: {
                    able: true,
                    health: 8,
                    removeWeakness: true,
                    weakness: [{
                        key: 'holyWater',
                        description: 'You spray the holy water on his face, blinding him momentarily and burning his skin off',
                        attack: -2,
                        health: -8,
                        noremove: false,
                        weaknessDescription: 'You throw the holy water on his face, quick as lightning, he maneuvers out of the way. He snaps your neck.'
                    },{
                        key: 'garlicMoss',
                        description: 'You toss the moss smelling of garlic in the general direction of the vampire, the smells wafts into the room. He is visibly distressed by it, breaking into a fit of coughing and sneezing with watery eyes',
                        attack: -1,
                        health: -8,
                        noremove: false,
                        weaknessDescription: 'You toss the moss onto his face, but he catches it with a polythene bag and sets it aside as if it were nothing. He gets closer and bites you.'
                    },{
                        key: 'stake',
                        description: 'Taking the stake with both hands, you thrust it into the heart of the vampire, He screams and falls down. He tries to take the stake out, burning his hands in the process.',
                        attack: -1,
                        health: -8,
                        noremove: false,
                        weaknessDescription: 'You throw the stake hoping to impale him with it, but it does nothing but bounce harmlessly off of him.',
                    },{
                        key: 'silverSword',
                        description: 'Taking the sword in both hands, you swing it at his head, It strikes him on the neck. He gets burned and screms in agony.',
                        attack: -3,
                        health: -8,
                        weaknessDescription: 'You thrust the sword aiming for his stomach, he deftly steps aside and comes at you from the side. He snaps you neck in half',
                    },{
                        key: 'sword',
                        isWeakness: false,
                        weaknessDescription: 'You thrust the sword into his heart, He laughs mocking you, takes the sword and stabs you back',
                        health: -9,
                    },{
                        key: 'cross',
                        description: 'You take out the cross and show it in the direction of the monster, he cowers in terror of the holy object',
                        weaknessDescription: 'You try to make him stay using the cross, but he seems unperterbed by it now, he comes at you full tilt and pummels you till you collapse',
                        health: -8,
                        noremove: false,
                        attack: -1
                    }],
                    loss: {
                        description: 'You walk up to the vampire, hoping to intimidate him to death, but it does not work, he takes a bite out of you instead.',
                        health: -8
                    },
                    loot: [{
                        description: 'You defeat the vampire disintegrating him into dust, the trophy he was holding in his coat falls to the floor',
                        to: 'room',
                        interactible: ['trophy']
                    }]
                }
            },
            trophy: {
                shortDescription: 'trophy',
                description: 'A shining golden trophy that would go well on a mantle or trophy stand',
                take: {
                    able: true,
                    description: 'You take the trophy, to return it to its rightful place'
                }
            },
            spider: {
                shortDescription: 'huge spider',
                description: 'A behemoth of a spider, It covers the entire room. completely covered in hair, its eight eyes track you through the cavern',
                take: {
                    description: 'You try to take a spider bigger than you. It sits on top of you and crushes you',
                    loss: {
                        health: -3
                    }
                },
                kill: {
                    able: true,
                    removeWeakness: true,
                    health: 3,
                    weakness: [{
                        key: 'sword',
                        isWeakness: false,
                        health: -3,
                        attack: -1,
                        description: 'The spider jumps at you, and with a thrust you insert the sword into its belly, It wriggles in pain and thrashes away.',
                        weaknessDescription: 'You swipe at the spider with your sword, but it quickly jumps away, and catches you in its webbing. You cut through the webbing and get away, but not before getting bitten',
                    },{
                        key: 'metalClub',
                        isWeakness: true,
                        description: 'The spider approaches you, but you were ready with the club, You smack it right on its head mid jump. It gets knocked back. Dazed.',
                        health: -3,
                        attack: -1,
                        weaknessDescription: 'The spider approaches you again, You swing at it with the club, but the spider anticipated the attack and evades it. It crushes you with its legs.'
                    },{
                        key: 'fire',
                        isWeakness: true,
                        attack: -2,
                        health: -3,
                        description: 'The spider shoots its web at you, but you burn it away with fire. You set fire to the spider, the hair on it quickly catches fire and burns it to a crisp.',
                        weaknessDescription: 'You push the fire towards the spider again. But the creature is afraid of it. Quiker than your eye could follow, it shoots a web as distraction and binds you with another web. It bites you painfully.'
                    }],
                    loot: [{
                        description: 'From inside the spiders mouth. The remains of its last meal fall out. You hear a clink. Approaching it, you find an iron key',
                        interactible: ['ironKey']

                    }],
                    loss: [{
                        description: 'The spider shoots its web at you and you\'re too slow to avoid it. You wriggle free, but get bitten.',
                        health: -3
                    }]
                }
            },
            scorpionCarcass: {
                shortDescription: 'scorpion carcass',
                description: 'The carcass of the scorpion you killed, it twitches occasionally.',
                take: {
                    description: 'You try to take the carcass, the stinger of the scorpion carcass twiches unexpectedly, and stings you',
                    loss: {
                        health: -2
                    }
                },
                open: {
                    able: true,
                    description: 'You take your sword and cut open the carcass of the scorpion hoping for some answers to its ferocity, you find none'
                }
            },
            garlicMoss: {
                shortDescription: 'garlic smelling moss',
                description: 'A moss you found in cell block, that smells of garlic.',
                take: {
                    able: true,
                    description: 'You take the garlic moss, hoping to use it later'
                }
            },
            sword: {
                shortDescription: 'sword',
                description: 'A glistening sword made with pure steel. You can see a small ruby set on its hilt.',
                take: {
                    able: true,
                }
            },
            graniteKey: {
                shortDescription: 'granite key',
                description: 'A key fashioned from granite, it must have been incredibly difficult to craft.',
                take: {
                    able: true
                }
            },
            ivoryKey: {
                shortDescription: 'ivory key',
                description: 'A key carved from ivory, it must have taken a lot of time and effor to craft.',
                take: {
                    able: true
                }
            },
            emeraldKey: {
                shortDescription: 'emeraldKey',
                description: 'A key cut from glistening emerald, It shines under the light.',
                take: {
                    able: true
                }
            },
            ironKey: {
                shortDescription: 'iron key',
                description: 'A solid iron key, it feels heavy in your hand, there is a lotus insignia on one side of it.',
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
                        description: 'You try to break the door open with a kick, but it is too strong and your legs hurt.',
                        health: -1
                    }]
                }
            },
            stoneDoor: {
                shortDescription: 'stone door',
                description: 'A large stone door made with a single block of stone. It is carved from top to bottom with hard to discern patterns.',
                open: {
                    able: true,
                    description: 'Fitting the rock cut key into a hidden section of the door, it slides aside revealing a new path',
                    needs: [{
                        key: 'rockKey',
                        description: 'You try to shove the door with your shoulder. Stone vs shoulder, stone wins',
                    }]
                }
            },
            wroughtIronDoor: {
                shortDescription: 'iron grills',
                description: 'Iron grills like that found outside cell blocks, completely impenetrable.',
                open: {
                    able: true,
                    description: 'You try to insert the key, but the keyhole is a fake one. You look around and find a suspicious hole, you try the key in it, and it twists open.',
                    needs: [{
                        key: 'ironKey',
                        description: 'You try to break the door open with a flying shove with your shoulder. You hurt your shoulder badly.',
                        health: -1
                    }]
                }
            },
            greenDoor: {
                shortDescription: 'green door',
                description: 'A green glowing door. Circular in shape, it looks to be made from some kind of stone. "Pay your respects with yellow", an incription on it says.',
                open: {
                    able: true,
                    description: 'You rotate the door till you find a keyhole and insert the key into it. A single coin slot appears. You insert your coin into the slot. The door dissolves into a green puddle',
                    needs: [{
                        key: 'emeraldKey',
                        description: 'You rotate the door and see a keyhole, you rotate the door some more hoping to see a hinge that you could lever around. You find nothing',
                    },{
                        key: 'goldCoin',
                        description: 'You rotate the door to find a keyhole and insert the key into it. A single slot appears, You dont have anything to put in it. The door rotates back to its previous state, but your foot gets jammed in the way',
                        health: -1
                    }]
                }
            },
            marbleDoor: {
                shortDescription: 'marble door',
                description: 'A door made from marble stone, Impossibly large. It blends perfectly with the surrounding walls, making it seem invisible',
                open: {
                    able: true,
                    description: 'The key is sucked into the keylock as soon as it is inserted, the door silently slides into the wall leaving no trace of it ever exiting.',
                    needs: [{
                        key: 'graniteKey',
                        description: 'You try to shove the door out of the way, but it must be really heavy',
                    }]
                }
            },
            fire: {
                shortDescription: 'fire',
                description: 'A burning fire, taller than you. It emits of waves of heat making it really hard to go near it.',
                open: {
                    description: 'You try to open up the fire, You realise mid action, that it was a stupid move. You get burned in the process',
                    loss: {
                        health: -1
                    }
                },
                take: {
                    description: 'You put one end of the piece of wood in the fire, it immediately blazes into a flame.',
                    able: true,
                    noremove: true,
                    needs: [{
                        key: 'wood',
                        description: 'You try to take the fire by cupping it in your hands, an admittedly stupid move, your hands get burned',
                        health: -2,
                    }],
                },
                kill: {
                    able: true,
                    health: 1,
                    hide: true,
                    weakness: [{
                        key: 'water',
                        description: 'You pour the water over the fire, it sizzles and finally dies.',
                        health: -2,
                        attack: -1,
                        noremove: false
                    }, {
                        key: 'holyWater',
                        description: 'You pour the water over the fire, it sizzles and finally dies.',
                        health: -2,
                        attack: -1,
                        noremove: false
                    }],
                    loot: [{
                        description: 'Inside the dying embers of the fire, you see a red glowing box.',
                        interactible: ['redGlowingBox'],
                        to: 'room',
                    }],
                    loss: {
                        description: 'You try to stomp out the tall column of flame with your feet. You get massive burns on your feet.',
                        health: -2,
                    },
                }
            },
            wood: {
                shortDescription: 'wood piece',
                description: 'A very dry piece of wood',
                take: {
                    description: 'You take some of the wood hoping it will be useful later',
                    able: true,
                    amount: 4,
                }
            },
            stake: {
                shortDescription: 'wooden stake',
                description: 'A stake made by sharpening wood into a point, could be useful as a weapon',
                alternatives: ['wood stake', 'stake'],
                take: {
                    able: true,
                },
                open: {
                    able: true,
                    description: 'You try to open the stake, you apply force and it breaks as a result.',
                    needs: [{
                        key: 'stake',
                        description: 'You need a stake to open it',
                    }],
                },
                make: {
                    description: 'Using your sword, you chip at the end of the wood piece till it is sharpened to a point.',
                    able: true,
                    needs: [{
                        key: 'wood',
                        description: 'You realise that you dont have anything that can be made into a stake with you',
                    }, {
                        key: 'sword',
                        description: 'You dont have anything to sharpen the wood with',
                        noremove: true
                    }],
                }
            },
            rope: {
                shortDescription: 'rope',
                description: 'A rope made from strips of snakeskin.',
                alternatives: ['string', 'twine'],
                take: {
                    able: true,
                },
                make: {
                    description: 'You cut the snakeskin into narrow strips and weave it into a rope',
                    able: true,
                    needs: [{
                        key: 'snakeSkin',
                        description: 'You dont have anything that could be fashioned into a rope',
                    }, {
                        key: 'sword',
                        description: 'You need something to cut the snake skin with to make it into a rope'
                    }]
                }
            },
            ladder: {
                shortDescription: 'rope ladder',
                description: 'A makeshift ladder made using wood pieces tied together with rope',
                alternatives: ['stairs', 'stair'],
                take: {
                    able: true
                },
                make: {
                    description: 'You use the wood pieces and the rope to assemble a makeshift rope ladder',
                    able: true,
                    needs: [{
                        key: 'wood',
                        description: 'You need something to make the ladder out of.'
                    },{
                        key: 'rope',
                        description: 'You need something to tie the wood pieces to make a rope ladder'
                    }]
                },
                put:{
                    able: true,
                    candidates: [{
                        key: 'greenDoor'
                    },{
                        key: 'juttingRock',
                        description: 'You tie the rope ladder on the jutting rock and drop it down into the hole',
                        exit: {
                            room: 'darkCave',
                            direction: 'up'
                        }
                    }]
                }
            },
            snake: {
                shortDescription: 'snake',
                description: 'A snake poised to strike, with a low threatening hiss, it warns you of coming closer. It looks like it has had a recent meal.',
                take: {
                    description: 'You try to grab the tail of the snake, but it slithers away and strikes you instead',
                    loss:{
                        health: -4,
                    }
                },
                open: {
                    description: 'You try to open the snake with your hands, but the snake, wary, slithers out of your hands and bites your leg.',
                    loss:{
                        health: -3
                    }
                },
                kill: {
                    able: true,
                    health: 4,
                    removeWeakness: true,
                    weakness: [{
                        key: 'sword',
                        description: 'The snake slithers towards you, You cut at its head with your sword. Bleeding profusely, it retreats.',
                        attack: -2,
                        health: -4,
                        isWeakness: true,
                        weaknessDescription: 'You try to swing the sword at it again, but it suddenly lies flat on the ground, making you miss. It proceeds to bite you on the ankle.',
                    },{
                        key: 'metalClub',
                        description: 'The snake raises its head to strike, you whack it upside the head with the club, leaving it disoriented. One more whack to the head finishes the job',
                        attack: -2,
                        health: -4,
                        isWeakness: true,
                        weaknessDescription: 'You swing the club like a bat aiming for its head, but it ducks, and strikes you on your arm.',
                    }],
                    loss: {
                        description: 'You try to wrestle the snake into submission, but it fails miserably and you get bitten',
                        health: -4
                    },
                    loot: [{
                        interactible: ['snakeCarcass'],
                        to: 'room'
                    }]
                }
            },
            snakeCarcass: {
                shortDescription: 'snake carcass',
                description: 'carcass of the snake you killed. Reminder of the battle you waged.',
                take: {
                    description: 'You try to take the snake carcass, but you were careless. The fang of the snake carcass strikes on your arm.',
                    loss:{
                        health: -4,
                    }
                },
                open: {
                    description: 'You cut open the snake lengthwise, skin it, and cut it open in th middle.',
                    able: true,
                    needs: [{
                        key: 'sword',
                        description: 'You need something to cut open the carcass'
                    }],
                    content: [{
                        description: 'You find a glowing emerald key in its belly.',
                        interactible: ['emeraldKey']
                    },{
                        interactible: ['snakeSkin'],
                        to: 'room'
                    }]
                }
            },
            snakeSkin: {
                shortDescription: 'snake skin',
                description: 'The skin of the snake you defeated, thrown away after investigating its insides',
                take: {
                    able: true
                },
                open:{
                    description: 'You cut up the snake skin trying to open it further, you find nothing',
                    loss: {
                        to: 'room',
                        key: 'snakeSkin'
                    }
                }
            },
            cross: {
                shortDescription: 'wooden cross',
                description: 'A cross made from wood, maybe it could be used as a religious artifact',
                alternatives: ['holy cross','woodcross', 'wood cross', 'wooden cross'],
                take: {
                    able: true,
                },
                make: {
                    description: 'You break the piece of wood into two, and tie the pieces together with a piece of rope making a cross',
                    able: true,
                    needs: [{
                        key: 'wood',
                        description: 'You dont have any material to make a cross',
                    }, {
                        key: 'sword',
                        description: 'You dont have anything to cut the wood piece to make a cross',
                        noremove: true
                    }, {
                        key: 'rope',
                        description: 'You need something to tie the wood pieces with',
                        noremove: true
                    }]
                }
            },
            holyWater: {
                shortDescription: 'holy water',
                description: 'Holy water, glowing lightly, its power is palpable ',
                alternatives: ['holywater', 'holy'],
                open: {
                    description: 'Seriously? You\'re trying to open water, did you stop to maybe think about it?'
                },
                make: {
                    description: 'You imbue the holyness of the room into the water using the cross. The water starts glowing lightly',
                    able: true,
                    needs: [{
                        key: 'water',
                        description: 'You dont have anything that can be converted to holy water',
                    }, {
                        room: 'eastRoom',
                        description: 'You try to make holy water, but there is not enough holyness to imbue into the water',
                    }, {
                        key: 'cross',
                        description: 'You try to make holy water, but you dont have anything to direct the holyness of the room to the water',
                    }]
                },
                put: {
                    description: 'You pour the holy water out',
                    dissipate: true,
                    candidates: [{
                        key: 'fire',
                        attack: true,
                    },{
                        key: 'redGlowingBox',
                        attack: true
                    }]
                }
            },
            trophyStand: {
                shortDescription: 'trophy stand',
                description: 'An imposing trophy stand, there seems to be no trophy on it.',
                take: {
                    description: 'It is part of the room.'
                },
                open: {
                    description: 'It is completely solid.'
                },
            },
            juttingRock: {
                shortDescription: 'jutting rock piece',
                description: 'A piece of rock seems to extend from the cave right over the green door. ',
                take: {
                    description: 'It is part of the cave'
                },
                open: {
                    description: 'You cant open part of the cave'
                }
            },
            redGlowingBox: {
                shortDescription: 'red glowing box',
                description: 'A red hot glowing box, standing near it, you feel the heat radiating from it. A faint sizzling can be heard',
                take: {
                    description: 'You try to take the hot box with your bare hands, they get burned badly.',
                    loss: {
                        health: -2
                    }
                },
                open: {
                    description: 'You try to pry open the red hot glowing box, as soon as you touch it, your hands burn and peel away.',
                    loss: {
                        health: -2
                    }
                },
                kill: {
                    able: true,
                    hide: true,
                    loss: {
                        description: 'You try to cool the box by stomping it with your feet. You sustain heavy burns on your feet.',
                        health: -2
                    },
                    weakness: [{
                        key: 'water',
                        description: 'You pour water on the red hot box, it sizzles and cools down',
                        attack: -1,
                        noremove: false
                    }, {
                        key: 'holyWater',
                        description: 'You pour water on the red hot box, it sizzles and cools down',
                        attack: -1,
                        noremove: false,
                    }],
                    loot: [{
                        description: 'The box cools down to reveal a metallic box.',
                        interactible: ['metalBox'],
                        to: 'room'
                    }]
                }
            },
            metalBox: {
                shortDescription: 'metal box',
                description: 'A box made of some metal, it was red hot some time ago and some heat is left. The lock mechanism has an intricate carving on of an elephant raising its tusk on it.',
                take: {
                    description: 'You try to take the box, but you underestimated the weight of the metal box. You break your back',
                    loss: {
                        health: -1
                    }
                },
                open: {
                    description: 'You open the metal box with your key, the inside of it seems empty.',
                    able: true,
                    needs: [{
                        key: 'ivoryKey',
                        description: 'You try to pry open the lock with your fingers, but its too strong'
                    }],
                    content: [{
                        description: 'On closer inspection you find a stone cut key in a corner of the box',
                        interactible: ['rockKey']
                    }]
                }
            },
            rockKey: {
                shortDescription: 'rock cut key',
                description: 'A rough key that seems to be made from a piece of rock. Its shoddy workmanship is clear in your hands.',
                take: {
                    able: true
                },

            },
            goldCoin: {
                shortDescription: 'gold coins',
                description: 'Some gold coins that look shiny and inviting, it could be used to pay for something.',
                take:{
                    able: true,
                    description: 'You wet your hands with holy water and take the coins, they dont harm you any more.',
                    needs: [{
                        key: 'holyWater',
                        description: 'You take some coins in you hand, You suddenly feel weak. The coins were cursed.',
                        health: -6
                    }],
                }
            },
            dryBox: {
                shortDescription: 'ivory box',
                description: 'A box carved from ivory, it is small in size, but it looks extremely dried out.',
                take: {
                    description: 'You take the box carefully, without moving it about too much',
                    able: true
                },
                open: {
                    description: 'In the presence of moisture, the box is sturdier. You open the box gingerly, taking care not to jerk around too much, lest it break',
                    able: true,
                    needs: [{
                        room: 'westRoom',
                        description: 'You try to open the door, but it crumbles to dust in front of you',
                    }],
                    loss: {
                        to: 'room',
                        key: 'dryBox'
                    },
                    content: [{
                        description: 'Inside the box you find an ornately carved ivory key',
                        interactible: ['ivoryKey']
                    }]
                }
            },
            
        }
    }, ],
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
            console.log("print: " + string);
        if (string == constants.endMarker) {
            variables.gameText = variables.gameStepText.concat(variables.gameText);
            Game.updateGameScreen();
            variables.gameStepText = [];
        } else {
            variables.gameStepText.push(string);
        }
    }

    static currentGame() {
        return constants.games[variables.thisGame];
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
            execute: (command: Command) => {
                player.put(command.object);
            }
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
            execute: (command: Command) => {
                player.make(command.object);
            }
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
class Interaction extends Unique {
    description: string;
    able: boolean;
    needs: Array < Reward > ;
    progress: number;
    noremove: boolean;
    canString: string;
    loss: Reward;
    content: Array < Reward > ;


    constructor(interactionObject, name) {
        super();
        this.name = name;
        this.noremove = false;
        this.able = false;
        this.canString = 'cannot ';
        this.needs = [];
        this.progress = 0;
        this.description = 'You ' + this.canString + 'interact with ' + name;
        this.loss = new Reward({});
        this.content = [];
        if (interactionObject) {
            if (interactionObject.description)
                this.description = interactionObject.description;
            if (interactionObject.able)
                this.able = interactionObject.able;
            if (interactionObject.noremove)
                this.noremove = interactionObject.noremove;

            if (interactionObject.progress)
                this.progress = interactionObject.progress;

            if (interactionObject.loss)
                this.loss = new Reward(interactionObject.loss);

            if (interactionObject.needs)
                for (var x of interactionObject.needs)
                    this.needs.push(new Reward(x));

            if (interactionObject.content)
                for (var x of interactionObject.content)
                    this.content.push(new Reward(x));

            if (interactionObject.loot)
                for (var x of interactionObject.loot)
                    this.content.push(new Reward(x));

        }
        this.canString = this.able ? '' : 'cannot ';
    }

    public takeLoss() {
        this.loss.giveReward();
        this.loss.remove();
    }

    public loseIfNotAble() {
        if (this.loss && !this.able)
            this.takeLoss();
    }

    public getContent() {
        for (var reward of this.content) {
            reward.giveReward();
        }
    }

    public satisfiedAll(silentWithoutReward ? : boolean) {
        for (var reward of this.needs)
            if (!reward.satisfied()) {
                if (!silentWithoutReward)
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
        this.removeRequirements();
        Game.print(this.description);
        player.addToInventory(inRoom);
    }
}

class Open extends Interaction {
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'open ' + name;
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;
        }
    }

    public open(inRoom: string) {
        if (this.noremove) {
            // Don't remove item ever on open
        } else {
            var room: Room = Room.currentRoom();
            room.remove(inRoom);
        }
        this.removeRequirements();
        Game.print(this.description);
        // Apply loss if not able
        this.getContent();
    }

    public openDoor(exit: Exit) {
        exit.unlock();
        this.removeRequirements();
        Game.print(this.description);
    }
}

class Kill extends Interaction {
    removeWeakness: boolean;
    health: number;
    maxHealth: number;
    weakness: Array < Weakness > ;
    hide: boolean;
    constructor(openObject, name) {
        super(openObject, name);
        this.description = 'You ' + this.canString + 'kill ' + name;
        this.removeWeakness = false;
        this.health = 1;
        this.hide = false;
        this.maxHealth = 1;
        this.weakness = [];
        if (openObject) {
            if (openObject.description)
                this.description = openObject.description;

            if (openObject.removeWeakness)
                this.removeWeakness = openObject.removeWeakness;

            if (openObject.hide)
                this.hide = openObject.hide;

            if (openObject.health) {
                this.health = openObject.health;
                this.maxHealth = openObject.health;
            }

            if (openObject.weakness)
                for (var x of openObject.weakness)
                    this.weakness.push(new Weakness(x));
        }
    }

    public getLoot() {
        this.getContent();
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
        // TODO , check if remove requirement is needed
        this.takeLoss();
    }
}

class Make extends Interaction {
    public constructor(makeObject, name) {
        super(makeObject, name);
        this.description = 'You ' + this.canString + 'make ' + name;
        if (makeObject) {
            if (makeObject.description)
                this.description = makeObject.description;
        }
    }

    public make(makeObject: string) {
        this.removeRequirements();
        Game.print(this.description);
        player.addToInventory(makeObject);
    }
}


class Put extends Interaction {
    candidates: Array < Candidate > ;
    dissipate: boolean;
    public constructor(putObject, name) {
        super(putObject, name);
        this.able = true;
        this.dissipate = false;
        this.canString = this.able ? '' : 'cannot ';
        this.description = 'You ' + this.canString + 'throw away ' + name;
        this.candidates = [];
        if (putObject) {
            if ('able' in putObject)
                this.able = putObject.able;
            if ('dissipate' in putObject)
                this.dissipate = putObject.dissipate;
            this.canString = this.able ? '' : 'cannot ';
            this.description = 'You ' + this.canString + 'throw away ' + name;
            if (putObject.description)
                this.description = putObject.description;
            if (putObject.candidates)
                for (var candidateObject of putObject.candidates)
                    this.candidates.push(new Candidate(candidateObject));
        }
    }

    public put(withPlayer: string) {
        for (var candidate of this.candidates) {
            debug(candidate)
            if (candidate.satisfied()) {
                candidate.giveReward();
                return;
            }
        }
        player.removeFromInventory(withPlayer);
        Game.print(this.description);
        if (!this.dissipate) {
            Room.currentRoom().add(withPlayer);
        }


    }
}

class Reward {
    public key: string;
    public to: string;
    public room: string;
    public description;
    public interactible: Array < string > ;
    public health: number;
    public execute;
    public noremove: boolean;
    constructor(rewardObject) {
        this.health = 0;
        this.noremove = false;
        this.to = 'player';
        this.interactible = [];

        if (rewardObject) {
            if (rewardObject.key)
                this.key = rewardObject.key;

            if (rewardObject.room)
                this.room = rewardObject.room;

            if (rewardObject.description)
                this.description = rewardObject.description;

            if (rewardObject.noremove)
                this.noremove = rewardObject.noremove;

            if (rewardObject.interactible)
                this.interactible = rewardObject.interactible;

            if (rewardObject.to)
                this.to = rewardObject.to;

            if (rewardObject.execute)
                this.execute = rewardObject.execute;

            if (rewardObject.health)
                this.health = rewardObject.health;
        }
    }

    public remove() {
        if (this.noremove)
            return;
        if (!this.key)
            return;
        switch (this.to) {
            case 'player':
                player.removeFromInventory(this.key);
                break;
            case 'room':
                Room.currentRoom().remove(this.key);
                break;
        }
    }
    public satisfied() {
        return ((!this.key && !this.room) ||
            (player.has(this.key) && this.to == 'player') ||
            (Room.currentRoom().has(this.key) && this.to == 'room') ||
            Room.currentRoom().is(this.room));
    }

    public giveReward() {
        if (this.description)
            Game.print(this.description);
        for (var x of this.interactible)
            switch (this.to) {
                case 'player':
                    player.addToInventory(x);
                    break;
                case 'room':
                    Room.currentRoom().add(x);
                    break;
            }
        if (this.execute)
            this.execute();
        player.updateHealth(this.health);
    }
}
class FindExit {
    public room: string;
    public direction: string;
    constructor(exitObject) {
        this.room = '';
        this.direction = '';
        if (exitObject) {
            if (exitObject.room)
                this.room = exitObject.room;
            if (exitObject.direction)
                this.direction = exitObject.direction;
        }
    }

    public unhide() {
        var room: Room = Room.findOne(this.room);
        if (room) {
            var exit = room.findExit(this.direction, true);
            if (exit)
                exit.unhide();
        }
    }

}

class Candidate extends Reward {
    public attack: boolean;
    public exit: FindExit;
    constructor(candidateObject) {
        super(candidateObject);
        this.attack = false;
        this.to = 'room';
        if (candidateObject) {
            if (candidateObject.attack)
                this.attack = candidateObject.attack;
            if (candidateObject.exit)
                this.exit = new FindExit(candidateObject.exit);
            if (candidateObject.to)
                this.to = candidateObject.to;
        }
    }

    public giveReward() {
        if (this.attack && this.key)
            player.kill(this.key);
        else if (this.exit)
        {
            this.exit.unhide();
        }
        else
            super.giveReward();
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
        this.noremove = true;
        this.weaknessDescription = 'The same trick won\' work twice';

        if ('isWeakness' in weaknessObject)
            this.isWeakness = weaknessObject.isWeakness;

        if ('noremove' in weaknessObject)
            this.noremove = weaknessObject.noremove;

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
            this.remove();
        } else {
            Game.print(this.weaknessDescription);
            player.updateHealth(this.health);
        }
    }
}

class Interactible extends Unique {
    public shortDescription: string;
    public description: string;
    public examineReward: Reward;
    public alternatives: Array < string > ;
    public take: Take;
    public open: Open;
    public kill: Kill;
    public make: Make;
    public put: Put;
    // public amount;
    static interactibleListObject = {};
    static interactibleList = {};

    constructor() {
        super();
        this.shortDescription = this.name;
        this.description = this.shortDescription;
        this.examineReward = new Reward({});
    }

    static reset() {
        // TODO use jquery to remove this hack
        Interactible.interactibleListObject = JSON.parse(JSON.stringify(Game.currentGame().interactible));
        for (var key in Interactible.interactibleListObject) {
            var inter = Interactible.interactibleListObject[key];
            var insertInter = new Interactible();
            insertInter.name = key;

            if (inter.shortDescription)
                insertInter.shortDescription = inter.shortDescription;

            if (inter.description)
                insertInter.description = inter.description;

            if (inter.alternatives)
                insertInter.alternatives = inter.alternatives;

            if (inter.examineReward)
                insertInter.examineReward = new Reward(inter.examineReward);

            insertInter.take = new Take(inter.take, inter.shortDescription);
            insertInter.open = new Open(inter.open, inter.shortDescription);
            insertInter.kill = new Kill(inter.kill, inter.shortDescription);
            insertInter.make = new Make(inter.make, inter.shortDescription);
            insertInter.put = new Put(inter.put, inter.shortDescription);

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

    public makeable() {
        return this.make && this.make.able;
    }

    public putable() {
        return this.put && this.put.able;
    }

    public giveExamineReward() {
        if (this.examineReward)
            this.examineReward.giveReward();
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

    static findOne(identifier: string, type ? : string) {
        if (identifier in Interactible.interactibleList) {
            var inter: Interactible = Interactible.interactibleList[identifier];
            return inter;
        }
        if (type) {
            for (var key in Interactible.interactibleList) {
                var inter: Interactible = Interactible.interactibleList[key];
                if (has(inter.shortDescription, identifier) || has(key, identifier) || has(inter.alternatives, identifier)) {
                    if (inter[type])
                        if (inter[type].satisfiedAll(true))
                            return inter;
                }
            }
        }
        for (var key in Interactible.interactibleList) {
            var inter: Interactible = Interactible.interactibleList[key];
            if (has(inter.shortDescription, identifier) || has(key, identifier) || has(inter.alternatives, identifier)) {
                return inter;
            }
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
        this.location = Game.currentGame().startLocation;
        this.health = constants.maxHP;
    }

    public die() {
        Game.print("You died");
        Game.print("Game Reset");
        Game.reset();
    }

    public updateHealth(health: number) {

        this.health += health;
        if (health != 0) {
            var log: string = health < 0 ? 'lose ' : 'gain ';
            var logHealth: number = health < 0 ? -health : health;
            Game.print('You ' + log + logHealth + ' health.')
        }
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
        var interactible:Interactible;
        if (inRoom){
            interactible = Interactible.findOne(inRoom);
            Game.print(interactible.description);
            interactible.giveExamineReward();
            return;
        }
        else if (withPlayer){
            interactible = Interactible.findOne(withPlayer);
            Game.print(interactible.description);
            interactible.giveExamineReward();
            return;
        }
        else{
            var room:Room;
            if(identifier=='room')
            {
                room = Room.currentRoom();
            }else{
                room = Room.findOne(identifier);
            }
            if(room){
                Game.print(room.shortDescription);
                Game.print(room.description);
                room.giveExamineReward();
            }
            else{
                Game.print("No " + identifier + " found");
            }
        }
    }

    public addToInventory(identifier: string) {
        var item: Interactible = Interactible.findOne(identifier);
        if(!player.has(identifier)){
            player.inventory.push(identifier);
            Game.print(item.shortDescription + " added to inventory.");
        }else{
            Game.print("You already have "+ identifier);
        }
    }

    // Try to take the object
    public take(identifier: string) {
        var inRoom = Room.currentRoom().has(identifier, 'take');
        if (inRoom) {
            if (player.has(inRoom)) {
                Game.print("You already have " + identifier);
                return;
            }
            var interactible: Interactible = Interactible.findOne(inRoom, 'take');
            if (interactible.takeable()) {
                if (!interactible.take.satisfiedAll()){
                    interactible.take.takeLoss();
                    return;
                }
                interactible.take.take(inRoom);
            } else {
                Game.print(interactible.take.description);
                interactible.take.loseIfNotAble();
            }
        } else {
            Game.print("Could not find " + identifier + " here");
        }
    }

    public put(identifier: string) {
        var withPlayer = player.has(identifier);
        if (withPlayer) {
            var interactible: Interactible = Interactible.findOne(withPlayer);
            if (interactible.putable()) {
                if (!interactible.put.satisfiedAll()){
                    interactible.put.takeLoss();
                    return;
                }
                interactible.put.put(withPlayer);
            } else {
                Game.print(interactible.put.description);
                interactible.put.loseIfNotAble();
            }
        } else {
            Game.print("You don't have " + identifier + " with you.");
        }
    }

    public make(identifier: string) {
        var interactible: Interactible = Interactible.findOne(identifier, 'make');
        if (interactible) {
            if (player.has(interactible.name)) {
                Game.print("You already have " + identifier);
                return;
            }
            if (interactible.makeable()) {
                if (!interactible.make.satisfiedAll()){
                    interactible.make.takeLoss();
                    return;
                }
                interactible.make.make(interactible.name);
            } else {
                Game.print(interactible.make.description);
                interactible.make.loseIfNotAble();
            }
        } else {
            Game.print('You cannot make ' + identifier);
        }
    }


    public removeFromInventory(identifier: string) {
        if (Interactible.findOne(identifier))
            remove(this.inventory, identifier);
    }

    // Try to open the object
    public open(identifier: string) {
        var inRoom: string = Room.currentRoom().has(identifier, 'open');
        var exit: Exit = Room.currentRoom().findDoorExit(identifier);
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom, 'open');
            if (interactible.openable()) {
                if (!interactible.open.satisfiedAll()){
                    interactible.open.takeLoss();
                    return;
                }
                interactible.open.open(inRoom);
            } else {
                Game.print(interactible.open.description);
                interactible.open.loseIfNotAble();
            }
        } else if (exit) {
            var door: Interactible = Room.currentRoom().findDoor(identifier);
            if (door.openable()) {
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
        var inRoom = Room.currentRoom().has(identifier, 'kill');
        if (inRoom) {
            var interactible: Interactible = Interactible.findOne(inRoom, 'kill');
            if (interactible.killable()) {
                if (!interactible.kill.satisfiedAll())
                    return;
                interactible.kill.kill(inRoom);
            } else {
                Game.print(interactible.kill.description);
                interactible.kill.loseIfNotAble();
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
        this.location = Game.currentGame().startLocation;
        this.inventory = [];
        this.health = constants.maxHP;
        if (constants.debug) {
            // this.inventory = ['metalClub'];
            // this.location = 'treasureRoom';
        }
    }

    public moveTo(direction: string) {
        var currentRoom: Room = Room.currentRoom();
        if (currentRoom != null) {
            var exit = currentRoom.findExit(direction);
            if (exit) {
                // TODO check if locked
                if (exit.isLocked()) {
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
    hidden: boolean;
    constructor(exitObject) {
        this.direction = exitObject.direction;
        this.to = exitObject.to;
        this.hidden = false;

        this.description = 'The door is locked';
        if (exitObject.description)
            this.description = exitObject.description;
        if (exitObject.hidden)
            this.hidden = exitObject.hidden;
        if (exitObject.locked)
            this.locked = exitObject.locked;
    }

    public isLocked() {
        return this.locked != undefined;
    }

    public towards(direction: string) {
        return this.direction == direction;
    }

    public unhide() {
        this.hidden = false;
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
    examineReward: Reward;


    static roomListObject = {};
    static roomList = {};

    static currentRoom() {
        return Room.findOne(player.location);
    }

    public enemy() {
        for (var x of this.interactible) {
            var interactible: Interactible = Interactible.findOne(x);
            if (interactible.killable() && !interactible.kill.hide)
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
        if (Interactible.findOne(item) && !this.has(item))
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

    public giveExamineReward() {
        if (this.examineReward)
            this.examineReward.giveReward();
    }

    public findDoorExit(identifier: string) {
        for (var exit of this.exits) {
            if (exit.isLocked()) {
                var door: Interactible = Interactible.findOne(exit.locked);
                // Silently see if any door can be opened
                if (door.is(identifier) && door.open.satisfiedAll(true))
                    return exit;
            }
        }
        for (var exit of this.exits) {
            if (exit.isLocked()) {
                var door: Interactible = Interactible.findOne(exit.locked);
                // if not return a locked door
                if (door.is(identifier))
                    return exit;
            }
        }

    }

    public findDoor(identifier: string) {
        // Same as above, reture door instead
        for (var exit of this.exits) {
            if (exit.isLocked()) {
                var door: Interactible = Interactible.findOne(exit.locked);
                // Silently see if any door can be opened
                if (door.is(identifier) && door.open.satisfiedAll(true))
                    return door;
            }
        }
        for (var exit of this.exits) {
            if (exit.isLocked()) {
                var door: Interactible = Interactible.findOne(exit.locked);
                // if not return a locked door
                if (door.is(identifier))
                    return door;
            }
        }

    }

    public has(identifier: string, type ? : string) {
        if (type) {
            for (var element of this.interactible) {
                var interactible: Interactible = Interactible.findOne(element, type);
                if (interactible && (has(interactible.shortDescription, identifier) || identifier==interactible.name))
                    if (interactible[type] && interactible[type].satisfiedAll(true))
                        return element;
            }
        }
        for (var element of this.interactible) {
            var interactible: Interactible = Interactible.findOne(element);
            if (interactible && (has(interactible.shortDescription, identifier) || identifier==interactible.name))
                return element;
        }
        return false;
    }

    public findExit(direction: string, includeHidden ? : boolean) {
        for (var exit of this.exits)
            if (exit.towards(direction) && (!exit.hidden || includeHidden))
                return exit;
        return null;
    }

    static reset() {
        Room.roomListObject = JSON.parse(JSON.stringify(Game.currentGame().roomList));
        Room.roomList = {};
        for (var key in Room.roomListObject) {
            var room = new Room(key);
            var thisRoom = Room.roomListObject[key];
            if (thisRoom.shortDescription)
                room.shortDescription = thisRoom.shortDescription;
            if (thisRoom.description)
                room.description = thisRoom.description;
            if (thisRoom.interactible)
                room.interactible = thisRoom.interactible;
            if (thisRoom.examineReward)
                room.examineReward = new Reward(thisRoom.examineReward);
            if (thisRoom.exits)
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
        this.shortDescription = 'a room';
        this.description = 'You\'re in a room';
        this.examineReward = new Reward({});;
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
        var exitArray = [];
        for (var exit of this.exits) {
            if (!exit.hidden)
                exitArray.push(exit.direction);
        }
        var exitString = exitArray.join(', ');
        if (exitArray.length > 1) {
            Game.print("There are exits to " + exitString)
        } else if (exitArray.length == 1) {
            Game.print("There is an exit to " + exitString)
        } else if (exitArray.length == 0) {
            Game.print("There are no exits");
        }

        for (var exit of this.exits) {
            if (exit.isLocked() && !exit.hidden) {
                var lockDescription: string = "The " + exit.direction + " exit is locked";
                // TODO, add description of door here
                var door: Interactible = Interactible.findOne(exit.locked);
                if (door)
                    lockDescription += " with " + door.shortDescription;
                Game.print(lockDescription);
            }
        }
    }
}

function doCommand() {
    var command = new Command();
    Game.execute(command);
}


function changeGame(key) {
    variables.thisGame = key;
    Game.reset();
    Game.execute(new Command('clear'));
    Game.execute(new Command('look'));

    for (var gameKey in constants.games) {
        // TODO use jquery and clean up
        if (gameKey == key)
            ( < HTMLElement > document.getElementById('game' + gameKey)).setAttribute("class", "active");
        else
            ( < HTMLElement > document.getElementById('game' + gameKey)).removeAttribute("class");
    }
}
let player = new Character(constants.defaultPlayerName);

// initial set up
window.onload = () => {

    // Add games to nav bar
    var navbarTabs = ( < HTMLElement > document.getElementById('navbar-tabs'));
    for (var key in constants.games) {
        var game = constants.games[key];
        navbarTabs.innerHTML += '<li id="game' + key + '" class="" onclick="changeGame(' + key + ')"><a href="#">' + game.name + '</a></li>';
    }
    // Focus on input
    ( < HTMLElement > document.getElementById('controls')).innerHTML = Command.generateControlString();
    ( < HTMLInputElement > document.getElementById('command')).focus();
    changeGame(0);
}