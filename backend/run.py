from flask_globals import *
from flask import request
from db.leml import Lem, toLem
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

#URL for getting next available id
@app.route("/nextid", methods = ['GET', 'POST'])
def nextid():
	return str(in_use_id[-1] + 1)

@login_manager.userloader
def load_user(id):
	db = connect(name, host=host)
	for user in User.objects(user_id = id):
		if user.username == id:
			return User(user.username, user.password)
	return None

#Start the application
if __name__ == '__main__':
	application.run(debug=True)
