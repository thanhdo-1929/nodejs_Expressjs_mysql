const https = require("https");
const fs = require("fs");

let arrData = [];
let numCrawl = 0;
let numUrl = 1000;

function getData(getdata) {
  const req = https.get("https://www.google.com.vn/", (res) => {
    if (res.statusCode == 200) {
      let obj = {
        url: "https://www.google.com.vn/",
        data: getdata,
      };
      console.log(obj);
      arrData.push(obj);
    } else {
      req.on("error", (error) => {
        console.error(error);
      });
    }
  });
  req.end();
}

function addDataArr(numCrawl) {
  numCrawl++;
  let temp = [];
  for (let i = numCrawl; i < numCrawl + 5; i++) {
    temp.push(i);
  }
  return temp;
}

let loop = setInterval(() => {
  if (numCrawl < numUrl) {
    let arr = addDataArr(numCrawl);
    console.log("Loading...");
    getData(arr[0]);
    getData(arr[1]);
    getData(arr[2]);
    getData(arr[3]);
    getData(arr[4]);
    numCrawl += 5;
  } else {
    clearInterval(loop);
    fs.writeFileSync("data.json", JSON.stringify(arrData));
    console.log("Mission done!");
  }
}, 1000);
