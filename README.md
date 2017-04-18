Running the Application:
------------------------

Steps to run application in Chrome; other browsers have not been tested.
1. Download python3.
2. Install necessary modules by running `sudo pip3 install -r requirements.txt`.
2. Run `python3 run.py` to spin up the server.
3. Navigate to http://localhost:5000.

UI Functionality:
-----------------

Click a node to select it (border becomes red).
Right click another node to draw an arrow between them.
Click on the canvas to remove selection.
Right click on an edge to remove it.

Drag and Drop Functionality:
Drag and drop from the toolbar to the canvas.

TO DO:
Add descriptions to dropped building blocks and capitalize the first letter.

API Routes:
-----------

Authentication:
'/register'
POST: creates an account given an email and password.

'/login'
POST: logs in user given email and password.

'/logout'
Precondition: Must be logged in.
POST: logs out the current user.

'/currentuser'
GET: retrieves the email of the currently logged in user.

LEM's: 
'/lem'
GET: retrieves lem given its id.

Precondition: Must be logged in.
POST: takes in json object representing lem and saves to database.

Precondition: Must be logged in.
DELETE: deletes lem given id.

'/lemall'
GET: retrieves all public lem's.

'/lemuser'
Precondition: Must be logged in.
GET: retrieves all lem's created by the currently logged in user.

Users:
'/user'
GET: retrieves the user object given its email.

Comments:
'/comment'
GET: retrieves all of the comments for a given a lem id.

Precondition: Must be logged in.
POST: adds a comment to a public lem given a lem id and text.

Ratings:
'/rate'
Precondition: Must be logged in.
POST: takes a given float rating and applies it to a given lem id, updating the lem's average rating as well.

Favorites:
'/favorite'
Precondition: Must be logged in.
GET: retrieves the lem's that have been favorited by the currently logged in user.

Precondition: Must be logged in.
PUT: adds a given lem id to the currently logged in user's list of favorited lems.

Precondition: Must be logged in.
DELETE: removes a given lem id from the currently logged in user's list of favorited lems.