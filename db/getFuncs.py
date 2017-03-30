from mongoengine import *
from db.leml import Lem, toLem, Comment

def getById(id, name, host):
	db = connect(name,host=host)
	obj = "Error"
	for lem in Lem.objects(_id = id):
		obj = lem.to_json()
	db.close()
	return obj

def save(data, current_user, name, host):
	is_valid = validate_json(data)
	if is_valid is False:
		return "created_by user not in database."
	db = connect(name, host = host)
	toLem(data, current_user.email).save()
	db.close()
	return "Successfully saved LEM."

def delete(id, name, host):
	db = connect(name, host = host)
	for lem in Lem.objects(_id = id):
		lem.delete()
	db.close()
	return "Successfully deleted LEM."
