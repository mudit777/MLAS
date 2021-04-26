#from flask-api import FlaskAPI
from flask import Flask
from flask import request, jsonify
import matplotlib
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
import pandas as pd  
import os
from bson import ObjectId
from sklearn.preprocessing import LabelEncoder
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Qt5Agg')
from flask import send_file

encoders = {} 
encoders['label_encoding'] = LabelEncoder()





pd.set_option('display.max_colwidth', -1)

CONNECTION_STRING = "mongodb://john:1234@mlas-shard-00-00.xo0bk.mongodb.net:27017,mlas-shard-00-01.xo0bk.mongodb.net:27017,mlas-shard-00-02.xo0bk.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5l9g09-shard-0&authSource=admin&retryWrites=true&w=majority"


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
            print("User ----->")
            print(user['_id'])
            if(data['password'] == user['password']):
                if isinstance(user['_id'], ObjectId):
                    user['_id'] = str(user['_id'])
                response = jsonify({'msg': "Success!", 'user' : user})
                # response.status_code = 200

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
        file = request.files['file']
        data = request.form['user_id']
        print(data)
        response = {}
        result = {}
        if file:
            filename = secure_filename(file.filename)
            file.save(filename)
            s3.upload_file(
                Bucket = BUCKET_NAME,
                Filename=filename,
                Key = filename,
                ExtraArgs={'ACL':'public-read'}
            )
            os.remove(filename)
            link = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/" + filename
            print(link)
            data = pd.read_csv(link)
            cols = []
            for col in data.columns.values:
                cols.append(col)
            values = []
            for i in data.index:
                values.append(data.loc[i].to_json())
            response['cols'] = cols
            response['values'] = values
            response['fileLink'] = link
            response['fileName'] = filename
            
        return json.dumps(response)

    
    @app.route('/updateFile', methods = ["POST"])
    def updateFile():
        request_data = json.loads(request.data)
        data_frame = pd.read_csv(request_data['file'])
        fileName = request_data['file_name']
        for col in request_data['columns']:
            del data_frame[col]
        file = os.path.dirname(os.path.realpath(__file__)) +"/Temp_files/new_" + fileName 
        data_frame.to_csv(file)
        fileName = "new_" + fileName
        s3.upload_file(
            Bucket = BUCKET_NAME,
            Filename=file,
            Key = fileName,
            ExtraArgs={'ACL':'public-read'}
        )
        link = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/" + fileName
        print(link)
        response = {}
        cols = []     
        for col in data_frame.columns.values:
            cols.append(col)
        values = []
        for i in data_frame.index:
            values.append(data_frame.loc[i].to_json())
        response['cols'] = cols
        response['values'] = values
        response['fileLink'] = link
        response['fileName'] = fileName 
        return json.dumps(response)

    @app.route('/encodeColumns', methods = ['POST'])
    def encodeColumns():
        request_data = json.loads(request.data)
        print(request_data)
        data_frame = pd.read_csv(request_data['file'])
        columns = request_data['columns']
        print(columns)
        for col in columns:
            print(col)
            if columns[col] == 'label_encoding':
                data_frame[col] = encoders[columns[col]].fit_transform(data_frame[col])
            elif columns[col] == 'one_hot_encoding':
                temp = pd.get_dummies(data_frame[col])
                data_frame = pd.concat([data_frame, temp], axis = 1)
                del data_frame[col]
                # print("pass")
        # print(data_frame)
        fileName = request_data['file_name']
        file = os.path.dirname(os.path.realpath(__file__)) +"/Temp_files/encoded_" + fileName 
        data_frame.to_csv(file)
        fileName = "encoded_" + fileName
        s3.upload_file(
            Bucket = BUCKET_NAME,
            Filename=file,
            Key = fileName,
            ExtraArgs={'ACL':'public-read'}
        )
        link = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/" + fileName
        print(link)
        response = {}
        cols = []     
        for col in data_frame.columns.values:
            cols.append(col)
        values = []
        for i in data_frame.index:
            values.append(data_frame.loc[i].to_json())
        response['cols'] = cols
        response['values'] = values
        response['fileLink'] = link
        response['fileName'] = fileName 
        return json.dumps(response)

    @app.route('/pairPlot', methods = ['POST'])
    def pairPlot():
        request_data = json.loads(request.data)
        data_frame = pd.read_csv(request_data['file'])
        print(data_frame)
        graph = sns.pairplot(data_frame)
        
        fileName = "3.png"
        plt.savefig(fileName)
        file = "../" + fileName
        data_frame.to_csv(file)
        fileName = fileName
        s3.upload_file(
            Bucket = BUCKET_NAME,
            Filename=file,
            Key = fileName,
            ExtraArgs={'ACL':'public-read'}
        )
        link = "https://s3.us-east-1.amazonaws.com/mlaas-cmpe295b/" + fileName
        print(link)
        return send_file( "../2.png", mimetype='image/png')
        
    @app.route('/run_automl', methods = ['POST'])
    def run_automl():
        pass

    return app
