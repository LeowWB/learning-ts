//ts "compiler" translates to js so any valid js code is also valid in ts.
//comments are also transferred to the js output file.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Student = /** @class */ (function () {
    //"public" auto-declares class-level variable
    //note that constructor method is always named "constructor"
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    //method declaration doesn't use the "function" keyword.
    Student.prototype.introduce = function () {
        return "My name is " + this.fullName;
    };
    return Student;
}());
//the "extends" keyword still works similar to java
var CSStudent = /** @class */ (function (_super) {
    __extends(CSStudent, _super);
    function CSStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //overriding the constructor is optional
    CSStudent.prototype.get_cs1101s_cap = function () {
        return 5.1;
    };
    CSStudent.prototype.introduce = function () {
        //you can reference "super" even without having called super() in constructor
        //of course the only time you don't call super() in constructor is when constructor doesn't exist.
        return _super.prototype.introduce.call(this) + " and I'm a CS major";
    };
    return CSStudent;
}(Student));
var MathStudent = /** @class */ (function (_super) {
    __extends(MathStudent, _super);
    //of course, overriding the constructor is possible
    function MathStudent(firstName, middleInitial, lastName) {
        //overriding constructor MUST include super() call.
        return _super.call(this, firstName, middleInitial, lastName) || this;
    }
    //can declare a default value for parameters.
    MathStudent.prototype.su_mod = function (modName) {
        if (modName === void 0) { modName = "MA1100"; }
        return modName + " - " + "S";
    };
    return MathStudent;
}(Student));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    //quick note: constructors can also be declared protected. this means the class
    //can't be constructed but can be extended.
    function Snake(firstName, middleInitial, lastName) {
        var _this = _super.call(this, firstName, middleInitial, lastName) || this;
        _this.backstabbedCount = 0;
        return _this;
    }
    return Snake;
}(Student));
var SnakeInNTU = /** @class */ (function (_super) {
    __extends(SnakeInNTU, _super);
    function SnakeInNTU(firstName, middleInitial, lastName) {
        var _this = _super.call(this, firstName, middleInitial, lastName) || this;
        _this.backstabbedCount = 0;
        return _this;
    }
    return SnakeInNTU;
}(Student));
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
//type of variable user is implicitly defined by assignment to an object of type Student
var user = new Student("Jane", "M.", "User");
//so trying to re-assign it to a value of a different type will give an error.
//the line below will give a compile error.
//user = 42;
//user is of type Student. assigning to it a value of type CSStudent, which extends Student,
//is perfectly acceptible.
user = new CSStudent("John", "N.", "Smith");
//mrSnake is declared as type Snake
var mrSnake = new Snake("Uncle", "S.", "Nake");
//although SnakeInNTU and Snake are exactly the same in terms of structure and variable names and types,
//SnakeInNTU cannot be cast to Snake. this is because the private variable in SnakeInNTU does not 
//originate from an extension of the private variable in Snake.
//mrSnake = new SnakeInNTU("Auntie", "S.", "Nake");
//notice that variable "user" is of type Student, while greeter expects an argument of type Person.
//also notice that Student doesn't explicitly extend Person.
//however the line of code below doesn't give any issues or errors.
//this is because TypeScript is structurally typed. two different types are compatible iff all members
//have the same names, types, and scopes.
//of course, as mentioned earlier, private/protected variables must be dealt with separately -
//the origins of each private/protected variable (where it was first declared before it got extended)
//must be the same.
var greeting = greeter(user);
document.body.innerHTML = greeting;
var Jellyfish = /** @class */ (function () {
    function Jellyfish(isMoon) {
        if (isMoon === void 0) { isMoon = false; }
        this.moon = isMoon;
    }
    return Jellyfish;
}());
var JellyfishV2 = /** @class */ (function () {
    //similar to "public", "readonly" declares class-level variable.
    function JellyfishV2(moon) {
        if (moon === void 0) { moon = false; }
        this.moon = moon;
    }
    return JellyfishV2;
}());
var MoonJellyfish = /** @class */ (function (_super) {
    __extends(MoonJellyfish, _super);
    //notice that the overriding constructor can have different parameters
    function MoonJellyfish() {
        return _super.call(this, true) || this;
    }
    Object.defineProperty(MoonJellyfish.prototype, "bellSize", {
        //getter function
        get: function () {
            return this._bellSize;
        },
        //setter function. obviously this wouldn't exist for a readonly variable.
        set: function (bs) {
            this._bellSize = bs;
        },
        enumerable: true,
        configurable: true
    });
    return MoonJellyfish;
}(JellyfishV2));
var EarthJellyfish = /** @class */ (function (_super) {
    __extends(EarthJellyfish, _super);
    function EarthJellyfish(g_lost) {
        var _this = _super.call(this, false) || this;
        //"static" keyword works exactly the way you'd expect it to.
        EarthJellyfish.GRAVITATIONAL_CONSTANT -= g_lost;
        return _this;
    }
    //declaring static variable
    EarthJellyfish.GRAVITATIONAL_CONSTANT = 9.81;
    return EarthJellyfish;
}(JellyfishV2));
//abstract classes work as you're used to, too. key difference between abstract class and
//interface is that the former can include implementation details for its members.
var CelestialJellyfish = /** @class */ (function (_super) {
    __extends(CelestialJellyfish, _super);
    function CelestialJellyfish() {
        return _super.call(this, false) || this;
    }
    //other methods can be implemented. overriding is optional.
    CelestialJellyfish.prototype.sting = function () {
        return "oof ow owie";
    };
    return CelestialJellyfish;
}(JellyfishV2));
var BlackHoleJellyfish = /** @class */ (function (_super) {
    __extends(BlackHoleJellyfish, _super);
    //if subclass has constructor, it must call super(). this isn't unique to abstract class subclasses.
    function BlackHoleJellyfish() {
        return _super.call(this) || this;
    }
    //overriding abstract method
    BlackHoleJellyfish.prototype.start_intelligent_life = function () {
        return "Intelligent life can't exist in a black hole jellyfish.";
    };
    BlackHoleJellyfish.prototype.consume_matter = function () {
    };
    return BlackHoleJellyfish;
}(CelestialJellyfish));
var cj;
cj = new BlackHoleJellyfish();
//the following line gives an error, as CelestialJellyfish doesn't have a consume_matter() function.
//this is in spite of the fact that the value stored in the variable does, indeed, have such a function.
//typecasting is required (so it's not automatic like standard js)
//cj.consume_matter();
