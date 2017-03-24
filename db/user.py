from mongoengine import *

class User(Document):
	email = EmailField(primary_key=True)
	password = StringField(required=True)