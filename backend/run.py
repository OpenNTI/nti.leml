from flask_globals import *
from flask import request
from db.leml import Lem
from mongoengine import *
import json

init()
application = get_global_app()

#URL for getting a lem item
@app.route('/lem', methods = ['GET', 'POST'])
def lem():
	db = connect('temp')
	obj = "Nothing bud"
	for lem in Lem.objects(lem_id = request.args.get('id')):
		obj = lem.to_json()
	db.close()
	return obj

#URL for getting all current lem objects in the database
@app.route('/lemall', methods = ['GET', 'POST'])
def lemall():
	db = connect('temp')
	allobj = []
	for lem in Lem.objects:
		allobj.append(lem.to_json())
	db.close()
	return json.dumps(allobj)
	
#Start the application
if __name__ == '__main__':
	application.run(debug=True)
