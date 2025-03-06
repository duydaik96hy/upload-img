import http from "https";

const mail = Buffer.from(
    "From: doan.dong.bui@draphony.de\n" +
    "To: doan.dong.bui@draphony.de\n" +
    "Subject: Subject Text\n\n" +

    "Message text"
).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');

const post_options = {
  hostname: 'www.googleapis.com',
  port: '443',
  path: '/gmail/v1/users/me/messages/send',
  method: 'POST',
  headers: {
    "Authorization": 'Bearer ya29.A0ARrdaM-z1drmo6Q8tHIBAisq0U517dWomD4kjKyn0SOYa67YMtSoODpHYPveQIENRsZ9FVLc4mcrbqX-8XQetG1DNrsAytntvuAtoq7FrVig2VctgVGgkmEEfecXdqWnwC5X-xrJ3Fg3De1BipZ_xVa7822i',
    "Content-Type" : "application/json"
  }
};

const post_req = http.request(post_options, function(res: any) {
    res.setEncoding('utf8');
    res.on('data', function (chunk: any) {
        console.log('Response: ' + chunk);
    });
});

post_req.write(JSON.stringify({ "raw": mail }));
post_req.end();