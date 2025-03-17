#!/usr/bin/env python
# coding: utf-8

# In[364]:


import joblib, pandas


# In[365]:


## Duration   float (subtract the given timings)
## Age        int
## Awakenings float
## Caffeine   float
## Alcohol    float
## Smoking    object
## Exercise   float


# In[366]:


# with open('textFile.txt') as file:
#     user_data = file.readlines()
# user_data = [ i.replace('\n', '') for i in user_data ]
# age, sleep_time, wake_time, awaken_hrs, caffeine, alcohol, smoking, exercise =  [0, 1, 2, 3, 4, 5, 6, 7]
# user_data


# # In[ ]:


# user_data[age], user_data[sleep_time], user_data[wake_time] = int(user_data[age]), float(user_data[sleep_time]), float(user_data[wake_time])
# user_data[awaken_hrs], user_data[caffeine] = float(user_data[awaken_hrs]), float(user_data[caffeine])
# user_data[alcohol], user_data[exercise] = float(user_data[alcohol]), float(user_data[exercise])
# user_data[smoking] = 0 if user_data[smoking].lower() in ['no', 'n'] else 1 if user_data[smoking].lower() in ['yes', 'y'] else user_data[smoking]
# user_data


# # In[368]:


# user_data = [user_data[age], (user_data[wake_time] - user_data[sleep_time] + 24) % 24, user_data[awaken_hrs], 
#              user_data[caffeine], user_data[alcohol], user_data[smoking], user_data[exercise]]
# user_data


# # In[369]:


# userData = {
#     'ID' : 1,
#     'Age' : [user_data[age]],
#     'Sleep_duration' : [user_data[1]],
#     'REM_sleep_percentage' : 0,
#     'Deep_sleep_percentage' : 0,
#     'Awakenings' : [user_data[2]],
#     'Caffeine_consumption' :[ user_data[3]],
#     'Alcohol_consumption' : [user_data[4]],
#     'Smoking_status' : [user_data[5]],
#     'Exercise_frequency' : [user_data[6]]
# }
# userDataDF = pandas.DataFrame(userData)
# userDataDF


# # In[370]:


# userData_2 = {
#     'Age' : [user_data[age]],
#     'Sleep_duration' : [user_data[1]],
#     'Awakenings' : [user_data[2]],
#     'Caffeine_consumption' :[ user_data[3]],
#     'Alcohol_consumption' : [user_data[4]],
#     'Smoking_status' : [user_data[5]],
#     'Exercise_frequency' : [user_data[6]]
# }
# userDataDF_2 = pandas.DataFrame(userData_2)
# userDataDF_2


# # In[371]:


# # model = joblib.load('E:/College/MiniProject/Mini-Project-group-8/Program/SleepAnalysis.pkl')
# # predict = model.predict(userDataDF_2)
# # predict # Sleep Efficiency, REM, Deep


# # In[372]:


# model_2 = joblib.load('SleepAnalysis.pkl')
# predict = model_2.predict(userDataDF.to_numpy())
# predict # Sleep Efficiency


# In[ ]:


def predictor():
    with open("E:/College/MiniProject/Mini-Project-group-8/Job/textFile.txt") as file: #C:/Users/akash/Documents/GitHub/Mini-Project-group-8/Job/textFile.txt
        user_data = file.readlines()                                                            #E:/College/MiniProject/Mini-Project-group-8/Job/textFile.txt
    user_data = [ i.replace('\n', '') for i in user_data ]
    age, sleep_time, wake_time, awaken_hrs, caffeine, alcohol, smoking, exercise =  [0, 1, 2, 3, 4, 5, 6, 7]
    user_data[age], user_data[sleep_time], user_data[wake_time] = int(user_data[age]), float(user_data[sleep_time]), float(user_data[wake_time])
    user_data[awaken_hrs], user_data[caffeine] = float(user_data[awaken_hrs]), float(user_data[caffeine])
    user_data[alcohol], user_data[exercise] = float(user_data[alcohol]), float(user_data[exercise])
    user_data[smoking] = 0 if user_data[smoking].lower() in ['no', 'n'] else 1 if user_data[smoking].lower() in ['yes', 'y'] else user_data[smoking]
    user_data = [user_data[age], (user_data[wake_time] - user_data[sleep_time] + 24) % 24, user_data[awaken_hrs], 
                user_data[caffeine], user_data[alcohol], user_data[smoking], user_data[exercise]]
    userData = {
        'ID' : 1,
        'Age' : [user_data[age]],
        'Sleep_duration' : [user_data[1]],
        'REM_sleep_percentage' : 0,
        'Deep_sleep_percentage' : 0,
        'Awakenings' : [user_data[2]],
        'Caffeine_consumption' :[ user_data[3]],
        'Alcohol_consumption' : [user_data[4]],
        'Smoking_status' : [user_data[5]],
        'Exercise_frequency' : [user_data[6]]
    }
    userDataDF = pandas.DataFrame(userData)
    model_2 = joblib.load("E:/College/MiniProject/Mini-Project-group-8/Job/SleepAnalysis.pkl") #C:/Users/akash/Documents/GitHub/Mini-Project-group-8/Job/SleepAnalysis.pkl
    predict = model_2.predict(userDataDF.to_numpy())                                                    #E:/College/MiniProject/Mini-Project-group-8/Job/SleepAnalysis.pkl
    return predict # Sleep Efficiency


# In[ ]:




