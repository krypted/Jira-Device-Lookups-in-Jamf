module.exports = function (app, addon) {

    // Root route. This route will serve the `atlassian-connect.json` unless the
    // documentation url inside `atlassian-connect.json` is set
    app.get('/', function (req, res) {
        res.format({
            // If the request content-type is text-html, it will decide which to serve up
            'text/html': function () {
                res.redirect('/atlassian-connect.json');
            },
            // This logic is here to make sure that the `atlassian-connect.json` is always
            // served up when requested by the host
            'application/json': function () {
                res.redirect('/atlassian-connect.json');
            }
        });
    });

    app.post('/issue_created_webhook', addon.authenticate(), function (req, res) {
            var serial = req.body.issue.fields.customfield_10024;
            if (!serial) {
                return
            }

            var Client = require('node-rest-client').Client;
            var auth = {user: "YOURJAMFUSERNAME", password: "YOURJAMFPASSWORD"};
            var client = new Client(auth);
            var params = {
                headers: {"Content-Type": "application/json"}
            };
            client.get("https://kryptedjamf.jamfcloud.com/JSSResource/mobiledevices/match/" + serial, params, function (data) {
                if (data && data.mobile_devices && data.mobile_devices.size > 0) {
                    var deviceId = data.mobile_devices.mobile_device.id;

                    if (!deviceId) {
                        return
                    }

                    client.get("https://kryptedjamf.jamfcloud.com/JSSResource/mobiledevices/id/" + deviceId, params, function (data) {
                        if (data && data.mobile_device) {
                            var options_auth = {user: "YOURUSER", password: "YOURPASSWORD"};
                            client = new Client(options_auth);
                            var params = {
                                data: {
                                    fields: {
                                        "customfield_10026": JSON.stringify(data.mobile_device)
                                    }
                                },
                                headers: {"Content-Type": "application/json"}
                            };
                            client.put(req.body.issue.self, params, function (data, response) {
                                console.log(data);
                                console.log(response);
                            });
                        }
                    });
                }
            });

        }
    );

    // Add any additional route handlers you need for views or REST resources here...

    // load any additional files you have in routes and apply those to the app
    {
        var Client = require('node-rest-client').Client;
        var fs = require('fs');
        var path = require('path');
        var files = fs.readdirSync("routes");
        for (var index in files) {
            var file = files[index];
            if (file === "index.js") continue;
            // skip non-javascript files
            if (path.extname(file) != ".js") continue;

            var routes = require("./" + path.basename(file));

            if (typeof routes === "function") {
                routes(app, addon);
            }
        }
    }
};
