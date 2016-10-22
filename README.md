#Google Connector.
###All routes must contain a token query with token secret, that provided by google drive api v3.

###Steps to reproduce:
* 1. Follow this link https://console.developers.google.com/
* 2. Click "Enable api" at the top left corner, near "Dashboard" title
* 3. In the list below choose "Drive API" (Google Apps API's tab)
* 4. Go to credentials
* 5. Click on "Create credentials" button -> OAuth Client ID -> Other -> Choose your name and press "Save"
* 6. Click "Download JSON" button on the right side of the name, from the step above
* 7. Now rename the main.ts.default file to main.ts and put your credentials as shown in the file.
* 8. If you have your own compiler - you can use it to compile ts files to js files, if not - just type 
```sh
npm run start
npm run compile
```
 in your console from the base directory of application
* 9. Then type 
```sh
node dist
```
 to run the server.
* 10. Now you can check the service =)

###Every request to service needs a "token" query parameter to permit your access.

###To create token follow this link : https://developers.google.com/oauthplayground/
* 1. Choose Drive Api in list below
* 2. Check */drive.readonly scope -> Press "Authorize APIs"
* 3. Under the "Authorization code" textarea push "Exchange authorization code for tokens" buttons
* 4. Copy the code from "Access token" input and put as a "token" query parameter in your test application after the link of service.

Your link will looks like http://localhost:3000?token={YOUR_TOKEN}


###Acceptable routes:

/ - GET - Getting the list of file from all over the google drive


            Query parameters:
            {
                ext[[]?] - array or string of extensions, you want to see in your list,
                pageToken? - token of a page you want to go
                folder? - id of drive you want to get files from
                
            };
            You can combile folder with extensions)) So go on! =)
                ... other queries, that permitted by googleapi v3

/file - POST - in the body you need to set the fileId, or id, or you can put all the information about file
            
            Query parameters: {
                export = {any value} - if you want to get a content of chosen file
                mimeType - by default - text/plain
            }

            You could set export and fileId either in body parameters or query. But your query parameters will overwrite all duplicate values...


I'm really sorry, that had no time to write tests =(
