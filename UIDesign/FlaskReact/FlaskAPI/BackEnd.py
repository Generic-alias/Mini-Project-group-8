from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql  # or import mysql.connector
import joblib
import pandas as pd
import numpy as np
import plotly, json
import plotly.express as px
# calories, protien, sugar, fat, fiber, carbohydrates

model = joblib.load("E:/College/MiniProject/Mini-Project-group-8/UIDesign/FlaskReact/FlaskAPI/SleepAnalysis2.pkl")
# /home/kali/Coding/MiniProject/Job/SleepAnalysis.pkl
# C:/Users/akash/Documents/GitHub/minor/Mini-Project-group-8/UIDesign/FlaskReact/FlaskAPI/SleepAnalysis.pkl
# SleepAnalysis2.pkl
# E:/College/MiniProject/Mini-Project-group-8/UIDesign/FlaskReact/FlaskAPI
db = pymysql.connect(
host = "localhost",
user = "root", #root #aditya
password = "root",
database = "mini"
)
cursor = db.cursor()

app = Flask(__name__)
cors = CORS(app, origins = '*')
@app.route("/submit", methods = ['GET', 'POST'] )
def submit():
    data = request.get_json()
    age = int(data['age'])
    bed_time = data['bedTime']
    wake_time = data['wakeTime']
    awakenings = float(data['awakenings'])
    caffeine = float(data['caffeine'])
    alcohol = float(data['alcohol'])
    smoking = "Yes" if data['smoking'].lower() == "yes" else "No"  # Store as Yes/No
    exercise = float(data['exercise'])
    REM = int(data['REM'])
    deep_sleep = int(data['deep_sleep'])


    smoking_numeric = 1 if smoking == "Yes" else 0
    sleep_duration = (float(wake_time.split(":")[0]) - float(bed_time.split(":")[0]) + 24) % 24

    userDataDF = np.array([[  age,
 sleep_duration,
    REM, 
  deep_sleep, 
awakenings,
 caffeine,
 alcohol,
 smoking_numeric,  
exercise]])
    # userDataDF = pd.DataFrame({
    #     'Age': [age],
    #     'Sleep_duration': [sleep_duration],
    #     'REM_sleep_percentage': [REM], 
    #     'Deep_sleep_percentage': [deep_sleep], 
    #     'Awakenings': [awakenings],
    #     'Caffeine_consumption': [caffeine],
    #     'Alcohol_consumption': [alcohol],
    #     'Smoking_status': [smoking_numeric],  
    #     'Exercise_frequency': [exercise]
    # })
    prediction = model.predict(userDataDF)
    prediction[0] = np.expm1(prediction[0])
    sleep_efficiency = prediction[0]
    insert_query = """
        INSERT INTO sleep_data (age, bed_time, wake_time, awakenings, caffeine, alcohol, smoking, exercise, sleep_efficiency, REM_percentage, deep_sleep_percentage) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (age, bed_time, wake_time, awakenings, caffeine, alcohol, smoking, exercise, sleep_efficiency, REM, deep_sleep)
    cursor.execute(insert_query, values)
    db.commit()
    cursor.execute("select id, sleep_efficiency from (select id, sleep_efficiency from sleep_data order by id desc limit 7) as recent_data order by id")
    results = cursor.fetchall()
    sleepData, idList = [], []
    for i in results:
        sleepData.append(i[1])
        idList.append(i[0])
    barDF = pd.DataFrame(
        {
            "id": idList,
            "sleep_data": [i * 100 for i in sleepData]
        }
    )
    fig = px.bar(barDF, x = "id", y = "sleep_data")
    graph = plotly.io.to_json(fig, pretty = True)
    return jsonify({'sleep_efficiency': prediction[0], "graph": json.loads(graph) })

@app.route("/diet", methods = ['GET', 'POST'])
def diet():
    data = request.get_json()
    food_query = f"{data['food']}%"
    cursor.execute("select name from dietdb where name like %s limit 30", (food_query,))
    results = cursor.fetchall()
    results = [i[0] for i in results]
    return jsonify({'results' : results})

@app.route("/diet/output", methods = ['GET', 'POST'])
def output():
    data, foods, output, final = request.get_json(), [], [], []
    for i in data:
        foods.append(i['food'])
    foods = tuple(foods)
    cursor.execute("select calories, protein, carbohydrate, cholesterol, total_fat, sugars from dietdb where name in %s", (foods,))
    results = cursor.fetchall()
    for i in results:
        output.append(np.array(i))
    for i in output:
        for j in data:
            final.append(i * (int(j['serving']) / 100))
    final = np.sum(final, axis = 0)
    print(final)
    diet = {
        "calories": final[0],
        "protein": final[1],
        "carbohydrate": final[2],
        "cholesterol": final[3],
        "total_fat": final[4],
        "sugars": final[5]
    }
    # cursor.execute("select id,calories from (select id, calories from diet_data order by id desc limit 7) as recent_data order by id")
    # results = cursor.fetchall()
    # id_array, cal_array = [], []
    # for i in results:
    #     id_array.append(i[0])
    #     cal_array.append(i[1])
    # diet_barDF = pd.DataFrame({
    #     "id" : id_array,
    #     "calories" : cal_array
    # })
    # print(diet_barDF)
    # fig = px.bar(diet_barDF, x = "id", y = "calories")
    # graph = plotly.io.to_json(fig, pretty = True)
    return jsonify(diet)

@app.route('/diet/output/store', methods = ['GET', 'POST'])
def store():
    data = request.get_json()
    print(data)
    for i in data:
        i['serving'] = str(int(i['serving']) / 100)
        cursor.execute('insert into diet_data (name, serving_in_g, calories, protein, carbohydrate, cholesterol, total_fat) select name, %s, calories * %s, protein * %s, carbohydrate * %s, cholesterol * %s, total_fat * %s from dietdb where name = %s', (i['serving'],i['serving'],i['serving'],i['serving'],i['serving'],i['serving'],i['food']))
        db.commit()
        cursor.execute("select id,calories from (select id, calories from diet_data order by id desc limit 7) as recent_data order by id")
    results = cursor.fetchall()
    id_array, cal_array = [], []
    for i in results:
        id_array.append(i[0])
        cal_array.append(i[1])
    diet_barDF = pd.DataFrame({
        "id" : id_array,
        "calories" : cal_array
    })
    print(diet_barDF)
    fig = px.bar(diet_barDF, x = "id", y = "calories")
    graph = plotly.io.to_json(fig, pretty = True)
    return jsonify(json.loads(graph))

if __name__ == "__main__":
    app.run()

