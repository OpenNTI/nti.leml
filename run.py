from flask import request, render_template, session
from flask_globals import *
from db.leml import Lem, toLem, Comment
from db.user import User as DBUser
from db.user_favorite_lems import User_Favorite_Lems
from db.ratings import Ratings
from mongoengine import *
from bson import ObjectId
import json
from getFuncs import *
import sys
from flask_api import status
import argparse

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

init()
application = get_global_app()
login_manager = get_login_manager()

mongo = {}

# URL for getting a lem item


@app.route('/lem', methods=['GET', 'POST', 'PUT', 'DELETE'])
def lem():
    if request.method == 'GET':
        id = request.args.get('id')
        return getById(ObjectId(id), mongo)
    if current_user.is_authenticated:
        data = request.get_json(force=True)
        if request.method == 'DELETE':
            db = connect(db=mongo["name"],
                         host=mongo["host"],
                         username=mongo["username"],
                         password=mongo["password"])
            for lem in Lem.objects(pk=ObjectId(data['id'])):
                if lem.created_by.email != current_user.email:
                    return "Current user (" + current_user.email + ") does not own lem: " + \
                        data['id'], status.HTTP_401_UNAUTHORIZED
            for fave in User_Favorite_Lems.objects(
                    favorites=ObjectId(data['id'])):
                fave.update(pull__favorites=ObjectId(data['id']))
            db.close()
            return delete(ObjectId(data['id']), mongo)
        return save(data, current_user, mongo)
    return login_manager.unauthorized()

# URL for getting all current lem objects in the database


@app.route('/lemall', methods=['GET'])
def lemall():
    db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
    allobj = []
    for lem in Lem.objects(public=1):
        allobj.append(lem.to_json())
    db.close()
    return json.dumps(allobj)

# URL for getting user lems


@app.route('/lemuser', methods=['GET'])
@login_required
def lemuser():
    db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
    allobj = []
    for lem in Lem.objects(created_by=current_user.email):
        allobj.append(lem.to_json())
    db.close()
    return json.dumps(allobj)


# URL for registering users
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(force=True)
    usr_name = data['email']
    password = data['pass']
    pwd_hash = getHash(password)
    db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
    if DBUser.objects(pk=usr_name).count() > 0:
        return "Email already exists", status.HTTP_400_BAD_REQUEST
    DBUser(usr_name, pwd_hash).save()
    db.close()
    return "Successfully registered user."


@app.route('/user', methods=['GET'])
def user():
    email = request.args.get('id')
    user = load_user(email)
    if user is None:
        return "{}"
    return user.to_json()


@app.route('/currentuser', methods=['GET'])
def currentuser():
    if not session.get('logged_in'):
        return "Not logged in", status.HTTP_401_UNAUTHORIZED
    user = load_user(current_user.email)
    return user.to_json()


# URL for login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json(force=True)
    name = data['email']
    password = data['pass']
    usr_ver = load_user(name)
    if usr_ver is None:
        return "User not found", status.HTTP_404_NOT_FOUND
    pwd_ver = chckHash(usr_ver.password, password)
    if pwd_ver is True:
        session['logged_in'] = True
        login_user(usr_ver)
        return "Logged in"
    else:
        return "Invalid username or password", status.HTTP_400_BAD_REQUEST


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    session['logged_in'] = False
    logout_user()
    return "Logged out"


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/comment', methods=['GET', 'POST'])
def comment():
    if request.method == 'GET':
        lem_id = request.args.get('lem')
        comments = []
        for comment in Comment.objects(lem_id=lem_id):
            include = True
            for lem in Lem.objects(pk=lem_id):
                if lem.public == 0 and lem.created_by.email != current_user.email:
                    include = False
                    break
            if include:
                comments.append(comment.to_json())
        return json.dumps(comments)
    elif request.method == 'POST':
        if current_user.is_authenticated:
            data = request.get_json(force=True)
            lem_id = ObjectId(data["lem"])
            text = data["text"]
            created_by = current_user.email

            db = connect(db=mongo["name"],
                         host=mongo["host"],
                         username=mongo["username"],
                         password=mongo["password"])

            # Check that a private lem is not being accessed
            for lem in Lem.objects(pk=lem_id):
                if lem.public == 0 and lem.created_by.email != current_user.email:
                    return "Cannot comment on a private lem not owned by you", status.HTTP_403_FORBIDDEN

            resultComment = {}
            for lem in Lem.objects(pk=lem_id):
                comment = Comment(
                    lem_id=str(lem_id),
                    text=text,
                    created_by=created_by)
                comment.save()
                resultComment = comment.to_json()
            db.close()
            return resultComment
        return login_manager.unauthorized()


@app.route('/rate', methods=['POST'])
@login_required
def rate():
    data = request.get_json(force=True)
    new_rating = float(data["rating"])
    lem_id = ObjectId(data["lem"])
    new_avg = 0
    rating_item = Ratings.objects.filter(
        Q(lem=lem_id) & Q(user=current_user.email))
    if len(rating_item) == 0:
        Ratings(user=current_user.email, lem=lem_id, rating=new_rating).save()
    else:
        rating_item[0].update(rating=new_rating)
    ratings = Ratings.objects(lem=lem_id)
    new_avg = sum(r.rating for r in ratings) / len(ratings)
    print(Lem.objects(pk=lem_id))
    Lem.objects(pk=lem_id).update(avgRating=new_avg)
    return '{"new_avg":"' + str(new_avg) + '", "lem_id":"' + str(lem_id) + '"}'


@app.route('/favorite', methods=['GET', 'PUT', 'DELETE'])
@login_required
def favorite():
    db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])

    id = ObjectId(request.args.get('id'))
    for lem in Lem.objects(pk=id):
        favoritedLem = lem

    # Create favorite entry for this user if there isn't one
    count = 0
    for userFav in User_Favorite_Lems.objects(pk=current_user.email):
        count += 1

    if request.method == 'DELETE':
        User_Favorite_Lems.objects(
            pk=current_user.email).update(
            pull__favorites=favoritedLem)
    if request.method == 'PUT':
        User_Favorite_Lems.objects(
            pk=current_user.email).update(
            add_to_set__favorites=favoritedLem,
            upsert=True)

    # else if GET, also return new favorites on PUT and DELETE
    new_favs = []
    for favs in User_Favorite_Lems.objects(pk=current_user.email):
        for lem in favs.favorites:
            new_favs.append(lem.to_json())
    db.close()

    return json.dumps(new_favs)


@login_manager.user_loader
def load_user(id, remember=True):
    db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
    for user in DBUser.objects(pk=id):
        return User(user.email, user.password)
    return None


def validate_json(json_dict):
    t_user = load_user(current_user.email)
    if t_user is None:
        return False
    return True

def _parse_args():
    # Parse command line args
    arg_parser = argparse.ArgumentParser( description="LEML Server" )
    arg_parser.add_argument( '-c', '--config', dest='config', default=argparse.SUPPRESS, help="LEML server configuration file." )
    arg_parser.add_argument( '-a', '--address', dest='address', default=argparse.SUPPRESS, help="Local IP address to bind to." )
    arg_parser.add_argument( '-p', '--port', dest='port', default=argparse.SUPPRESS, help="Local port to bind to." )
    arg_parser.add_argument( '--db-host', dest='host', default=argparse.SUPPRESS, help="Hostname of MongDB server." )
    arg_parser.add_argument( '--db-name', dest='name', default=argparse.SUPPRESS, help="MongoDB to conect to on the server." )
    arg_parser.add_argument( '--db-user', dest='username', default=argparse.SUPPRESS, help="MongoDB username." )
    arg_parser.add_argument( '--db-pass', dest='password', default=argparse.SUPPRESS, help="MongoDB user password." )
    return arg_parser.parse_args()

# Start the application
if __name__ == '__main__':
    args = _parse_args()

    config = {
        'server': {
            'address': '127.0.0.1',
            'port': 5000
        },
        'db': {
            'host': None,
            'name': None,
            'username': None,
            'password': None
        }
    }

    try:
        config_file = os.path.abspath(os.path.expanduser( args.config ))
        with open( config_file, 'r' ) as file:
            config = json.load( file )
    except AttributeError as e:
        pass

    for arg in ['address', 'port']:
        try:
            config['server'][arg] = vars(args)[arg]
        except KeyError as e:
            pass

    for arg in ['host', 'name', 'user', 'password']:
        try:
            config['db'][arg] = vars(args)[arg]
        except KeyError as e:
            pass

    mongo = config['db']

    application.run(debug=True, host=config['server']['address'], port=config['server']['port'])
