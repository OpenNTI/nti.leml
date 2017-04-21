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

#### /Drag and Drop Functionality:
- Drag and drop from the toolbar to the canvas.


API Routes:
===========
Authentication:
---------------
---
#### */register*
**POST**: creates an account given an email and password.  
*Body*: Stringify-ed JSON
```json
{
  "email": "myemail@example.com",
  "password": "password123"
}
```
*Success Response*: 200 "Successfully registered user."  
*Error Responses*: 404 "Email already exists.", 500 "Invalid email address"

---
#### */login*  
**POST**: logs in user given email and password.  
*Body*: Stringify-ed JSON
```json
{
  "email": "myemail@example.com",
  "password": "password123"
}
```
*Success Response*: 200 "Logged in"  
*Error Responses*: 400 "Invalid username or password", 404 "User not found"

---
#### */logout*  
**POST**: logs out the current user.
*Precondition*: Must be logged in.    
*Body*: Empty  
*Success Response*: 200 "Logged out"

---
#### */currentuser*  
***GET***: retrieves the email of the currently logged in user.  
*Success Response*: 200  
```json
{
  "email": "myemail@example.com"
}
```
*Error Response*: 401 "Not logged in"  

---
Lems:
------

---
#### */lem*  
**GET**: retrieves lem given its id.  

**POST**: takes in json object representing lem and saves to database.  
*Precondition*: Must be logged in.  

**DELETE**: deletes lem given id.  
*Precondition*: Must be logged in.  

---
#### */lemall*  
**GET**: retrieves all public lems.  

---
#### */lemuser*  
**GET**: retrieves all lem's created by the currently logged in user.  
*Precondition*: Must be logged in.

---
Users:
------

---
#### */user*  
**GET**: retrieves the user object given its email.  

---
Comments:
---------

---
#### */comment*  
**GET**: retrieves all of the comments for a given a lem id.  

**POST**: adds a comment to a public lem given a lem id and text.  
*Precondition*: Must be logged in.  

---
Ratings:
--------

---
#### */rate*  
**POST**: takes a given float rating and applies it to a given lem id, updating the lem's average rating as well.  
*Precondition*: Must be logged in.  

---
Favorites:
----------

---
#### */favorite*  
**GET**: retrieves the lem's that have been favorited by the currently logged in user.  
*Precondition*: Must be logged in.  

**PUT**: adds a given lem id to the currently logged in user's list of favorited lems.  
*Precondition*: Must be logged in.  

**DELETE**: removes a given lem id from the currently logged in user's list of favorited lems.  
*Precondition*: Must be logged in.  

---
