from flask_globals import *
from flask import request, render_template
from db.leml import Lem, toLem, Comment
from db.user import User as DBUser
from mongoengine import *
from bson import ObjectId
import json
from bson import ObjectId

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

init()
application = get_global_app()
login_manager = get_login_manager()
host = 'mongodb://austinpgraham:lemldb@ds145289.mlab.com:45289/lemlcapstone'
name = 'leml'
in_use_id = [0]

#URL for getting a lem item
@app.route('/lem', methods = ['GET'])
def lem():
	id = ObjectId(request.args.get('id'))
	db = connect(name, host = host)
	obj = "Error"
	for lem in Lem.objects(pk = id):
		obj = lem.to_json()
	db.close()
	return obj

#URL for getting all current lem objects in the database
@app.route('/lemall', methods = ['GET'])
def lemall():
	db = connect(name, host = host)
	allobj = []
	for lem in Lem.objects:
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
		#comments = []
		#for comment in Comment.objects(lem = lem.name):
		#	comments.append(comment.to_json())
		#allobj.append(comments)
	db.close()
	#print(allobj)
	return json.dumps(allobj)

#URL for saving a lem object
@app.route('/save', methods = ['POST'])
@login_required
def save():
	data = request.get_json(force = True)
	is_valid = validate_json(data)
	if is_valid is False:
		return "created_by user not in database."
	db = connect(name, host = host)
	toLem(data, current_user.email).save()
	db.close()
	return "Successfully saved LEM."

#URL for deleting a lem objects
@app.route('/delete', methods = ['DELETE'])
def delete():
	id = ObjectId(request.args.get('id'))
	db = connect(name, host = host)
	for lem in Lem.objects(pk = id):
		lem.delete()
	db.close()
	return "Successfully deleted LEM."

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
