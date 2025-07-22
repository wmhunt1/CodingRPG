export class item {
    name: string;
    quantity: number;
    constructor() {
        this.name = ""
        this.quantity = 1;
    }
}
export class equipable extends item {
    constructor(name:string) {
        super()
        this.name = name;
    }
}
export class weapon extends equipable {
    power: number;
    constructor(name:string,power:number) {
        super(name)
        this.name = name;
        this.power = power;
        this.quantity = 1;
        
    }
}