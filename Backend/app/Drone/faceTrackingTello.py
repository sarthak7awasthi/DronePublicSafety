from app.Drone.utils import *
import cv2

def starter():

    w,h = 360,240
    pid = [0.4,0.4,0]
    pErrors =[0,0]
    startCounter = 0  # for no Flight 1   - for flight 0


    myDrone = initializeTello()

    # Initialize variables
    startCounter = 0
    w, h = 640, 480  # Set your desired width and height
    pErrors = [0, 0]

    # Your drone initialization code here
    # Example: myDrone = YourDroneClass()

    while True:
        ## Flight
        if startCounter == 0:
            # Assuming myDrone is your drone object
            myDrone.takeoff()
            print("Height: {}".format(myDrone.get_height()))
            myDrone.move_up(50)
            startCounter = 1

        ## Step 1
        img, frame_reader = telloGetFrame(myDrone, w, h)
        ## Step 2
        img, info = findPerson(img)
        ## Step 3
        dims = [w, h]
        pErrors = trackFace(myDrone, info, dims, pid, pErrors)
        print("Height: {}".format(myDrone.get_height()))
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        cv2.imshow('Image', img)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            frame_reader.stop()
            myDrone.streamoff()
            myDrone.land()
            print('BATTERY: ', myDrone.get_battery())
            break

