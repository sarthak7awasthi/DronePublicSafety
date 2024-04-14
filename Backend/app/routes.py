# app/routes.py
from flask import Blueprint, jsonify, request
from app.Drone.faceTrackingTello import starter

# Create a Blueprint instance
api_bp = Blueprint('api', __name__)

# Define routes
@api_bp.route('/hello')
def hello():
    return jsonify({'message': 'Hello, World!'})


@api_bp.route('/start', methods=['POST'])
def start_drone():
    if request.method == 'POST':
   
        starter()
        return jsonify({'message': 'Drone started successfully.'}), 200
    else:
        return jsonify({'error': 'Method not allowed.'}), 405

    
