from flask import Flask
from flask_login import LoginManager, login_user, logout_user
from flask_bcrypt import Bcrypt
from mongoengine import *

login_manager = LoginManager()
app = Flask(__name__)
bcrpyt = Bcrypt()

def init():
	login_manager.init_app(app)

def get_login_manager():
	return login_manager

def get_global_app():
	return app

class User(UserMixin):
	username = ""
	password = ""	
	authenticated = False

	def __init__(self, username, password):
		self.username = username
		self.password = password

	def is_authenticated(self):
		return self.authenticated

	def get_id(self):
		return self.username
