from mongoengine import *
db = connect('temp')
db.drop_database('temp')
