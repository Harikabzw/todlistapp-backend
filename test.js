
// var text = "This is a string, you need compare second string with first string";
// var st="string"
// //var text1=text.split(" ")
// //console.log(text1)
// var count=0
// for( var i=0;i<text.length;i++){
//     console.log(text[i].length)
// if(text[i].toLowerCase()==st.toLowerCase()){
//     console.log('count')
//     count=count+1
// }

// }
// console.log(count)

// function occurrences(string, subString, allowOverlapping) {

//     string += "";
//     subString += "";
//     console.log(string, subString, allowOverlapping)
//     if (subString.length <= 0) return (string.length + 1);

//     var n = 0,
//         pos = 0,
//         step = allowOverlapping ? 1 : subString.length;

//     while (true) {
//         pos = string.indexOf(subString, pos);
//         if (pos >= 0) {
//             ++n;
//             pos += step;
//         } else break;
//     }
//     return n;
// }
// console.log(occurrences("This is a string, you need compare second string with"," string"))

var string = 'This is a string, you need compare second string with string',
searchFor = 'string',
count = 0,
count1 = string.indexOf(searchFor);
console.log(string.length)

while (count1 > -1) {
 
++count;

pos = string.indexOf(searchFor, ++count1);

}
 p=[ 25, 3, 5, 54, 23, 100, 1 ]

// function maxProfit(prices) {
//     let minPrice = prices[0];
//     let maxProfit = prices[1] - prices[0];
  
//     for (let i = 1; i < prices.length; i++) {
//       let currentPrice = prices[i];
//       let potentialProfit = currentPrice - minPrice;
//       maxProfit = Math.max(maxProfit, potentialProfit);
//       minPrice = Math.min(minPrice, currentPrice);
//     }
  
//     return maxProfit;
//   }
//   console.log(maxProfit(p))



function max (prices) {
    let maxProfit = 0
    let currentBuy = prices[0]
    let currentSell = prices[0]
    for(let i = 0; i < prices.length + 1; i++){
        if(prices[i] < currentBuy){
            currentBuy = prices[i]
            currentSell = prices[i + 1]
            if(currentSell - currentBuy > maxProfit){
                  maxProfit = currentSell - currentBuy
            }
        } else if(prices[i] > currentSell){
            currentSell = prices[i]
            if(currentSell - currentBuy > maxProfit){
                  maxProfit = currentSell - currentBuy
              }
         }
       }
return maxProfit
};
max(p)