# Jamf Device Lookups in Jira Using An Atlassian Add-on using Express

This integration uses the Atlassian Connect Add-on with the Express web application framework. It displays a dialog field in your Jira instance that allows you to lookup device details based on the serial number of a device. It is meant to be a proof of concept and is not officially supported; however, please feel free to take the code and make it your own, free of charge. 

## What's next?

[Read the docs](https://bitbucket.org/atlassian/atlassian-connect-express/src/master/README.md#markdown-header-install-dependencies).

I've come across a beautiful tutorial which explains along with the screenshots what needs to be done in order to install the addon! Here's the link:
https://developer.atlassian.com/server/hipchat/getting-started-with-atlassian-connect-express/

Here's what you should do:
- Start with "Prerequisites" section
- Skip "Create a new add-on project" section
- Go through the whole "Start the add-on" section
- Instead of "Install the add-on in HipChat" section, choose this one

If you don't have "Upload add-on" link in there, click on the "Settings" link under the add-ons list on the "Manage Add-ons" page and check "Enable Private Listings" & "Enable Development Mode" checkboxes and refresh the page.

You will also need to edit index.js and put your usernames and passwords where applicable.
