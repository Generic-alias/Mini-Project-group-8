from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql  # or import mysql.connector
import joblib
import pandas as pd
import numpy as np
# calories, protien, sugar, fat, fiber, carbohydrates

model = joblib.load("E:/College/MiniProject/Mini-Project-group-8/UIDesign/FlaskReact/FlaskAPI/SleepAnalysis2.pkl")
# /home/kali/College/Mini/Job/SleepAnalysis.pkl
# SleepAnalysis2.pkl
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
    print(data)
    return jsonify({'sleep_efficiency': prediction[0], "duration": sleep_duration, "data" : data, "values": values })

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
    data = request.get_json()
    serving = int(data['serving']) / 100
    cursor.execute("select calories, protein, carbohydrate, cholesterol, total_fat, sugars from dietdb where name = %s", (data['food'],))
    result = cursor.fetchone()
    output = {
        "calories": int(result[0] * serving),
        "protein": int(result[1] * serving),
        "carbohydrate": int(result[2] * serving),
        "cholesterol": int(result[3] * serving),
        "total_fat": int(result[4] * serving),
        "sugars": int(result[5] * serving)
    }
    return jsonify(output)

@app.route('/diet/output/store', methods = ['GET', 'POST'])
def store():
    data = request.get_json()
    data['serving'] = int(data['serving']) / 100
    cursor.execute('insert into diet_data (name, calories, protein, carbohydrate, cholesterol, total_fat) select name, calories, protein, carbohydrate, cholesterol, total_fat from dietdb where name = %s', (data['food'],))
    db.commit()
    return jsonify("Done")

if __name__ == "__main__":
    app.run()

