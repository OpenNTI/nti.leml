from flask_globals import *

init()
application = get_global_app()

#URL for getting a lem item
@app.route('/lem', methods = ['GET', 'POST'])
def lem():
	
	
#Start the application
if __name__ == '__main__':
	application.run(debug=True)
