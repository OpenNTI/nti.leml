[Running the Application](#running_the_application)  
[Debugging](#debugging)  
[Suggested Improvements](#suggested_improvements)  
[Testing](#testing)  
[How to use the canvas](#how_to_use_the_canvas)  
[API Documentation](#api_documentation)

Running the Application:
========================

Steps to run application in Chrome; other browsers have not been tested.
1. Download python3.
2. Install MongoDB 3.2 ([Instructions for Ubuntu 16.04](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/))
3. Install necessary modules by running `python3 setup.py install` inside a virtualenv.  
 - Setting up virtualenv  
 Install: `pip3 install virtualenv`  
 Create virtual environment: `python3 -m virtualenv <path_to_this_repo>`
 Activate:  `source <path_to_this_repo>/bin/activate`  
 - On Ubuntu, you might get an error when downloading cffi
  ```
  No package 'libffi' found
  c/_cffi_backend.c:15:17: fatal error: ffi.h: No such file or directory
  compilation terminated.
  error: Setup script exited with error: command 'x86_64-linux-gnu-gcc' failed with exit status 1
  ```

  I found [these](https://l.messenger.com/l.php?u=https%3A%2F%2Fgithub.com%2FKozea%2Fcairocffi%2Fissues%2F14&h=ATNIrW48G4GzpBoIvVvfgY_4jzogeQYOEzFXoKbe8Vtf6auMk134329a71qCcOdLLcCjHESf90mydpcQFoeqmeWaSZxp7YzbbWkcnQCZFsIFuxjPT6Zlt_Y8uqDVxCUddSvy6w) [links](https://l.messenger.com/l.php?u=https%3A%2F%2Faskubuntu.com%2Fquestions%2F518635%2Funable-to-locate-package-libffi-and-libffi5-dev-on-ubuntu-12-04-4-through-apt-ge&h=ATNIrW48G4GzpBoIvVvfgY_4jzogeQYOEzFXoKbe8Vtf6auMk134329a71qCcOdLLcCjHESf90mydpcQFoeqmeWaSZxp7YzbbWkcnQCZFsIFuxjPT6Zlt_Y8uqDVxCUddSvy6w) on the issue. It appears that `sudo apt install libffi6 libffi-dev` fixes the problem.

4. Run `npm install` in /static to install all 3rd party packages
4. Run `python3 run.py` to spin up the server. Include --help or -h for command options on how to supply database access and location specifications.
5. Navigate to http://[host]:[port]. The default is http://127.0.0.1:5000.


Debugging:
============

### State and Actions
Some ideas from [redux](http://redux.js.org/docs/introduction/) are implemented in this app. There is a state object (in `static/js/state.js`) that holds most of the global data. This state object is never changed, but is sometime replaced by a changed copy. The only code that replaces (changes) the state is the actions which are all in `static/js/actions`.

At the top of `/static/js/state.js` there is `const LOG_ACTIONS`. When this is `true` all actions modifying the state will print to the console. This can be useful to figure out what is going on.

### LEM structure
You can verify that LEM JSON being sent to the backend is correct by using a [JSON validator](http://www.jsonschemavalidator.net/) and testing against our [defined schema](./static/lemSchema.json)

Suggested Improvements:
====================
- Add creative commons/ licensing info to share modal so that users know their lems are open source.
- Paginate public and private LEM pages
- Add a public/private label to user owed lems that they can click and change
- Most API calls from the browser just show the default alert on error. A better UI should be created to handle API errors.
- Add an undo and redo feature to the canvas. There should be libraries for this, or keep a stack of canvas states (using cy.json) that can be popped.

Things that are possible but just cause problems:
 - **Drawing an action from a building block to a context** This will create a disconnected graph because actions cannot be drawn from a context to anything else. If you try to draw that action, the element you click on will be added to the context
 - **Changing the type of the start and stop node** This changes the class of the element and so changes the display label, but it doesn't actually change the IDs, so programatically the stop node is always the stop node - even if you change the type. This can cause the user to create a backwards graph that will not validate.


Testing:
============
Run through the [smoke tests](./smoke_tests.md)  
Use [transform_lem_json.js](./transform_lem_json.js) to convert old LEM format to new  
 - Stringify all ids
 - Store actions objects for start and stop instead of list of start and stop id lists
 - Store notaition actions instead of a reference to building block id on the notation

How to use the canvas:
=================

**Selecting and Editing**  
1. Click a node to select it (border becomes red)  
2. Edit the properites on the sidebar  
3. Click anywhere on the canvas where the are no elements to unselect

**Adding nodes**  
 - Drag from the toolbar and drop onto the canvas
or  
 - Double click from the toolbar

**Deleting nodes and edges**  
1. Click once to select  
2. Then right click or shift click on a selected element to delete it

**Drawing actions**  
1. Select a starting node  
2. Right click or shift click another node to draw between them

**Adding building blocks to a context**
1. Add the context and building block to the canvas
2. Select the context you want to add them to
3. Right click or shift click the building block you want to add to the context


**Remove building blocks from a context**  
1. Select the building block you want to remove
2. Right click or shift click anywhere on empty canvas to move the building block out of the context to that point on the canvas


**Adding favorite templates**
- Drag from the favorite template sidebar and drop onto the canvas  
or  
- Double click from the favorite template sidebar

API Documentation:
===========

- [Authentication](#authentication)
- [Lems](#lems)
- [Users](#users)
- [Comments](#comments)
- [Ratings](#ratings)
- [Favorites](#favorites)

Authentication:
---------------
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

Lems:
------
#### */lem*  
**GET**: retrieves lem given its id.  
*Query String Parameters*: id  
`/lem?id=58de81a29a93ac144a594fa7`  
*Success Response*: 200  
Abbreviated LEM JSON ([full](./FullAPIExamples.md#lem-post-body#lem-get-response)):
```json
{
  "_id": {
    "$oid": "58de81a29a93ac144a594fa7"
  },
  "name": "test",
  "created_by": "newemail@email.com",
  "date_created": {
    "$date": 149095899737
  },
  "building_blocks": [
    {
      "id": "1",
      "block_type": "Information",
      "description": "Topic Overview",
      "method": "HTML File"
    }
  ],
  "contexts": [
    {
      "id": "14",
      "context_type": "Online Asynchronous",
      "building_blocks": [
        "1",
        "2",
        "3"
      ],
      "notations": []
    }
  ],
  "actions": [
    {
      "id": "8",
      "action_type": "Learner Action",
      "source": "1",
      "target": "2"
    },
    {
      "id": "2",
      "action_type": "notationEdge",
      "source": "undefined",
      "target": "7"
    },
    {
      "id": "3",
      "action_type": "Learner Action",
      "source": "start",
      "target": "1"
    },
    {
      "id": "4",
      "action_type": "Learner Action",
      "source": "7",
      "target": "stop"
    },
    {
      "id": "5",
      "action_type": "notationEdge",
      "source": "undefined",
      "target": "undefined"
    }
  ],
  "notations": [
    {
      "description": "Objective 1",
      "id": "undefined"
    }
  ],
  "ratings": [
    4,
    5,
    5,
    5,
    4,
    1,
    1
  ],
  "avgRating": 3,
  "thumbnail": "data:image/png;base64,iVBO...",
  "public": 1
}
```

**POST**: takes in json object representing lem and saves to database.  
*Precondition*: Must be logged in.  
*Body*: Stringify-ed JSON  
Abbreviated LEM JSON ([full](./FullAPIExamples.md#lem-post-body)):
```json
{
  "contexts": [
    {
      "id": "14",
      "context_type": "Online Asynchronous",
      "building_blocks": [
        "1",
        "2",
        "3"
      ],
      "notations": []
    }
  ],
  "building_blocks": [
    {
      "id": "1",
      "block_type": "Information",
      "description": "Topic Overview",
      "method": "HTML File",
      "parent": "14"
    }
  ],
  "notations": [
    {
      "description": "Objective 1",
      "id": "null"
    }
  ],
  "actions": [
    {
      "id": "8",
      "action_type": "Learner Action",
      "source": "1",
      "target": "2"
    },
    {
      "id": "2",
      "action_type": "notationEdge",
      "source": "null",
      "target": "7"
    },
    {
      "id": "3",
      "action_type": "Learner Action",
      "source": "start",
      "target": "1"
    },
    {
      "id": "4",
      "action_type": "Learner Action",
      "source": "7",
      "target": "stop"
    }
  ],
  "name": "testName",
  "public": 0,
  "thumbnail": "data:image/png;base64,iVBORw0KGgoA..."
}
```
*Success Response*: 200  "Successfully saved LEM."  

**DELETE**: deletes lem given id.  
*Precondition*: Must be logged in. Must own the lem specified by the id.  
*Body*: Stringify-ed JSON  
```json
{ "id": "58de81a29a93ac144a594fa7"}
```
*Success Response*: 200 "Successfully deleted LEM."  
*Error Responses*: 401 "Current user does not own lem: <id>"

---
#### */lemall*  
**GET**: retrieves all public lems.  
*Success Response*: 200
Abbreviated LEM list JSON ([full](./FullAPIExamples.md#lem-post-body#lemall-response)):
```json
[
  {
    "_id": {"$oid": "58de81a29a93ac144a594fa7"},
    "name": "test",
    "..."
  },
  {
    "_id": {"$oid": "58de826e9a93ac14ffbaab6b"},
    "name": "anotherTest",
    "..."
  }
]
```
---
#### */lemuser*  
**GET**: retrieves all lems created by the currently logged in user.  
*Precondition*: Must be logged in.  
*Success Response*: 200  
Returns a list with identical structure as [/lemall route](#lemall)  
*Error Responses*: 401 Unauthorized

Users:
------
#### */user*  
**GET**: retrieves the user object given its email.

---
#### */currentuser*  
*Precondition*: Must be logged in.  
**GET**: retrieves the user object for currently logged in user.  
*Success Response*: 200  
```json
{"email": "leml@uco.edu"}
```
*Error Responses*: 401 Unauthorized

Comments:
---------
#### */comment*  
**GET**: retrieves all of the comments for a given a lem id.  
*Query String Parameters*: id  
`/comment?lem=58de81a29a93ac144a594fa7`  
*Success Response*: 200  
Abbreviated LEM JSON ([full](./FullAPIExamples.md#get-comments-response)):
```json
[
  {
    "_id": {"$oid": "58e79f20cf367e28e8e2624a"},
    "lem_id": "58de81a29a93ac144a594fa7",
    "text": "testagd",
    "created_by": "nickbgraham83@gmail.com",
    "date_created": {"$date": 1491554899172}
  },
  "..."
]
```

**POST**: adds a comment to a public lem given a lem id and text.  
*Precondition*: Must be logged in.  
*Body*: Stringify-ed JSON
```json
{
  "lem":"58de81a29a93ac144a594fa7",
  "text":"This is a comment!"
}
```
*Success Response*: 200  
*Error Responses*: 401 Unauthorized, 403 "Cannot comment on a private lem not owned by you"


Ratings:
--------
#### */rate*  
**POST**: takes a given float rating and applies it to a given lem id, updating the lem's average rating as well.  
*Precondition*: Must be logged in.  
*Body*: Stringify-ed JSON  
```json
{
  "lem":"58de81a29a93ac144a594fa7",
  "rating":5
}
```
*Success Response*: 200  
```json
{
  "lem_id":"58de81a29a93ac144a594fa7",
  "new_avg":4.7
}
```
*Error Responses*: 401 Unauthorized


Favorites:
----------
#### */favorite*  
**GET**: retrieves the lem's that have been favorited by the currently logged in user.  
*Precondition*: Must be logged in.  
*Success Response*: 200  
Abbreviated LEM JSON list ([full](./FullAPIExamples.md#get-favorites-response))
```JSON
[
  {
    "_id": {
      "$oid": "58de81a29a93ac144a594fa7"
    },
    "name": "test",
    "created_by": "newemail@email.com",
    "date_created": {
      "$date": 1490958997377
    },
    "building_blocks": [
      {
        "id": "1",
        "block_type": "Information",
        "description": "Topic Overview",
        "method": "HTML File"
      },
      "..."
    ],
    "contexts": [
      {
        "id": "14",
        "context_type": "Online Asynchronous",
        "building_blocks": [
          "1",
          "2",
          "3"
        ],
        "notations": []
      },
      "..."
    ],
    "actions": [
      {
        "id": "8",
        "action_type": "Learner Action",
        "source": "1",
        "target": "2"
      },
    "..."
    ],
    "notations": [
      {
        "description": "Objective 1",
        "id": "undefined"
      }
    ],
    "ratings": [
      6,
      5,
      3,
      4,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      5,
      5,
      4,
      4,
      5,
      5,
      4,
      5,
      4,
      1,
      1
    ],
    "avgRating": 3,
    "thumbnail": "data:image/png;base64,iVBORw0KGgoAAAAN...UVORK5CYII=",
    "public": 1
  },
  "..."
]
```

**PUT**: adds a given lem id to the currently logged in user's list of favorited lems.  
*Precondition*: Must be logged in.  
*Query String Parameters*: id  
`/favorite?id=58de81a29a93ac144a594fa7`  
*Success Response*: 200  
Same format as **GET** `/favorite` but returns new favorites ([full format](./FullAPIExamples.md#get-favorites-response))


**DELETE**: removes a given lem id from the currently logged in user's list of favorited lems.  
*Precondition*: Must be logged in.  
*Query String Parameters*: id  
`/favorite?id=58de81a29a93ac144a594fa7`  
*Success Response*: 200  
Same format as **GET** `/favorite` but returns new favorites ([full format](./FullAPIExamples.md#get-favorites-response))
