from djitellopy import Tello
import time

def summon_drone(start, end):

    tello = Tello()
    tello.connect()

  
    tello.takeoff()
    time.sleep(2)  


    tello.move_to(end[0], end[1], 50, 0)
    time.sleep(2)  


    tello.land()
    time.sleep(2)  

    # Disconnect
    tello.end()

def main():
  
    start = () 
    end = ()  

    summon_drone(start, end)

if __name__ == "__main__":
    main()
