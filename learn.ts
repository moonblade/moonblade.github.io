class Box{
    name: String;
    desc: String;
    material: String;
    locked: boolean;
    unlocksWith: any;
    
}
class Character{
    name: String;
    inventory: Array<any>;
    location: String;
    constructor(name:String)
    {
        this.name = name;
        this.inventory = [];
        this.location = "startLocation";
    }
}


