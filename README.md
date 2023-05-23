# Password Manager

A simple, lightweight password management tool that stores passwords on your computer, not on the cloud.

By <a href="https://github.com/DavidSams/">David Sams</a>

## Start-up Guide

1. Download the project to a secure folder on your machine.

2. Navigate to `resources/data.js` and open it in a code editor.

3. Add your passwords, following the provided format and adding however many additional fields you need.

4. Open the root `app.html` file in your browser and you should be able to see your passwords in the left sidebar.

## General Notes

- There are no restrictions on the number or names of properties you can use in password objects; any key/value pair in the object will be displayed in the password card for that password.

- The `tab` property in the object array located in `resources/data.js` corresponds to the list of categories in `app.html`. Feel free to edit or delete them to create your own custom categories.

- Clicking any field in a password card automatically copies that field's contents to the clipboard.

- In `resources/data.js`, an array with a `[1]` value of `['web']` will turn that field into a clickable link.

- Similarly, an array with a `[1]` value of `['pw']` will conceal the field. Hold down the shift key to temporarily reveal hidden fields.

## Creating a shortcut to the app

Mac users can add a nifty shortcut to the app that will open it in a new browser window.

Simply open the Shortcuts app and create a new shortcut. Add the following command from the searchbar on the right:

<pre>Run AppleScript with Input</pre>

Copy and paste the following code snippet into the script:

<pre>tell application "Google Chrome"
	tell (make new window)
	end tell
end tell</pre>

Click the hammer icon. Then append an `Open File` command, and select the path to `app.html`:

<pre>Open app.html in Default App</pre>

You can now add the shortcut wherever you like, in your dock or in the status bar if you prefer it out of sight.

<hr>

*Thanks for trying my app! :)*

