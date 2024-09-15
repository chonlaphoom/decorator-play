
const store: any[] = [];

function Queue(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
        console.log(`this`, this, args)
        console.log(`Method ${propertyKey} has been added to the queue.`);
        // Logic to queue the method can go here

        // Call the original method
        const result = await originalMethod.apply(this, args);
        console.log(`Method ${propertyKey} has completed.`);
        return result;
    };

    return descriptor;
}

function queue() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            //const result = originalMethod.apply(this, args);
            store.push(() => originalMethod.apply(this, args));
            return;
        };
    };
}

class User {
    constructor(public name: string){}

    @Queue
    getName(b: boolean):Promise<string> {
        console.log('called', b)
        return new Promise((resolve) => {
            resolve(this.name);
        })
    }

    setName(name:string): void{
        this.name = name;
    }

    a: string = "120";
}


const a = new User('ohm');
a.getName(true);






