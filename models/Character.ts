import {Unique} from './Unique';
class Character extends Unique {
    inventory: Array<any>;
    location: String;
    constructor(name:String)
    {
        super();
        this.name = name;
        this.inventory = [];
        this.location = "startLocation";
    }

    private moveTo(location){
        console.log("Moving To " + location);
    }
}
