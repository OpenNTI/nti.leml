from flask import Flask
from flask_login import LoginManager, login_user, logout_user
from flask_bcrypt import Bcrypt

login_manager = LoginManager()
app = Flask(__name__)
bcrpyt = Bcrypt()

def init():
	login_manager.init_app(app)

def get_login_manager();
	return login_manager

def get_global_app():
	return app
