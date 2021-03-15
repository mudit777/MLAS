#from flask-api import FlaskAPI
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import pandas as pd
# import csv
# import re
import numpy as np
from numpy import array
import json
import pandasql as ps
from flask_pymongo import pymongo
import boto3
from werkzeug.utils import secure_filename
import config.py as keys



pd.set_option('display.max_colwidth', -1)

CONNECTION_STRING = "mongodb://john:1234@cluster0-shard-00-00.xo0bk.mongodb.net:27017,cluster0-shard-00-01.xo0bk.mongodb.net:27017,cluster0-shard-00-02.xo0bk.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8eek1z-shard-0&authSource=admin&retryWrites=true&w=majority"


client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database("MLAS")
user_collection = pymongo.collection.Collection(db, 'user')

s3 = boto3.client('s3',
                    aws_access_key_id='AKIAINHXKX3DB35N2CUQ',
                    aws_secret_access_key= '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',
                    # aws_session_token='secret token here'
                     )
BUCKET_NAME='mlaas-cmpe295b'

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    @app.route('/myapi/', methods=['GET'])
    def ask():
        print("Hiii")
        response = jsonify({'msg': "Success!"})
        response.status_code = 200
        return response
    
    @app.route("/test", methods = ['GET'])
    def test():
        for x in db.user.find():
            print(x)
        response = jsonify({'msg': "SucConnected to the data base!!"})
        response.status_code = 200
        # response.data = json.loads(cols);
        return response

    @app.route('/login', methods = ['POST'])
    def login():
        data = json.loads(request.data)
        print(data)
        user = db.user.find_one({"email" : data["email"]})
        response = {}
        if user != None:    
            if(data['password'] == user['password']):
                response = jsonify({'msg': "Success!"})
                response.status_code = 200
            else:
                response = jsonify({'msg': "Wrong Credentials!"})
                response.status_code = 209
        else:
            response = jsonify({'msg': "No such user"})
            response.status_code = 207
        return response;
    
    @app.route('/signUp', methods = ['POST'])
    def signUp():
        data = json.loads(request.data)
        print(data)
        response = {}
        if db.user.find_one({"email" : data["email"]}) != None:
            print("Exists")
            response = jsonify({'msg': "User Already exists!"})
            # response["message"] = "User Already Exists"
            response.status_code = 299
        else:
            result = db.user.insert_one({
                "first_name" : data['first_name'],
                "last_name"  : data['last_name'],
                "email" : data['email'],
                "password" : data['password']
            })
            print("Doesnt exists")
            response = jsonify({'msg': "Success!"})
            response.status_code = 200
        print(response)
        
        
        return response;
    
    @app.route('/uploadFile', methods = ['POST'])
    def uploadFile():
        # data = json.loads(request.data)
        file = request.files['file']
        if file:
            filename = secure_filename(file.filename)
            file.save(filename)
            # link = "https://s3.us-west-1.amazonaws.com/glassdoorcmpe273/" + filename
            temp = s3.upload_file(
                Bucket = BUCKET_NAME,
                Filename=filename,
                Key = filename
            )
            # file.remove(filename)
            link = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/" + filename
            print(link)
        response = jsonify({'msg': "Success!"})
        response.status_code = 200
        # print(response)
        return response



    return app
