from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Floresmateo27@",
    database="contactos_app"
)

cursor = db.cursor()

@app.route("/")
def home():
    return "Backend funcionando 🚀"

@app.route("/guardar", methods=["POST"])
def guardar():
    data = request.get_json()

    nombre = data.get("nombre")
    email = data.get("email")
    numero = data.get("numero")

    sql = "INSERT INTO contactos (nombre, email, numero) VALUES (%s, %s, %s)"
    valores = (nombre, email, numero)

    cursor.execute(sql, valores)
    db.commit()

    return jsonify({
        "message": "Datos guardados en MySQL"
    }), 200

@app.route("/contactos", methods=["GET"])
def obtener_contactos():
    cursor.execute("SELECT * FROM contactos")
    resultados = cursor.fetchall()

    contactos = []
    for fila in resultados:
        contactos.append({
            "id": fila[0],
            "nombre": fila[1],
            "email": fila[2],
            "numero": fila[3]
        })

    return jsonify(contactos), 200

if __name__ == "__main__":
    app.run(debug=True)