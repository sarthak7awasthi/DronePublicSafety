import cv2
from djitellopy.tello import Tello
import time
import supervision as sv
import numpy as np
# from ultralytics import YOLO
import yolov5
from utils import *

def bounding_box_to_info(bounding_box):
    x1,y1,x2,y2 = bounding_box[0],bounding_box[1],bounding_box[2],bounding_box[3]
    cx = x1 + (x2-x1)//2
    cy = y1 + (y2-y1)//2
    area = (x2-x1)*(y2-y1)
    return [(cx,cy),area]


def main():

  w,h = 320,240
  model = yolov5.load('./yolov5s.pt')
  # model = YOLO("./yolov8n.pt")
  byte_tracker = sv.ByteTrack()
  annotator = sv.BoxAnnotator()
  pErrors =[0,0]

  drone = init_Tello()
  print("Battery: ", drone.get_battery())  
  
  drone.takeoff()
  drone.send_rc_control(0,0,25,0)
  time.sleep(1)


  frame_reader = drone.get_frame_read()
  try:
    while True:

      
      frame = frame_reader.frame
      if frame is None:
        continue
      frame = cv2.resize(frame,(w,h))

      processed_frame, bounding_box = process_frame(frame, model, byte_tracker, annotator)
    
      if bounding_box is not None:
        info = bounding_box_to_info(bounding_box)
      else:
         info = [[0,0],0]
        
      pErrors = trackFace(drone,info,[w,h],[0.4,0.4],pErrors)

      cv2.imshow('Image',processed_frame)
    
      if cv2.waitKey(1) & 0xFF == ord('q'):
        break

  except Exception as e:
        print("An error occurred:", e)
        # Perform emergency actions in case of failure
        try:
            drone_exception_handler(drone)
        except Exception as e:
            print("Emergency actions failed:", e)
            drone.emergency()

  # Land and disconnect
  end_Tello(drone, frame_reader)

if __name__ == "__main__":
    main()