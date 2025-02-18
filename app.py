from flask import Flask, session, render_template, request, jsonify
from flask_session import Session
from icecream import ic
import x

ic.configureOutput(prefix=f'----- | ', includeContext=True)

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
################################

@app.get("/")
def show_index():
    return render_template("index.html", title="Home")

####################### Opskrifter paths
@app.get("/opskrifter")
def show_opskrifter():
    return render_template("opskrifter.html", title="Opskrifter")

@app.get("/opskrifter/skagenslapper")
def show_opskrifter_skagenslapper():
    return render_template("opskrifter_skagenslapper.html", title="Skagenslapper")

@app.get("/opskrifter/fødselsdagsboller")
def show_opskrifter_birthdaybuns():
    return render_template("opskrifter_birthdaybuns.html", title="Fødselsdagsboller")

@app.get("/opskrifter/naanbrød")
def show_opskrifter_naanbread():
    return render_template("opskrifter_naanbread.html", title="Naanbrød")

################################################################
@app.get("/om-bageren")    
def show_om_bageren():
    return render_template("about_us.html", title="Om bageren")

#######################
@app.get("/tilfældig-opskrift")
def show_random_recipe():
    return render_template("opskrifter_random_recipe.html", title="Tilfældig opskrift")

###################################
@app.get("/api/v1/posts") 
def get_posts():
    try:
        db, cursor = x.db()
        q = "SELECT * FROM users"
        cursor.execute(q)
        rows = cursor.fetchall()
        ic(rows)
        return jsonify({"posts": rows})
    except Exception as ex:
        ic(ex)
        return jsonify({"error": str(ex)}), 500
    finally:
        if "cursor" in locals(): cursor.close()
        if "db" in locals(): db.close()