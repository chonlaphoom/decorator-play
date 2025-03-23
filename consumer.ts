const store: any[] = [];

function Queue(_: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    // Call the original method
    const result = await originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} has completed.`);
    return result;
  };

  return descriptor;
}

function queue() {
  return (_: any, __: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      store.push(() => originalMethod.apply(this, args));
      return;
    };
  };
}

class Foo {
  constructor(public name: string) {}

  @Queue
  getName(_: boolean): Promise<string> {
    return new Promise((resolve) => {
      resolve(this.name);
    });
  }

  setName(name: string): void {
    this.name = name;
  }

  rand: string = "120";
}

const a = new Foo("some name");
a.getName(true);
