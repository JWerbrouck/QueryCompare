import flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import signal
from urllib.parse import unquote
import subprocess

import json

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'It works!'


@app.route('/hgql', methods=['GET', 'POST'])
def projects():
    return hgql_activate()


def hgql_activate():
    config = request.args.get('config')
    schema = request.args.get('schema')
    my_path = os.path.abspath(os.path.dirname(__file__)) + '\\hypergraphql-master'
    print(my_path)
    command = str('cd '+my_path+' && gradle execute -Pa="--classpath, --config, configICDD.json"')
    os.system(command)
    os.kill()
    # process = subprocess.Popen(['gradle', 'execute', '-Pa="--classpath, --config, configICDD.json"'], preexec_fn=os.tcsetpgrp, shell=True, cwd=my_path, stdout=subprocess.PIPE)
    # os.killpg(os.getpgid(pro.pid), signal.SIGTERM)

    return ('test')


if __name__ == '__main__':
    app.run()

