from mongoengine import *
from .user import User
from .leml import Lem

class Ratings(Document):
	user = ReferenceField(User, required=True)
	rating = FloatField(required=True)
	lem = ReferenceField(Lem, required=True)
