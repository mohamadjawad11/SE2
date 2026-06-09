
export interface IMapper<T,U>{
    // map(data:string[]):Cake; /this is very concrete I want my code to be more generic
    map(data:T):U
    reverseMap(item:U):T
}