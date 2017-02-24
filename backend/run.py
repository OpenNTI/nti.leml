from flask_globals import *
from flask import request
from db.leml import Lem, toLem
from mongoengine import *
import json

init()
application = get_global_app()
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
	'''json_string = '{"lem_id": 45, "startIDs": [1], "stopIDs": [3], "building_blocks": [{"id": 1, "block_type": "Information", "description": "Demonstration", "method": "Video"}, {"id": 2, "block_type": "Practice", "description": "Application Exercise", "method": "Assignment"}, {"id": 3, "block_type": "Dialogue", "description": "Lessons Learned", "method": "Discussion"}], "contexts": [{"id": 4, "context_type": "Online Asynchronous", "building_blocks": [1, 2, 3], "notations": []}], "actions": [{"id": 5, "action_type": "Learner Action", "source": 1, "target": 2}, {"id": 6, "action_type": "Learner Action", "source": 2, "target": 3}], "notations": []}'''
	json_string = request.args.get('obj')
	#db = connect(db_name)	
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

#Start the application
if __name__ == '__main__':
	application.run(debug=True)
