from mongoengine import *
from .user import User
from .leml import Lem

class User_Favorite_Lems(Document):
	user = ReferenceField(User, primary_key=True)
	favorites = ListField(ReferenceField(Lem))