from flask import Flask
from flask_login import LoginManager, login_user, logout_user, UserMixin
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

def getHash(password)
	return bcrypt.generate_password_hash(password)

def chckHash(password_hash, password)
	return bcrypt.check_password_hash(password_hash, password)

class User(UserMixin):
	email = ""
	password = ""	
	authenticated = False

	def __init__(self, email, password):
		self.email = email
		self.password = password

	def is_authenticated(self):
		return self.authenticated

	def get_id(self):
		return self.email
