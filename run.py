from flask_globals import *
from flask import request, render_template
from db.leml import Lem, toLem, Comment
from db.user import User as DBUser
from mongoengine import *
import json
from bson import ObjectId
from getFuncs import *

init()
application = get_global_app()
login_manager = get_login_manager()
host = 'mongodb://austinpgraham:lemldb@ds145289.mlab.com:45289/lemlcapstone'
name = 'leml'

#URL for getting a lem item
@app.route('/lem', methods = ['GET', 'POST', 'PUT', 'DELETE'])
@login_required
def lem():
	data = request.get_json(force = True)
	if request.method == 'GET':
		return getById(data['id'], name, host)
	elif request.method == 'POST':
		if validate_json(data['json']) not True:
			return "Cannot find user"
		save(data['json'], current_user, name, host)
	elif request.method == 'PUT':
		save(data['json'], current_user, name, host)
	elif request.method == 'DELETE':
		delete(data['id'], name, host)		

#URL for getting all current lem objects in the database
@app.route('/lemall', methods = ['GET'])
def lemall():
	db = connect(name,host=host)
	allobj = []
	for lem in Lem.objects():
		allobj.append(lem.to_json())
	db.close()
	return json.dumps(allobj)

#URL for getting user lems
@app.route('/lemuser', methods = ['GET'])
@login_required
def lemuser():
	db = connect(name, host = host)
	allobj = []
	for lem in Lem.objects(created_by = current_user.email):
		allobj.append(lem.to_json())
	db.close()
	return json.dumps(allobj)

#URL for registering users
@app.route('/register', methods = ['POST'])
def register():
	data = request.get_json(force=True)
	usr_name = data['email']
	password = data['pass']
	pwd_hash = getHash(password)
	db = connect(name, host = host)
	DBUser(usr_name, pwd_hash).save()
	db.close()
	return "Successfully registered user."

@app.route('/userexists', methods = ['GET'])
def user_exists():
	data = request.get_json(force = True)
	email = data['email']
	db = connect(name, host = host)
	exist = DBUser.objects(email__exists)
	db.close()
	return exist

#URL for login
@app.route('/login',methods = ['POST'])
def login():
	data=request.get_json(force=True)
	name = data['email']
	password = data['pass']
	usr_ver = load_user(name)
	if usr_ver is None:
		return "User not found"
	pwd_ver = chckHash(usr_ver.password, password)
	if pwd_ver is True:
		login_user(usr_ver)
		return "Logged in"
	else:
		return "Invalid username or password"

@app.route('/logout', methods = ['POST'])
@login_required
def logout():
	logout_user()
	return redirect(url_for('home'))

@app.route('/public')
def public():
	return render_template("public.html")
	
@app.route('/')
def home():
	return render_template("index.html")

@app.route('/comment', methods = ['POST'])
@login_required
def comment():
	data = request.get_json(force=True)
	lem_id_c = ObjectId(data["lem"])
	text = data["text"]
	created_by = current_user.email
	db = connect(name, host = host)
	for lem in Lem.objects(pk = lem_id_c):
		Comment(lem_id = str(lem_id_c), text = text, created_by = created_by).save()
	db.close()
	return "Commented"

@app.route('/getComments', methods = ['POST'])
def getComments():
	data = request.get_json(force=True)
	lem_id_c = data["lem"]
	comments = []
	for comment in Comment.objects(lem_id = lem_id_c):
		comments.append(comment.to_json())
	return json.dumps(comments)

@app.route('/rate', methods = ['POST'])
def rate():
	data = request.get_json(force=True)
	new_rating = float(data["rating"])
	lem_id = ObjectId(data["lem"])
	for lem in Lem.objects(pk = lem_id):
		lem.ratings.append(new_rating)
		lem.avgRating = sum(lem.ratings) / float(len(lem.ratings))
		lem.save()
	return "Done"

@login_manager.user_loader
def load_user(id, remember=True):
	db = connect(name, host=host)
	for user in DBUser.objects(email = id):
		return User(user.email, user.password)
	return None

def validate_json(json_dict):
	t_user = load_user(current_user.email)
	if t_user is None:
		return False
	return True

#Start the application
if __name__ == '__main__':
	application.run(debug=True)
