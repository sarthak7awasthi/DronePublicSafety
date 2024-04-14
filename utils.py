import djitellopy.tello as Tello
import time
import supervision as sv
import numpy as np

def init_Tello():
  tello = Tello()
  tello.connect()
  tello.streamoff()
  time.sleep(1)
  # tello.takeoff()
  tello.streamon()
  tello.set_video_bitrate(Tello.BITRATE_1MBPS)
  tello.set_video_fps(Tello.FPS_30)
  tello.set_video_resolution(Tello.RESOLUTION_480P)
  time.sleep(1)
  return tello

def end_Tello(tello, frame_reader):
  tello.land()
  frame_reader.stop()
  tello.streamoff()
  tello.disconnect()


def drone_exception_handler(drone):
    print("Performing emergency actions...")
    # Keep flying at 160 cm
    drone.move_up(160 - drone.get_height())
    time.sleep(5)
    # Turn 90 degrees towards left
    print("Turning left...")
    drone.rotate_counter_clockwise(90)
    time.sleep(5)
    # Turn right 90 degrees to return to original position
    print("Turning right to return to original position...")
    drone.rotate_clockwise(90)
    time.sleep(5)
    # Turn right again 90 degrees
    print("Turning right again...")
    drone.rotate_clockwise(90)
    # Land the drone
    drone.land()
    drone.streamoff()

def process_frame(frame, model, byte_tracker, annotator):
    results = model(frame)
    # print(results.confidence[0], results.class_id[0])
    # print(type(results))
    detections = sv.Detections.from_yolov5(results)
    # print(detections)
    # detections = sv.Detections.from_ultralytics(results)
    detections = byte_tracker.update_with_detections(detections)

    filtered_boxes = []
    filtered_confidences = []
    filtered_class_ids = []
    filtered_tracker_ids = []
    labels = []

    for i in range(len(detections.class_id)):
        if detections.class_id[i] == 0:  # Filtering only 'person' class
            filtered_boxes.append(detections.xyxy[i])
            filtered_confidences.append(detections.confidence[i])
            filtered_class_ids.append(detections.class_id[i])
            filtered_tracker_ids.append(detections.tracker_id[i])
            tracker_id = detections.tracker_id[i]
            labels.append(f"#{tracker_id} {model.model.names[detections.class_id[i]]} {detections.confidence[i]:0.2f}")

    # for i in range(len(filtered_class_ids)):
    #     if filtered_class_ids[i] == 0:
    #         print(f"Person of ID {filtered_tracker_ids[i]} detected with confidence {filtered_confidences[i]:0.2f}")
    bbox = [0,0,0,0]
    for i in range(len(filtered_tracker_ids)):
        #ADDED A MIN WHEN 1 DIPS
        if filtered_tracker_ids[i] == 1 or filtered_tracker_ids[i] == min(filtered_tracker_ids):
            bbox = filtered_boxes[i]
            print(f"Person of ID {filtered_tracker_ids[i]} detected with confidence {filtered_confidences[i]:0.2f} at {bbox}")


    if filtered_boxes:
        filtered_detections = sv.Detections(
            xyxy=np.array(filtered_boxes),
            confidence=np.array(filtered_confidences),
            class_id=np.array(filtered_class_ids),
            tracker_id=np.array(filtered_tracker_ids)
        )
        return annotator.annotate(scene=frame.copy(), detections=filtered_detections, labels=labels), bbox
    else:
        return frame, bbox  # Return the original frame if no detections
    

def trackFace(myDrone,info,dims,pid,pErrors):
    w,h = dims[0], dims[1]
    ## PID
    error_x = info[0][0] - w//2
    speed_x = pid[0]*error_x + pid[1]*(error_x-pErrors[0])
    # print(speed_x, end=" | ")
    speed_x = int(np.clip(speed_x,-60,60))

    # error_y = info[0][1] - h//2
    # speed_y = pid[0]*error_y + pid[1]*(error_y-pErrors[1])
    # print(speed_y)
    # speed_y = int(np.clip(speed_y,-10,10))

    current_height = myDrone.get_height()
    desired_height = 130
    error_y = desired_height - current_height
    speed_y = pid[0]*error_y + pid[1]*(error_y-pErrors[1])
    # print(speed_y, end = ' | ')
    speed_y = int(np.clip(speed_y,-8,8))

    ##OR
    # diff  = desired_height - current_height
    # speed_y_2 = np.clip(0.5*diff, -10, 10)
    # print(" OTHER: ",speed_y_2)

    area = info[1]
    relative_area = area/(w*h)

    lower_limit = 0.35
    upper_limit = 0.5

    fb_velocity = 13
    if relative_area < lower_limit and relative_area != 0:
        myDrone.for_back_velocity = fb_velocity
    elif relative_area > upper_limit:
        myDrone.for_back_velocity = -fb_velocity
    else:
        myDrone.for_back_velocity = 0


 
 
    # print(f'X: {speed_x} | Y: {speed_y}')
    # print("==============================")
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

