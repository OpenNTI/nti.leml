from flask_globals import *
from flask import request
from db.leml import Lem, toLem
from db.user import User as DBUser 
from mongoengine import *
import json

init()
application = get_global_app()
login_manager = get_login_manager()
host = 'mongodb://austinpgraham:lemldb@ds145289.mlab.com:45289/lemlcapstone'
name = 'leml'
in_use_id = [0]

#URL for getting a lem item
@app.route('/lem', methods = ['GET', 'POST'])
def lem():
	db = connect(name,host=host)
	obj = "Error"
	for lem in Lem.objects(_id = request.args.post('id')):
		obj = lem.to_json()
	db.close()
	return obj

#URL for getting all current lem objects in the database
@app.route('/lemall', methods = ['GET', 'POST'])
def lemall():
	db = connect(name,host=host)
	allobj = []
	for lem in Lem.objects:
		allobj.append(lem.to_json())
	db.close()
	return json.dumps(allobj)

#URL for getting user lems
@app.route('/lemuser', methods = ['GET', 'POST'])
def lemuser():
	if current_user.is_authenticated:
		db = connect(name, host = host)
		allobj = []
		for lem in Lem.objects(created_by = current_user.email):
			print(lem)
			allobj.append(lem.to_json())
		db.close()
		return json.dumps(allobj)
	else:
		return "User not logged in."
	
#URL for saving a lem object
@app.route('/save', methods = ['GET', 'POST'])
def save():
	if current_user.is_authenticated:
		json_string = request.args.post('obj')
		is_valid = validate_json(json_string)
		if is_valid is False:
			return "created_by user not in database."
		db = connect(name, host = host)
		toLem(json_string).save()
		db.close()
		return "Complete"
	else:
		return "User not logged in. Cannot save LEM."

#URL for deleting a lem objects
@app.route('/delete', methods = ['GET', 'POST'])
def delete():
	id = request.args.post('id')
	db = connect(name, host = host)
	for lem in Lem.objects(_id = id):
		lem.delete()
	db.close()
	return "Complete"

#URL for registering users
@app.route('/register', methods = ['GET', 'POST'])
def register():
	name = request.args.post('email')
	password = request.args.post('pass')
	pwd_hash = getHash(password)
	db = connect(name, host = host)
	DBUser(name, pwd_hash).save()
	db.close()
	return "Complete"

@app.route('/userexists', methods = ['GET'])
def user_exists():
	email = request.args.post('email')
	db = connect(name, host = host)
	exist = DBUser.objects(email__exists)
	db.close()
	return exist

#URL for login
@app.route('/login',methods = ['GET','POST'])
def login():
	name = request.args.post('email')
	password = request.args.post('pass')
	usr_ver = load_user(name)
	if usr_ver is None:
		return "User not found"
	pwd_ver = chckHash(usr_ver.password, password)
	if pwd_ver is True:
		login_user(usr_ver)
		usr_ver.is_authenticated = True
		return "Logged in"
	else:
		return "Invalid username or password"

@login_manager.user_loader
def load_user(id):
	db = connect(name, host=host)
	for user in DBUser.objects(email = id):
		if user.email == id:
			return User(user.email, user.password)
	return None

def validate_json(json_s):
	p_dict = json.loads(json_s)
	email = p_dict["created_by"]
	t_user = load_user(email)
	if t_user is None:
		return False
	return True	

#Start the application
if __name__ == '__main__':
	application.run(debug=True)
