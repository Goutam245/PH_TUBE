//const isVerified = "";


//if(isVerified === true){
//    console.log('User is Verified')
//}
//else{
//    console.log('User is Not verified')
//}
//

//console.log(
//    `${isVerified === true ? "User is Verified" : "User is not Verified"}`
//)

function getTimestring (time){
    const Hour = parseInt(time/ 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt  (remainingSecond / 60 );
    remainingSecond = remainingSecond % 60;
    return `${Hour} hour ${minute} minute ${remainingSecond} second ago`
}

console.log(getTimestring(7000))