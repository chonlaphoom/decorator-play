var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const store = [];
function Queue(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // Call the original method
            const result = yield originalMethod.apply(this, args);
            console.log(`Method ${propertyKey} has completed.`);
            return result;
        });
    };
    return descriptor;
}
function queue() {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            store.push(() => originalMethod.apply(this, args));
            return;
        };
    };
}
class Foo {
    constructor(name) {
        this.name = name;
        this.rand = "120";
    }
    getName(b) {
        return new Promise((resolve) => {
            resolve(this.name);
        });
    }
    setName(name) {
        this.name = name;
    }
}
__decorate([
    Queue
], Foo.prototype, "getName", null);
const a = new Foo("some name");
a.getName(true);
//# sourceMappingURL=consumer.js.map