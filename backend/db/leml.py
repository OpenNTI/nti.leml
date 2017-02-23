from mongoengine import *

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
	actions = ListField(IntField())
	notations = ListField(IntField())

# Action Model
class Action(EmbeddedDocument):
	id = IntField(required=True)
	action_type = StringField(required=True, choices=ACTION_TYPE)
	arrow_tail = IntField(required=True)
	arrow_head = IntField(required=True)

# Notation Model
class Notation(EmbeddedDocument):
	building_block = IntField(required=True)
	description = StringField(required=True)

# LEM Model
class Lem(Document):
	lem_id = IntField(required=True, unique=True)
	startIDs = ListField(IntField())
	stopIDs = ListField(IntField())
	building_blocks = ListField(EmbeddedDocumentField(Block), required=True)
	contexts = ListField(EmbeddedDocumentField(Context), required=True)
	actions = ListField(EmbeddedDocumentField(Action), required=True)
	notations = ListField(EmbeddedDocumentField(Notation))
