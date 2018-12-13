//ts "compiler" translates to js so any valid js code is also valid in ts.
//comments are also transferred to the js output file.

class Student {
	
	//similar to js, class var declaration doesn't use "var" or "let".
	fullName: string;

	//"public" auto-declares class-level variable
	//note that constructor method is always named "constructor"
	constructor (public firstName: string, public middleInitial: string, public lastName: string) {
		this.fullName = firstName + " " + middleInitial + " " + lastName;
	}

	//method declaration doesn't use the "function" keyword.
	introduce(): string {
		return "My name is " + this.fullName;
	}
}

//the "extends" keyword still works similar to java
class CSStudent extends Student {

	//overriding the constructor is optional

	get_cs1101s_cap(){
		return 5.1;
	}

	introduce(): string {
		
		//you can reference "super" even without having called super() in constructor
		//of course the only time you don't call super() in constructor is when constructor doesn't exist.
		return super.introduce() + " and I'm a CS major";
	}
}

class MathStudent extends Student {

	//of course, overriding the constructor is possible
	constructor(firstName: string, middleInitial: string, lastName: string) {

		//overriding constructor MUST include super() call.
		super(firstName, middleInitial, lastName);
	}

	//can declare a default value for parameters.
	su_mod(modName: string = "MA1100") {
		return modName + " - " + "S";
	}
}

class Snake extends Student {

	//public - can be accessed by anyone.
	//protected - cannot be accessed outside the class, unless by a subclass.
	//private - cannot be accessed outside the class, not even by subclass. make no mistake,
	//			because the variable still exists in the subclasses - just that it can't be called
	//			directly.

	//note that not declaring scope will set it to public by default.
	private backstabbedCount: number;

	//quick note: constructors can also be declared protected. this means the class
	//can't be constructed but can be extended.
	constructor(firstName: string, middleInitial: string, lastName: string) {

		super(firstName, middleInitial, lastName);
		this.backstabbedCount = 0;
	}
}

class SnakeInNTU extends Student {

	private backstabbedCount: number;

	constructor (firstName: string, middleInitial: string, lastName: string) {

		super(firstName, middleInitial, lastName);
		this.backstabbedCount = 0;
	}
}


interface Person {
	firstName: string;
	lastName: string;
}

function greeter(person: Person) {
	return "Hello, " + person.firstName + " " + person.lastName;
}


//type of variable user is implicitly defined by assignment to an object of type Student
let user = new Student("Jane", "M.", "User");

//so trying to re-assign it to a value of a different type will give an error.
//the line below will give a compile error.
//user = 42;

//user is of type Student. assigning to it a value of type CSStudent, which extends Student,
//is perfectly acceptible.
user = new CSStudent("John", "N.", "Smith");


//mrSnake is declared as type Snake
let mrSnake = new Snake("Uncle", "S.", "Nake");


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
let greeting = greeter(user);

document.body.innerHTML = greeting;




class Jellyfish {
	
	//readonly variables are like const except that they can be (re)declared in the constructor
	readonly moon: boolean;

	constructor(isMoon: boolean = false) {
		this.moon = isMoon;
	}
}

class JellyfishV2 {

	//similar to "public", "readonly" declares class-level variable.
	constructor(readonly moon: boolean = false) {
	}
}

class MoonJellyfish extends JellyfishV2 {

	//although you don't have to, it's good practice to name private vars starting with underscore.
	//this also ensures that the name of the var doesn't clash with the names of the getter and setter
	//functions.
	private _bellSize: number;

	//notice that the overriding constructor can have different parameters
	constructor() {
		super(true);
	}

	//getter function
	get bellSize(): number{
		return this._bellSize;
	}

	//setter function. obviously this wouldn't exist for a readonly variable.
	set bellSize(bs: number) {
		this._bellSize = bs;
	}
}

class EarthJellyfish extends JellyfishV2 {

	//declaring static variable
	public static GRAVITATIONAL_CONSTANT = 9.81;

	public constructor(g_lost) {
		super(false);

		//"static" keyword works exactly the way you'd expect it to.
		EarthJellyfish.GRAVITATIONAL_CONSTANT -= g_lost;
	}
}

//abstract classes work as you're used to, too. key difference between abstract class and
//interface is that the former can include implementation details for its members.
abstract class CelestialJellyfish extends JellyfishV2 {

	//methods marked abstract have no implementation provided, and must be implemented in subclasses
	abstract start_intelligent_life(): string;
	
	constructor() {
		super(false);
	}

	//other methods can be implemented. overriding is optional.
	sting(): string {
		return "oof ow owie";
	}
}

class BlackHoleJellyfish extends CelestialJellyfish {

	//if subclass has constructor, it must call super(). this isn't unique to abstract class subclasses.
	constructor() {
		super();
	}

	//overriding abstract method
	start_intelligent_life(): string {
		return "Intelligent life can't exist in a black hole jellyfish.";
	}

	consume_matter(): void {
	}
}

let cj: CelestialJellyfish;
cj = new BlackHoleJellyfish();

//the following line gives an error, as CelestialJellyfish doesn't have a consume_matter() function.
//this is in spite of the fact that the value stored in the variable does, indeed, have such a function.
//typecasting is required (so it's not automatic like standard js)
//cj.consume_matter();

