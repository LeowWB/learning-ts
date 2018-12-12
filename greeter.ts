//ts "compiler" translates to js so any valid js code is also valid in ts
//comments are also transferred to the js output file.

class Student {
	fullName: string;

	//"public" auto-declares class-level variable
	constructor (public firstName: string, public middleInitial: string, public lastName: string) {
		this.fullName = firstName + " " + middleInitial + " " + lastName;
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






document.body.innerHTML = greeter(user);