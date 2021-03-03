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

pd.set_option('display.max_colwidth', -1)

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    @app.route('/myapi/', methods=['GET'])
    def ask():
        print("Hiii")
        response = jsonify({'msg': "Nima chodu!"})
        response.status_code = 200
        return response

    


    return app
