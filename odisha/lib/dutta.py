from __future__ import division, print_function
# from crypt import methods
import json 
import time
from unicodedata import category
from flask import Flask ,render_template, request,jsonify
from flask_cors import CORS
# from flask_ngrok import run_with_ngrok
import pyrebase
import time
import os
app= Flask(__name__)
# run_with_ngrok(app)
CORS(app)


import sys
import os
import glob
import re
import numpy as np

# tensorflow
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename


model = tf.keras.models.load_model('waste.h5')


def model_predict(img_path,model):

    img = image.load_img(img_path,target_size=(64,64))
    #Preprocessing the image
    x=image.img_to_array(img)
    x=np.expand_dims(x,axis=0)
    result = model.predict(x)

    prediction = ''

    if result[0][0] == 1:
       prediction = 'recyclable waste'
    else:
      prediction = 'organic waste'

    return prediction





@app.route('/dutta',methods=['POST'])
def upload():


    print(request.data)
    getdata=request.get_json()  
    # getdata=jsonify(getdata)
    print((getdata))
  
        
    import pyrebase
    import os
    config={
    "apiKey": "AIzaSyBR1rLney0FtBpDbe0OpHZKrqXzF9FXM-Y",
    "authDomain": "upload-files-97fdd.firebaseapp.com",
    "projectId": "upload-files-97fdd",
    "storageBucket": "upload-files-97fdd.appspot.com",
    "messagingSenderId": "1056716980772",
    "appId": "1:1056716980772:web:cdd9cf363c8b0ea6f58eb1",
    "databaseURL":"https://upload-files-97fdd.firebaseio.com"
    
    }



    firebase=pyrebase.initialize_app(config)
    storage=firebase.storage()

    print(storage)
    path_on_cloud="/images/"+str(getdata)




    print(type(path_on_cloud))
    # storage.child(path_on_cloud).put(path_local)


    storage.child(path_on_cloud).download(filename="dutta.jpg",path=os.path.basename(path_on_cloud))
    time.sleep(4)

        
    file_path='./dutta.jpg'

        # make prediction
    preds = model_predict(file_path,model)

    return jsonify(preds)
    return None




    
    
    

if __name__ =='__main__':
    app.run(  port=3003,debug=True  )