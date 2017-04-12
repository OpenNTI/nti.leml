from flask_globals import *
from flask import request, render_template, session
from db.leml import Lem, toLem, Comment
from db.user import User as DBUser
from db.user_favorite_lems import User_Favorite_Lems
from mongoengine import *
from bson import ObjectId
import json
from getFuncs import *
import sys

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
DEFAULT_FAVORITES = ["58de81a29a93ac144a594fa7"]

init()
application = get_global_app()
login_manager = get_login_manager()
host = 'mongodb://austinpgraham:lemldb@ds145289.mlab.com:45289/lemlcapstone'
name = 'leml'


# URL for getting a lem item
@app.route('/lem', methods=['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def lem():
	data = request.get_json(force=True)
	print(data)
	if request.method == 'GET':
		id = request.args.get('id')
		return getById(ObjectId(id), name, host)
	if request.method == 'DELETE':
		db = connect(name, host=host)
		for fave in User_Favorite_Lems.objects(ObjectId(data['id']) in favorites):
		    fave.update(pull__favorites=ObjectId(data['id']))
		db.close()
		return delete(ObjectId(data['id']), name, host)
	return save(data['json'], current_user, name, host)

# URL for getting all current lem objects in the database
@app.route('/lemall', methods=['GET'])
def lemall():
    db = connect(name, host=host)
    allobj = []
    for lem in Lem.objects(public=1):
        allobj.append(lem.to_json())
    db.close()
    return json.dumps(allobj)

# URL for getting user lems
@app.route('/lemuser', methods=['GET'])
@login_required
def lemuser():
    db = connect(name, host=host)
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
    db = connect(name, host=host)
    DBUser(usr_name, pwd_hash).save()
    User_Favorite_Lems(usr_name, DEFAULT_FAVORITES).save()
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
        return "{}"
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
        return "User not found"
    pwd_ver = chckHash(usr_ver.password, password)
    if pwd_ver is True:
        session['logged_in'] = True
        login_user(usr_ver)
        return "Logged in"
    else:
        return "Invalid username or password"


@app.route('/logout', methods=['POST'])
@login_required
def logout():
    session['logged_in'] = False
    logout_user()
    return redirect(url_for('home'))


@app.route('/public')
def public():
    return render_template("public.html")


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/comment', methods = ['GET', 'POST'])
@login_required
def comment():
	if request.method == 'GET':
		lem_id = request.args.get('lem')
		comments = []
		for comment in Comment.objects(lem_id = lem_id):
			include = True
			for lem in Lem.objects(pk = lem_id):
				if lem.public == 0 and lem.created_by.email != current_user.email:
					include = False
					break
			if include:
				comments.append(comment.to_json())
		return json.dumps(comments)
	elif request.method == 'POST':
		data = request.get_json(force=True)
		lem_id = ObjectId(data["lem"])
		text = data["text"]
		created_by = current_user.email

		db = connect(name, host = host)

		# Check that a private lem is not being accessed
		for lem in Lem.objects(pk = lem_id):
			if lem.public == 0 and lem.created_by.email != current_user.email:
				return "Cannnot comment on a private lem not owned by you"

		resultComment = {}
		for lem in Lem.objects(pk = lem_id):
			comment = Comment(lem_id = str(lem_id), text = text, created_by = created_by)
			comment.save()
			resultComment = comment.to_json()
		db.close()
		return resultComment

@app.route('/rate', methods=['POST'])
def rate():
    data = request.get_json(force=True)
    new_rating = float(data["rating"])
    lem_id = ObjectId(data["lem"])
    new_avg = 0
    for lem in Lem.objects(pk=lem_id):
        lem.ratings.append(new_rating)
        new_avg = sum(lem.ratings) / float(len(lem.ratings))
        lem.avgRating = new_avg
        lem.save()
    return new_avg


@app.route('/favorite', methods=['GET', 'PUT', 'DELETE'])
@login_required
def favorite():
    db = connect(name, host=host)
    if request.method == 'GET':
        allobj = []
        user = User_Favorite_Lems.objects(pk=User(current_user.email))
        for lem in Lem.objects(pk in user.favorites):
            allobj.append(lem.to_json())
        db.close()
        return json.dumps(allobj)
    id = ObjectId(request.args.get('id'))
    if request.method == 'DELETE':
        User_Favorite_Lems.objects(pk=User(current_user.email)).update(pull__favorites=id)
        db.close()
        return "Removed Lem from favorites."
    User_Favorite_Lems.objects(pk=User(current_user.email)).update(push__favorites=id)
    db.close()
    return "Added Lem to favorites."


@login_manager.user_loader
def load_user(id, remember=True):
    db = connect(name, host=host)
    for user in DBUser.objects(pk=id):
        return User(user.email, user.password)
    return None


def validate_json(json_dict):
    t_user = load_user(current_user.email)
    if t_user is None:
        return False
    return True


# Start the application
if __name__ == '__main__':
	if len(sys.argv) > 1:
		application.run(debug=True, host=sys.argv[1], port=int(sys.argv[2]))
	else:
		application.run(debug=True)
