const https = require("https");
const fs = require("fs");

function crawlDataFromUrl(url) {
  return new Promise(function (resolve, rejects) {
    try {
      const request = https.get(url, (res) => {
        if (res.statusCode == 200) {
          const obj = {
            url: url,
            data: "",
          };
          resolve(obj);
        } else {
          req.on("error", (error) => {
            rejects(error);
          });
        }
      });
      request.end();
    } catch (error) {
      reject(error);
    }
  });
}

const fetchData = async (numberOfRequest) => {
  const responses = [];

  for (let i = 1; i <= numberOfRequest; i + 5) {
    const number = i + 5;
    console.log("crawling...");
    do {
      let data = await crawlDataFromUrl("https://www.google.com.vn/");
      data.data = i;
      console.log(data);
      responses.push(data);
      i++;
    } while (i < number && i <= numberOfRequest);
  }
  return responses;
};

const writeOfFile = async (data, path) => {
  return fs.writeFileSync(path, JSON.stringify(data));
};

const run = async () => {
  const numberOfRequest = 1000;
  try {
    const data = await fetchData(numberOfRequest);
    if (data[0]) {
      await writeOfFile(data, "data.json");
    }
  } catch (error) {
    console.log(error.message);
  }
  console.log("done! ");
  return;
};

run();
