Running the Application:
========================

Steps to run application in Chrome; other browsers have not been tested.
1. Download python3.
2. Install necessary modules by running `sudo pip3 install -r requirements.txt`.
2. Run `python3 run.py` to spin up the server.
3. Navigate to http://localhost:5000.

Future Improvements:
====================
Most API calls from the browser just show the default alert on error. A better UI should be created to handle API errors.

UI Functionality:
=================

- Click a node to select it (border becomes red).
- Right click a selected node to delete it.
- Right click another node to draw an arrow between them.
- Click on the canvas to remove selection.
- Right click on a selected edge to remove it.
- Select a context, then right click nodes to add them to the context

#### Drag and Drop Functionality:
- Drag and drop from the toolbar to the canvas.


API Routes:
===========

Authentication:
---------------
**/register**  
*POST*: creates an account given an email and password.  
*Body*: Stringify-ed JSON
```
{
  "email": "myemail@example.com",
  "password": "password123"
}
```
*Success Response*: 200 "Successfully registered user."  
*Error Responses*: 404 "Email already exists.", 500 "Invalid email address"

**/login**  
*POST*: logs in user given email and password.  
*Body*: Stringify-ed JSON
```
{
  "email": "myemail@example.com",
  "password": "password123"
}
```
*Success Response*: 200 "Logged in"  
*Error Responses*: 400 "Invalid username or password", 404 "User not found"

**/logout**  
*Precondition*: Must be logged in.  
*POST*: logs out the current user.  
*Body*: Empty
*Success Response*: 200 "Logged out"

**/currentuser**  
*GET*: retrieves the email of the currently logged in user.  
*Success Response*: 200  
```
{
  "email": "myemail@example.com"
}
```
*Error Response*: 401 "Not logged in"

Lem's:
------
**/lem**  
*GET*: retrieves lem given its id.  

*Precondition*: Must be logged in.  
*POST*: takes in json object representing lem and saves to database.  

*Precondition*: Must be logged in.  
*DELETE*: *DELETE*s lem given id.  

**/lemall**  
*GET*: retrieves all public lem**s.  

**/lemuser**  
*Precondition*: Must be logged in.  
*GET*: retrieves all lem's created by the currently logged in user.  

Users:
------
**/user**  
*GET*: retrieves the user object given its email.  

Comments:
---------
**/comment**  
*GET*: retrieves all of the comments for a given a lem id.  

*Precondition*: Must be logged in.  
*POST*: adds a comment to a public lem given a lem id and text.  

Ratings:
--------
**/rate**  
*Precondition*: Must be logged in.  
*POST*: takes a given float rating and applies it to a given lem id, updating the lem's average rating as well.  

Favorites:
----------
**/favorite**  
*Precondition*: Must be logged in.  
*GET*: retrieves the lem's that have been favorited by the currently logged in user.  

*Precondition*: Must be logged in.  
*PUT*: adds a given lem id to the currently logged in user's list of favorited lems.  

*Precondition*: Must be logged in.  
*DELETE*: removes a given lem id from the currently logged in user's list of favorited lems.  
