from utlis import *
import cv2

# Initialize variables
w, h = 360, 240
pid = [0.4, 0.4, 0]
pErrors = [0, 0]
startCounter = 0  # for no Flight 1   - for flight 0

# Initialize drone
myDrone = initializeTello()

# Initialize person tracking variables
tracked_persons = {}  # Dictionary to store tracked persons
next_person_id = 1    # Counter for assigning unique IDs

while True:
    ## Flight
    if startCounter == 0:
        myDrone.takeoff()
        myDrone.move_up(90)
        startCounter = 1

    ## Step 1: Get frame
    img, frame_reader = telloGetFrame(myDrone, w, h)

    ## Step 2: Detect persons
    img, detections = findPerson(img)

    # Initialize list to store IDs of detected persons
    detected_person_ids = []

    ## Step 3: Track persons
    for detection in detections:
        # Extract bounding box coordinates and area
        bbox, area = detection

        # Calculate features (e.g., bounding box coordinates) for tracking
        features = bbox

        # Check if this person is already being tracked
        matched_id = None
        for person_id, person_data in tracked_persons.items():
            # Calculate distance between the features of the current detection and the tracked person
            distance = calculate_distance(features, person_data['features'])

            # If the distance is below a certain threshold, consider it a match
            if distance < 50:  # You may need to adjust this threshold based on your application
                matched_id = person_id
                break

        # If a match is found, update the tracked person's data
        if matched_id is not None:
            tracked_persons[matched_id]['bbox'] = bbox
            # You can update other attributes of the tracked person here if needed
        else:
            # If no match is found, assign a new unique ID to the person
            tracked_persons[next_person_id] = {'bbox': bbox, 'features': features}
            detected_person_ids.append(next_person_id)
            next_person_id += 1

    # Step 4: Visualize tracking results
    for person_id, person_data in tracked_persons.items():
        # Extract the bounding box coordinates of the tracked person
        bbox = person_data['bbox']

        # Draw bounding box and unique ID on the image
        cv2.rectangle(img, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0, 255, 0), 2)
        cv2.putText(img, f"Person {person_id}", (bbox[0], bbox[1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

    # Step 5: Display the image
    cv2.imshow('Image', img)

    # Check for key press to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        frame_reader.stop()
        myDrone.streamoff()
        myDrone.land()
        print('BATTERY: ', myDrone.get_battery())
        break
