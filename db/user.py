from mongoengine import *

class User(Document):
	email = EmailField(primary_key=True, required=True, unique=True)
	password = StringField(required=True)