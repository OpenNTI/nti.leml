from mongoengine import *

db = connect("temp")

BLOCK_TYPE = ("Information", "Dialogue", "Feedback", "Practice", "Evidence")
CONTEXT_TYPE = ("Classroom", "Online Synchronous", "Online Asynchronous", "Experiential")
ACTION_TYPE = ("Learner Action", "Facilitator Action", "System Action")

# Block Model
class Block(EmbeddedDocument):
	id = IntField(required=True, unique=True)
	block_type = StringField(required=True, choices=BLOCK_TYPE)
	description = StringField()
	method = StringField(required=True)

# Context Model
class Context(EmbeddedDocument):
	id = IntField(required=True, unique=True)
	context_type = StringField(required=True, choices=CONTEXT_TYPE)
	building_blocks = ListField(IntField())
	actions = ListField(IntField())
	notations = ListField(IntField())

# Action Model
class Action(EmbeddedDocument):
	id = IntField(required=True, unique=True)
	action_type = StringField(required=True, choices=ACTION_TYPE)
	arrow_tail = IntField(required=True)
	arrow_head = IntField(required=True)

# Notation Model
class Notation(EmbeddedDocument):
	building_block = IntField(required=True)
	description = StringField(required=True)

# LEM Model
class Lem(Document):
	startIDs = ListField(IntField())
	stopIDs = ListField(IntField())
	building_blocks = ListField(EmbeddedDocumentField(Block), required=True)
	contexts = ListField(EmbeddedDocumentField(Context), required=True)
	actions = ListField(EmbeddedDocumentField(Action), required=True)
	notations = ListField(EmbeddedDocumentField(Notation))

block1 = Block(id=1, block_type="Information", description="Demonstration", method="Video")
block2 = Block(id=2, block_type="Practice", description="Application Exercise", method="Assignment")
block3 = Block(id=3, block_type="Dialogue", description="Lessons Learned", method="Discussion")
context1 = Context(id=4, context_type="Online Asynchronous", building_blocks=[1, 2, 3], actions=[5, 6], notations=[])
action1 = Action(id=5, action_type="Learner Action", arrow_tail=1, arrow_head=2)
action2 = Action(id=6, action_type="Learner Action", arrow_tail=2, arrow_head=3)
lemExample = Lem(startIDs=[1], stopIDs=[3], building_blocks=[block1, block2, block3], contexts=[context1], actions=[action1, action2], notations=[]).save()

for lem in Lem.objects:
	print("Start ID's: %s" % lem.startIDs)
	print("Stop ID's: %s" % lem.stopIDs)
	print("Building Blocks: ")
	for block in lem.building_blocks:
		print("ID: %d, Type: %s, Description: %s, Method: %s" % (block.id, block.block_type, block.description, block.method))
	print("Contexts: ") 
	for context in lem.contexts:
		print("ID: %d, Context Type: %s, Building Blocks: %s, Actions: %s, Notations: %s" % (context.id, context.context_type, context.building_blocks, 
			  context.actions, context.notations))
	print("Actions: ")
	for action in lem.actions:
		print("ID: %d, Type: %s, Tail: %d, Head: %d" % (action.id, action.action_type, action.arrow_tail, action.arrow_head))
	print("Notations: ")
	for notation in lem.notations:
		print("Building Block: %d, Description: %s" % (notation.building_block, notation.description))

db.drop_database("temp")