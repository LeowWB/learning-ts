//ts "compiler" translates to js so any valid js code is also valid in ts
var Student = /** @class */ (function () {
    //"public" auto-declares class-level variable
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
user = 42;
document.body.innerHTML = greeter(user);
