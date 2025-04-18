"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS 
from flask_jwt_extended import create_access_token
api = Blueprint('api', __name__)
from werkzeug.security import generate_password_hash, check_password_hash

# Allow CORS requests to this API
CORS(api)

 # get
@api.route('/login', methods=['POST'])
def handle_login():

   
    email = request.json.get("email")
    password = request.json.get("password")
    find_user = User.query.filter_by(email = email).first()
    
    if not check_password_hash(find_user.password,password):
          return jsonify("login failed")

    token = create_access_token(identity = email)
    return jsonify(token_value = token), 200

   
   #post

@api.route('/signup', methods=['POST'])
def handle_signup():
    email_value = request.json.get("email")
    password = request.json.get("password")
    find_user = User.query.filter_by(email=email_value).first() 

    new_user = User(
        email=email_value,
        password=generate_password_hash(password)
    )
    db.session.add(new_user)
    db.session.commit()


    return jsonify("user created"), 200

