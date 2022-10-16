from flask import Flask, render_template, redirect, session, url_for, request
import math

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
grades = ["F","D","C","B","A","A+"]

@app.route('/')
def index():
    if 'username' in session:
        #totals to 3000 so /600 to get 0-5
        grade = grades[math.floor(((50*(int(session['targets']))) + 10*(int(session["balance"])) + int(session["draw"]))/600)]
        print(grade)
        return render_template("index.html",user=session['username'],draw=session['draw'],targets=session['targets'],balance=session["balance"],grade=grade)
    return redirect(url_for('login'))

@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        session['draw'] = 0
        session['targets'] = 0
        session['balance'] = 0
        return redirect(url_for('index'))
    return render_template("login.html")

@app.route('/logout')
def logout():
    session.pop('draw', None)
    session.pop('targets', None)
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/targets',methods=['GET','POST'])
def targets():
    if 'username' in session:
        if request.method == 'POST':
            session['targets'] = request.form['score']
            return redirect(url_for('index'))
        return render_template("target.html")
    return redirect(url_for('login'))
    
@app.route('/draw',methods=['GET','POST'])
def draw():
    if 'username' in session:
        if request.method == 'POST':
            session['draw'] = request.form['score']
            return redirect(url_for('index'))
        return render_template("draw.html")
    return redirect(url_for('login'))

@app.route('/balance',methods=['GET','POST'])
def balance():
    if 'username' in session:
        if request.method == 'POST':
            session['balance'] = request.form['score']
            return redirect(url_for('index'))
        return render_template("balance.html")
    return redirect(url_for('login'))


if __name__ == "__main__":
    app.run()