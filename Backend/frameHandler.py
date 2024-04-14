import os
import cv2

# Folder to store frames
frames_folder = "frames"

def capture_frames():
    # Create frames folder if it doesn't exist
    if not os.path.exists(frames_folder):
        os.makedirs(frames_folder)

    # Open default webcam
    cap = cv2.VideoCapture(0)

    # Counter for frame filenames
    frame_count = 0

    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        # Display the captured frame
        cv2.imshow("Frame", frame)

        # Save the frame to a file
        frame_filename = os.path.join(frames_folder, f"frame_{frame_count}.jpg")
        cv2.imwrite(frame_filename, frame)
        print(f"Saved frame: {frame_filename}")

        # Increment frame count
        frame_count += 1

        # Break the loop when 'q' key is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release the capture
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    capture_frames()
