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
	obj = "error"
	for lem in Lem.objects(lem_id = request.args.get('id')):
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
	
#URL for saving a lem object
@app.route('/save', methods = ['GET', 'POST'])
def save():
	json_string = request.args.get('obj')
	db = connect(name, host = host)
	toLem(json_string).save()
	db.close()
	return "complete"

#URL for deleting a lem objects
@app.route('/delete', methods = ['GET', 'POST'])
def delete():
	id = request.args.get('id')
	db = connect(name, host = host)
	for lem in Lem.objects(lem_id = id):
		lem.delete()
	db.close()
	return 'complete'

#URL for registering users
@app.route('/register', methods = ['GET', 'POST'])
def register():
	name = request.args.get('email')
	password = request.args.get('pass')
	pwd_hash = getHash(password)
	db = connect(name, host = host)
	User(name, pwd_hash).save()
	db.close()
	return 'complete'

#URL for login
@app.route('/login',methods = ['GET','POST'])
def login():
	name = request.args.get('email')
	password = request.args.get('pass')
	usr_ver = load_user(name)
	if usr_ver is None:
		return 'User not found'
	pwd_ver = chckHash(usr_ver.password, password)
	if pwd_ver is True:
		login_user(usr_ver)
		return 'logged in'
	else:
		return 'Invalid username or password'

@login_manager.user_loader
def load_user(id):
	db = connect(name, host=host)
	for user in DBUser.objects(email = id):
		if user.email == id:
			return User(user.email, user.password)
	return None

#Start the application
if __name__ == '__main__':
	application.run(debug=True)
