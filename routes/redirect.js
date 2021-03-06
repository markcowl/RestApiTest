
/*
 * GET home page.
 */

Boolean.parse = function (str) {
  switch (str.toLowerCase ()) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      throw new Error ("Boolean.parse: Cannot convert string to boolean.");
  }
};

exports.location= function(req, res){
  var code = req.params['code'];
  var isPositive = req.params['isPositive'];
  res.redirect(parseInt(code), '/redirectend/verb/' + req.method + '/positive/' + isPositive);
};

exports.validate= function(req, res){
  var verb = req.params['verb'];
  var code = req.params['code'];
  var isPositive = Boolean.parse(req.params['isPositive']);
  res.set('Cache-Control', 'no-store');
  res.set('Content-type', 'text/xml');
  if (req.method != verb)
  {
  	res.status(400).end('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>BadVerb</Code><Message>Received bad verb ' + req.method + '</Message></Error>');
  }
  else if (!isPositive)
  {
  	res.status(400).end('<?xml version="1.0" encoding="utf-8"?>\r\n<Error>\r\n<Code>ExpectedNegative</Code><Message>This is an expected negative response which should create an expected exception</Message></Error>');
  	
  }
  else
  {
  	if (verb === "HEAD")
  	{
  		res.status(204).end();
  	}
  	else 
    {
  		res.status(200).end('<?xml version="1.0" encoding="utf-8"?>\r\n<Redirect>\r\n<Success>true</Success>\r\n</Redirect>');
  	}
  }
};