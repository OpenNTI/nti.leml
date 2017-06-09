from mongoengine import *
from db.leml import Lem, toLem, Comment

def getById(id, mongo):
	db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
	obj = "No LEM found"
	for lem in Lem.objects(pk = id):
		obj = lem.to_json()
	db.close()
	return obj

def save(data, current_user, mongo):
	db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
	toLem(data, current_user.email).save()
	db.close()
	return "Successfully saved LEM."

def delete(id, mongo):
	db = connect(db=mongo["name"],
                 host=mongo["host"],
                 username=mongo["username"],
                 password=mongo["password"])
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
