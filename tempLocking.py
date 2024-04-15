def findPerson(img, original_person_id):
    person_index = 0
    model = yolov5.load("./yolov5s.pt")
    results = model(img)
    for detection in results.xyxy[0]:
        if int(detection[-1]) in [person_index]:
            label = model.names[int(detection[-1])]
            x1, y1, x2, y2 = map(int, detection[:4])
            cx = x1 + (x2 - x1) // 2
            cy = y1 + (y2 - y1) // 3
            area = (x2 - x1) * (y2 - y1)
            return img, [[cx, cy], area, original_person_id]
    return img, [[0, 0], 0, None]

def trackFace(myDrone, info, dims, pid, pErrors, original_person_id):
    w,h = dims[0], dims[1]
    error_x = info[0][0] - w//2
    speed_x = pid[0]*error_x + pid[1]*(error_x-pErrors[0])
    speed_x = int(np.clip(speed_x,-60,60))

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

    if info[2] is not None and info[2] == original_person_id:
        x,y = info[0][0],info[0][1]
        if x != 0 and y != 0 :
            myDrone.yaw_velocity = speed_x
    else:
        myDrone.for_back_velocity = 0
        myDrone.left_right_velocity = 0
        myDrone.up_down_velocity = 0
        myDrone.yaw_velocity = 0
    

    if myDrone.send_rc_control:
        myDrone.send_rc_control(myDrone.left_right_velocity,
                                myDrone.for_back_velocity,
                                myDrone.up_down_velocity,
                                myDrone.yaw_velocity)
    pErrors = [error_x]
    return pErrors
