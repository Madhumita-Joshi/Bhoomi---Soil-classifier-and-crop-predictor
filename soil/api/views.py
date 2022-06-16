from functools import partial
import io as parseio
from multiprocessing.dummy import JoinableQueue
from tkinter.tix import Tree
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import joblib

from rest_framework.renderers import JSONRenderer 
from rest_framework.parsers import JSONParser
import urllib.request
from skimage import io
from joblib import load
import pickle
import numpy as np
import pandas as pd
from imutils import paths
import os.path
import cv2
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn import svm
from sklearn.preprocessing import LabelEncoder
from scipy.stats import kurtosis,skew
from skimage.filters.rank import entropy
from sklearn.model_selection import train_test_split
from statistics import mean
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from PIL import Image
from skimage import io
import urllib.request

model = load('models/modelpkl.pkl')

# Create your views here.


def meanfilter(image, kernel,padding,strides):

    # Gather Shapes of Kernel + Image + Padding
    xKernShape = kernel.shape[0]
    yKernShape = kernel.shape[1]
    xImgShape = image.shape[0]
    yImgShape = image.shape[1]

    # Shape of Output Convolution
    xOutput = int(((xImgShape - xKernShape + 2 * padding) / strides) + 1)
    yOutput = int(((yImgShape - yKernShape + 2 * padding) / strides) + 1)
    output = np.zeros((xOutput, yOutput))

    # Apply Equal Padding to All Sides
    if padding != 0:
        imagePadded = np.zeros((image.shape[0] + padding*2, image.shape[1] + padding*2))
        imagePadded[int(padding):int(-1 * padding), int(padding):int(-1 * padding)] = image
        #print(imagePadded)

    else:
        imagePadded = image

    # Iterate through image
    for y in range(imagePadded.shape[1]):
        # Exit Convolution
        if y > imagePadded.shape[1] - yKernShape:
            break
        
        for x in range(image.shape[0]):
            # Go to next row once kernel is out of bounds
            if x > imagePadded.shape[0] - xKernShape:
                break
            else:
                output[x,y] = ((imagePadded[x: x + xKernShape, y: y + yKernShape]).sum())
    return output



def convolve2D(image, kernel, padding,strides):

    # Gather Shapes of Kernel + Image + Padding
    xKernShape = kernel.shape[0]
    yKernShape = kernel.shape[1]
    xImgShape = image.shape[0]
    yImgShape = image.shape[1]

    # Shape of Output Convolution
    xOutput = int(((xImgShape - xKernShape + 2 * padding) / strides) + 1)
    yOutput = int(((yImgShape - yKernShape + 2 * padding) / strides) + 1)
    output = np.zeros((xOutput, yOutput))

    # Apply Equal Padding to All Sides
    if padding != 0:
        imagePadded = np.zeros((image.shape[0] + padding*2, image.shape[1] + padding*2))
        imagePadded[int(padding):int(-1 * padding), int(padding):int(-1 * padding)] = image
        #print(imagePadded)

    else:
        imagePadded = image

    # Iterate through image
    for y in range(imagePadded.shape[1]):
        # Exit Convolution
        if y > imagePadded.shape[1] - yKernShape:
            break
        
        
        for x in range(image.shape[0]):
            # Go to next row once kernel is out of bounds
            if x > imagePadded.shape[0] - xKernShape:
                break
            else:
                output[x, y] = (kernel * imagePadded[x: x + xKernShape, y: y + yKernShape]).sum()
                

    return output


def soil_prediction(path):
    
    print(path)
    #img = cv2.imread(r"C:\Users\bjyad\Downloads\Soil_Data\bs.jpg")
    img = io.imread(path)
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    resized_img = cv2.resize(gray_img,(220,220))
    numpydata1 = np.asarray(resized_img)
    
    #### 
    L5 = np.array([1,4,6,4,1])
    L5=L5.reshape(1,5)
    E5 = np.array([1, -2, 0, 2, 1])
    E5=E5.reshape(1,5)
    S5 = np.array([-1, 0, 2, 0,-1])
    S5=S5.reshape(1,5)
    W5 = np.array([-1, 2, 0, -2, 1])
    W5=W5.reshape(1,5)
    R5 = np.array([1, -4, 6, -4, 1])
    R5=R5.reshape(1,5)
    label = ["L5","E5","S5","W5","R5"]
    arr=np.stack((L5,E5,S5,W5,R5),axis=0)
    
    kernels = []
    labels = []
    for i in range(0,5):
        for j in range(0,5):
            mask=np.multiply(arr[i],np.transpose(arr[j]))
            labels.append(label[i]+label[j])
            kernels.append(mask)
        
    kernels=np.array(kernels)
    
       
    
    Texture_individual1 = []
    for kernel in kernels:
        Texture_individual1.append(convolve2D(numpydata1,kernel, padding=2, strides=1))


    temp1=[]
    Normalized1=[]
    for i in range(0,25):
        norm1 = np.zeros((220,220))
        final1 = cv2.normalize(Texture_individual1[i],norm1, 1, 36, cv2.NORM_MINMAX)
        temp1.append(final1)


    Texture= []
    window = np.zeros((5,5))

    for j in range(0,25):
        Texture.append(meanfilter(temp1[j],window, padding=2, strides=1))


    Rotational = []
    done = []
    for j in range(0,25):
        key1 = labels[j]
        for k in range(0,25):
            key2 = labels[k]
            count=0
            if key1[:2] == key2[-2:] and key1[-2:] == key2[:2] and key1 not in done:
                done.append(key2)   
                x = (Texture[j]+Texture[k])/2
                Rotational.append(x)

    urllib.request.urlretrieve(path,
    "soil.png")
    im1 = Image.open("soil.png") # Can be many different formats.
    print(im1)
    pix = im1.load()
    s = im1.size  # Get the width and hight of the image for iterating over
    r1 =[]
    g1 = []
    b1 = []
    values1 = []
    for w in range(s[0]):
        for h in range(s[1]):
            rgb1 = pix[w,h]
            r1.append(rgb1[0])
            g1.append(rgb1[1])
            b1.append(rgb1[2])

    avg_r1 = round(mean(r1),2)
    avg_g1 = round(mean(g1),2)
    avg_b1 = round(mean(b1),2)
    values1.append(avg_r1)
    values1.append(avg_g1)
    values1.append(avg_b1)            


    r_p1 = (values1[0]/(values1[0]+values1[1]+values1[2]))*100


    ph1 = round((0.0956*r_p1+4.2722),2)



    FV1 = []
    SD1 = []
    for j in range (0,15):
        means, dev = cv2.meanStdDev(temp1[j])
        FV1.append(means)
        SD1.append(dev)


    FV1 = np.array(FV1)
    SD1 = np.array(SD1)
    FV1 = FV1.reshape(1,15)
    SD1 = SD1.reshape(1,15)


    FV1 = FV1.T
    SD1 = SD1.T

    dff1 = pd.DataFrame()

    for i in range(0,15):
        dff1['Mean'+str(i)] = FV1[i]

    for i in range(0,15):
        dff1['SD'+str(i)] = SD1[i]


    dff1['ph'] = ph1

    feature_vector = np.concatenate((FV1,SD1),axis=1)

    feature_vector = feature_vector.reshape(1,30)

    feature_vector = np.append(feature_vector, ph1)


    feature_vector = feature_vector.reshape(1,31)


    l = model.predict(dff1)

    print(l)


    crops = {"Black Soil" : "Cotton, Wheat, Sugarcane, Jowar, Rice", "Yellow Soil" : "Citrus fruits, Groundnut, Potato", "Peat Soil" : "Cotton, Wheat, Rice, Pulses, Millets, Tobacco, Oilseeds, Potatoes", "Cinder Soil" : "Roses, Cactus" , "Laterite Soil" : "Cotton, Wheat, Rice, Pulses, Rubber, Tea, Coffee, Coconut, Cashews"}


    for key, values in crops.items():
        if l == key:
            c = crops.get(key)
            c = c + ", "+key
            print(c)
            return(c)



# @csrf_exempt
def index(request):
    
    # IMAGE FROM USER - URL path = https://growise.000webhostapp.com/images/1648368454_38d6f382-df65-4c43-b064-c19040bd5843.jpg
    # response = soil_prediction(path)
    # return JSONResponse(response) -> 
    bs = 'https://image.shutterstock.com/image-illustration/black-sand-texture-dark-soil-260nw-430890610.jpg'
    img1 = 'https://growise.000webhostapp.com/images/1648486727_583b9a81-7839-45a1-bbd6-56b0feab6cfc.jpg'
    # yekllow soil
    bss = 'https://growise.000webhostapp.com/images/1648486719_f69130be-2823-48ef-a324-1be8177bd0c3.jpg'
    
    img3 = 'https://growise.000webhostapp.com/images/1648486715_e8be5018-cb7e-4b43-b50c-754933137fbf.jpg'
    # black soil
    yss = 'https://growise.000webhostapp.com/images/1648486708_f9d270f6-82f4-4080-9408-21b404c7ef85.jpg'
    #laterite soil
    img5 = 'https://growise.000webhostapp.com/images/1648486701_5c801972-03f0-4c28-827e-d3f30733698e.jpg'
    #peat soil
    #response = soil_prediction(img5)
    #print(response)

    return render(request , 'index.html')


@csrf_exempt
def restCheck(request):
    if request.method == "GET":
        print("restcheck get is called")
        # json_data = request.body
        # stream = parseio.BytesIO(json_data)
        # python_data = JSONParser().parse(stream)
        # id = python_data.get("id",None)
        # print(id)
        json_data = JSONRenderer().render({'msg':'url received'})
        return HttpResponse(json_data , content_type  ='application/json')  
        
       

    if request.method == 'POST':
        print("restcheck post is called post hey ipcha")
        json_data = request.body
        stream  = parseio.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        url = python_data.get("url",None)
        crop_response = soil_prediction(url)
        print(url)
        print(crop_response)

        json_data = JSONRenderer().render({'crop_response': crop_response })
        return HttpResponse(json_data , content_type  ='application/json')  
    


from django.http import JsonResponse
import json

def ajax_post_view(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        data_from_post = json.load(request)['post_data'] #Get data from POST request
        #Do something with the data from the POST request
        #If sending data back to the view, create the data dictionary
        data = {
            'my_data': 'some data from django',
        }
        return JsonResponse(data)