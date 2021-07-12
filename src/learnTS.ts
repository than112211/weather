// khai báo
export const name: string = 'than'
export const id: string | number = 11
export const students: string[] = ['than','nguyen']
export const mix: (string | number)[] = ['than','nguyen',1]
export const hobby: 'book' | 'cooking' = 'book'
export const person:object = {
    name: 'string'
}
// type
type StringOrNumber = string | number
type Students = {
    name: string
    id: StringOrNumber
}


const newStudent:Students = {
    name: 'than',
    id: 1 
}
// khai báo sayHello là 1 hàm , có tham số student có type Student và hàm trả về 1 hàm
// tham số student là k bắt buộc
const sayHello:Function = (student?:Students) : void => {
    console.log(student ? student : null)
}
sayHello(1)


//interface 
interface Person {
    name: string
    getName: (name: string) => void
}
const newPerson1:Person = {
    name: 'than',
    getName :(h: string) =>  {
        console.log(name)
    }
}
newPerson1.getName('a')

// TUPLE
 const tup:[string,boolean] = ['than',false]

 // GENERICS

// khoi tao type la mot arr ben trong co number
type arrNumber = Array<number | string>
const arr:arrNumber = [1,'1'] // err
const arrr:arrNumber = [1,2] // exactly
type PersonGeneric = {
    name: string
}
type objPerson = Array<PersonGeneric>
type objPerson1 = Array<object>
type objPerson2 = PersonGeneric[]

const newPersonGeneric:objPerson2= [
    {
        name:' than'
    }
] 
// khi chưa biết truyền vào data type là gì
const arrayAny = <T>(arr: Array<T>) => arr
arrayAny([1,'a'])
arrayAny([2,true])
// nói với nó truyền vào cái gì
arrayAny<number>([1,2,3])
const InitArray = <T>(number : T) => number
InitArray('1')
InitArray(1)

interface Resourse<T> {
    name: string,
    age: number,
    dob: T
}

const newResourses:Resourse<string> = {
    name: 'than',
    age: 1,
    dob: "2021/10/26"
}
const newResourses1:Resourse<string[]> = {
    name: 'than',
    age: 1,
    dob: ['2021','2020']
}