// console.log("Hi");
// const add = (a, b) => {
//   return a + b;
// };
// const [, , n, m] = process.argv;

// console.log(add(+n, +m));


const sum= (n1,n2)=>{
 return n1 + n2;
}

const [, , n1,n2] = process.argv;

console.log(sum(+n1,+n2));