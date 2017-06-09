#!/usr/bin/env python

from setuptools import setup
from setuptools import find_packages

setup(
    name='LEML Editor',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=['cffi==1.7.0',
                      'click==6.6',
                      'itsdangerous==0.24',
                      'Jinja2==2.8',
                      'Werkzeug==0.11.11',
                      'Flask==0.11.1',
                      'Flask-Login==0.3.2',
                      'Flask-Bcrypt==0.7.1',
                      'Flask-Bootstrap==3.3.7.0',
                      'six==1.10.0',
                      'pymongo>=2.7.1',
                      'mongoengine>=0.11.0',
                      'flask-api==0.7.1'],
    author="Austin Graham",
    author_email="austingraham731@gmail.com",
    url="https://nextthought.com"
)
