const http = require('http')

const url = require('url')
const qs = require('querystring')

//The text I explained myself
const contentKutlu  = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>About Kutlu</title>' +
'    </head>' +
'    <body>' +
'         <h1>Hello, I am Kutlu</h1>' +
'          <br/>'+
'          <p> I am an electronics Engineer from Turkey and I am studying in Paris ECE <p/>'+
'    </body>' +
'</html>'

//Not found content
const content404  = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Page Not found</title>' +
'    </head>' +
'    <body>' +
'         <h1>404 Error</h1>' +
'          <p>Page Not Found<p/>'+
'    </body>' +
'</html>'

const contentHome  = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>Home</title>' +
'    </head>' +
'    <body>' +
'         <h1>Instructions</h1>' +
'          <p>Please update the path in a the form /hello?name=YOURNAME<p/>'+
'          <br/>'+
'          <p>To find more about me type /hello?name=kutlu<p/>'+
'          <br/>'+
'          <p>For any parameters and path not correct you will see a 404 Error'+
'    </body>' +
'</html>'


module.exports={

    serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/plain'});


    if (path === '/hello' && 'name' in params) {
      //If user enters a correct parameter
        if(params['name']=="kutlu"){

          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(contentKutlu);

        }else if(params['name']==""){
          
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(content404);

        }else{
          
          res.write('Hello ' + params['name'])
        
        }
      }else if(path ==='/'){
        //If is it the home path explain the site

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(contentHome);

      }else{
        //anything else then a correct param or home page, write error

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(content404);

      }


    res.end();
  }
}