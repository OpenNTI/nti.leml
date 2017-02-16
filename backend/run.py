from flask_globals import *
from flask import request
from db.leml import Lem
from mongoengine import *

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
	
#Start the application
if __name__ == '__main__':
	application.run(debug=True)
