from mongoengine import *
from db.leml import Lem, toLem, Comment

def getById(id, name, host):
	db = connect(name,host=host)
	obj = "No LEM found"
	for lem in Lem.objects(pk = id):
		obj = lem.to_json()
	db.close()
	return obj

def save(data, current_user, name, host):
	db = connect(name, host = host)
	toLem(data, current_user.email).save()
	db.close()
	return "Successfully saved LEM."

def delete(id, name, host):
	db = connect(name, host = host)
	happened = False
	for lem in Lem.objects(pk = id):
		happened = True
		lem.delete()
	db.close()
	if happened is True:
		return "Successfully deleted LEM."
	elif happened is False:
		return "No LEM found"
	return "No work done."
