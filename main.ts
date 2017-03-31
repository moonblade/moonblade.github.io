var constants = {
    defaultPlayerName : "player",
    startLocation:"startLocation"
}

class Unique{
    public id:String;
    public name:String;
    public desc:String;
}
class Box extends Unique{
    public material: String;
    public locked: boolean;
    public unlocksWith: any;
    public contents: Array<any>;

}

class Character extends Unique {
    inventory: Array<any>;
    location: String;
    constructor(name:String)
    {
        super();
        this.name = name;
        this.inventory = [];
        this.location = constants.startLocation;
    }

    public moveTo(location){
        console.log("Moving To " + location);
        this.location = location;
    }
}

class Interactable extends Unique{
}

let player = new Character(constants.defaultPlayerName);
console.log(player)
console.log("here");