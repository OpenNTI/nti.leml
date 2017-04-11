from mongoengine import *
from .user import User
import json
import datetime

BLOCK_TYPE = ("Information", "Dialogue", "Feedback", "Practice", "Evidence")
CONTEXT_TYPE = ("Classroom", "Online Synchronous", "Online Asynchronous", "Experiential")
ACTION_TYPE = ("Learner Action", "Facilitator Action", "System Action")

# Block Model
class Block(EmbeddedDocument):
	id = IntField(required=True)
	block_type = StringField(required=True, choices=BLOCK_TYPE)
	description = StringField()
	method = StringField(required=True)

# Context Model
class Context(EmbeddedDocument):
	id = IntField(required=True)
	context_type = StringField(required=True, choices=CONTEXT_TYPE)
	building_blocks = ListField(IntField())
	notations = ListField(IntField())

# Action Model
class Action(EmbeddedDocument):
	id = IntField(required=True)
	action_type = StringField(required=True, choices=ACTION_TYPE)
	description = StringField ()
	source = IntField(required=True)
	target = IntField(required=True)

# Notation Model
class Notation(EmbeddedDocument):
	building_block = IntField(required=True)
	description = StringField(required=True)

#Comment Model
class Comment(Document):
	lem_id = StringField(required=True)
	text = StringField(required=True)
	created_by = ReferenceField(User, required=True)
	date_created = DateTimeField(default=datetime.datetime.now())

# LEM Model
class Lem(Document):
	name = StringField(required=True)
	created_by = ReferenceField(User, required=True)
	date_created = DateTimeField(default=datetime.datetime.now())
	startIDs = ListField(IntField())
	stopIDs = ListField(IntField())
	building_blocks = ListField(EmbeddedDocumentField(Block), required=True)
	contexts = ListField(EmbeddedDocumentField(Context), required=True)
	actions = ListField(EmbeddedDocumentField(Action), required=True)
	notations = ListField(EmbeddedDocumentField(Notation))
	ratings  = ListField(FloatField(default = 0))
	avgRating = FloatField(default = 0)
	thumbnail = StringField(default = "")
	public  = IntField(default = 0)

def toLem(json_dict, user_email):
	block_objs = []
	for block in json_dict["building_blocks"]:
		block_objs.append(Block(id=block["id"], block_type=block["block_type"], description=block["description"], method=block["method"]))
	notation_objs = []
	for notation in json_dict["notations"]:
		notation_objs.append(Notation(building_block=notation["building_block"], description=notation["description"]))
	context_objs = []
	for context in json_dict["contexts"]:
		context_objs.append(Context(id=context["id"], context_type=context["context_type"], building_blocks=context["building_blocks"], notations=context["notations"]))
	action_objs = []
	for action in json_dict["actions"]:
		action_objs.append(Action(id=action["id"], action_type=action["action_type"], source=action["source"], target=action["target"])) 
	lem = Lem(name=json_dict["name"], created_by=user_email, startIDs=json_dict["startIDs"], stopIDs=json_dict["stopIDs"], building_blocks=block_objs, contexts=context_objs, actions=action_objs, notations=notation_objs, thumbnail = json_dict["thumbnail"], public = json_dict["public"])
	return lem
