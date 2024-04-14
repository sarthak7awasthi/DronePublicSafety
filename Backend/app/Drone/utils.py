from djitellopy import Tello
import cv2
import numpy as np
import yolov5
import time
 
 
def initializeTello():
    myDrone = Tello()
    myDrone.connect()
    # myDrone.connect_to_wifi("Archery", "Bullseye420")
    myDrone.for_back_velocity = 0
    myDrone. left_right_velocity = 0
    myDrone.up_down_velocity = 0
    myDrone.yaw_velocity = 0
    myDrone.speed = 0
    print('BATTERY: ', myDrone.get_battery())
    # print("Waiting")
    # time.sleep(30)
    myDrone.streamoff()
    time.sleep(1)
    myDrone.streamon()
    return myDrone
 
def telloGetFrame(myDrone, w= 360,h=240):
    myFrame = myDrone.get_frame_read()
    frame_ = myFrame.frame
    img = cv2.resize(frame_,(w,h))
    return img, myFrame
 
def findPerson(img):
    person_index = 0
    knife_index = 43
    model = yolov5.load("./yolov5s.pt")
    results = model(img)
    for detection in results.xyxy[0]:
        if int(detection[-1]) in [person_index, knife_index]:
            

            label = model.names[int(detection[-1])]
            x1, y1, x2, y2 = map(int, detection[:4])
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

            cx = x1 + (x2 - x1) // 2
            cy = y1 + (y2 - y1) // 3
            area = (x2 - x1) * (y2 - y1)
            cv2.circle(img, (cx, cy), 5, (0, 255, 0), cv2.FILLED)
            print("{} | {}".format(area, area/(360*240)))

            if int(detection[-1]) == knife_index:
                print("Knife detected")
                cv2.putText(img, "Knife detected", (x1, y1 - 30), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 15)
            return img, [[cx, cy], area]
        else:
            print("No person detected")
            break
    return img, [[0, 0], 0]
        
def findFace(img):
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    imgGray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(imgGray,1.1,6  )
 
    myFaceListC = []
    myFaceListArea = []
 
    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,255),2)
        cx = x + w//2
        cy = y + h//2
        area = w*h
        myFaceListArea.append(area)
        myFaceListC.append([cx,cy])
 
    if len(myFaceListArea) !=0:
        i = myFaceListArea.index(max(myFaceListArea))
        return img, [myFaceListC[i],myFaceListArea[i]]
    else:
        return img,[[0,0],0]
 
def trackFace(myDrone,info,dims,pid,pErrors):
    w,h = dims[0], dims[1]
    ## PID
    error_x = info[0][0] - w//2
    speed_x = pid[0]*error_x + pid[1]*(error_x-pErrors[0])
    print(speed_x, end=" | ")
    speed_x = int(np.clip(speed_x,-60,60))

    # error_y = info[0][1] - h//2
    # speed_y = pid[0]*error_y + pid[1]*(error_y-pErrors[1])
    # print(speed_y)
    # speed_y = int(np.clip(speed_y,-10,10))

    current_height = myDrone.get_height()
    desired_height = 130
    error_y = desired_height - current_height
    speed_y = pid[0]*error_y + pid[1]*(error_y-pErrors[1])
    print(speed_y, end = ' | ')
    speed_y = int(np.clip(speed_y,-8,8))

    ##OR
    diff  = desired_height - current_height
    speed_y_2 = np.clip(0.5*diff, -10, 10)
    print(" OTHER: ",speed_y_2)




    area = info[1]
    relative_area = area/(360*240)

    lower_limit = 0.35
    upper_limit = 0.5

    fb_velocity = 13
    if relative_area < lower_limit and relative_area != 0:
        myDrone.for_back_velocity = fb_velocity
    elif relative_area > upper_limit:
        myDrone.for_back_velocity = -fb_velocity
    else:
        myDrone.for_back_velocity = 0


 
 
    print(f'X: {speed_x} | Y: {speed_y}')
    print("==============================")
    x,y = info[0][0],info[0][1]
    area = info[1]

    if x !=0 and y != 0 :
        myDrone.yaw_velocity = speed_x
        myDrone.up_down_velocity = speed_y
        # myDrone.up_down_velocity = 
    else:
        myDrone.for_back_velocity = 0
        myDrone.left_right_velocity = 0
        myDrone.up_down_velocity = 0
        myDrone.yaw_velocity = 0
        error_x = 0
        error_y = 0
    if myDrone.send_rc_control:
        myDrone.send_rc_control(myDrone.left_right_velocity,
                                myDrone.for_back_velocity,
                                myDrone.up_down_velocity,
                                myDrone.yaw_velocity)
        time.sleep(0.4)
    pErrors = [error_x, error_y]
    return pErrors