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

def toLem(json_string):
	python_dict = json.loads(json_string)
	block_objs = []
	for block in python_dict["building_blocks"]:
		block_objs.append(Block(id=block["id"], block_type=block["block_type"], description=block["description"], method=block["method"]))
	notation_objs = []
	for notation in python_dict["notations"]:
		notation_objs.append(Notation(building_block=notation["building_block"], description=notation["description"]))
	context_objs = []
	for context in python_dict["contexts"]:
		context_objs.append(Context(id=context["id"], context_type=context["context_type"], building_blocks=context["building_blocks"], notations=context["notations"]))
	action_objs = []
	for action in python_dict["actions"]:
		action_objs.append(Action(id=action["id"], action_type=action["action_type"], source=action["source"], target=action["target"])) 
	lem = Lem(name=python_dict["name"], created_by=User(python_dict["created_by"], ""), startIDs=python_dict["startIDs"], stopIDs=python_dict["stopIDs"], building_blocks=block_objs, contexts=context_objs, actions=action_objs, notations=notation_objs)
	return lem
