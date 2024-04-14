import os
import cv2
from pymongo import MongoClient

# MongoDB Atlas connection URI (replace <connection_string> with your actual MongoDB Atlas connection string)
MONGODB_URI = "mongodb+srv://bruteforceprogrammer:G0dGs1PfUHTDLZFi@cluster0.hj0ptta.mongodb.net/?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(MONGODB_URI)
db = client["dataset"]
collection = db["frames"]

# Folder containing frames
frames_folder = "frames"

def insert_frame(frame_path):
    # Read frame from file
    frame = cv2.imread(frame_path)
    
    # Convert frame to list of lists
    frame_list = frame.tolist()
    
    # Insert frame into MongoDB Atlas
    collection.insert_one({"frame": frame_list})
    print(f"Inserted frame: {frame_path}")

def main():
    # Iterate over frames in the folder
    for filename in os.listdir(frames_folder):
        if filename.endswith(".jpg") or filename.endswith(".png"):
            frame_path = os.path.join(frames_folder, filename)
            insert_frame(frame_path)

if __name__ == "__main__":
    main()
