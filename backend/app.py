import psycopg2
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# conexión a PostgreSQL
conn = psycopg2.connect(
    host="dpg-d7gk39q8qa3s738jpuhg-a",
    database="contacts_db_gy7d",
    user="contacts_db_gy7d_user",
    password="XJYxeWtMR3rbRSZr2Ebu3jv5wdR6s1cc",
    port="5432"
)

cursor = conn.cursor()

# 🔥 Crear tabla automáticamente
cursor.execute("""
CREATE TABLE IF NOT EXISTS contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    numero VARCHAR(20)
)
""")
conn.commit()

# 🟢 Ruta base
@app.route("/")
def home():
    return "Backend funcionando 🚀"

# 🟢 Guardar datos
@app.route("/guardar", methods=["POST"])
def guardar():
    data = request.get_json()

    nombre = data.get("nombre")
    email = data.get("email")
    numero = data.get("numero")

    sql = "INSERT INTO contactos (nombre, email, numero) VALUES (%s, %s, %s)"
    valores = (nombre, email, numero)

    cursor.execute(sql, valores)
    conn.commit()

    return jsonify({
        "message": "Datos guardados correctamente"
    }), 200

# 🟢 Obtener contactos
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

# 🚀 IMPORTANTE PARA RENDER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)