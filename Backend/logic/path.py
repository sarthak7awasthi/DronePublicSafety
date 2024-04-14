from djitellopy import Tello
import time
import numpy as np
import heapq

class Node:
    def __init__(self, position, parent=None):
        self.position = position
        self.parent = parent
        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.position == other.position

def heuristic(a, b):
    return np.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2)

def astar(grid, start, end):
    open_list = []
    closed_list = []

    start_node = Node(start)
    end_node = Node(end)

    heapq.heappush(open_list, (0, start_node))

    while open_list:
        current_node = heapq.heappop(open_list)[1]
        closed_list.append(current_node)

        if current_node == end_node:
            path = []
            while current_node:
                path.append(current_node.position)
                current_node = current_node.parent
            return path[::-1]

        neighbors = [(0, 1), (0, -1), (1, 0), (-1, 0)]  # Four directional neighbors
        for new_position in neighbors:
            node_position = (current_node.position[0] + new_position[0], current_node.position[1] + new_position[1])

            if node_position[0] > (len(grid) - 1) or node_position[0] < 0 or node_position[1] > (len(grid[len(grid)-1]) - 1) or node_position[1] < 0:
                continue

            if grid[node_position[0]][node_position[1]] != 0:
                continue

            new_node = Node(node_position, current_node)
            if new_node in closed_list:
                continue

            new_node.g = current_node.g + 1
            new_node.h = heuristic(new_node.position, end_node.position)
            new_node.f = new_node.g + new_node.h

            for open_node in open_list:
                if new_node == open_node[1] and new_node.g > open_node[1].g:
                    continue

            heapq.heappush(open_list, (new_node.f, new_node))

    return None

def fly_path(tello, path):
    tello.takeoff()
    time.sleep(2)

    for point in path:
        # Move to the next point
        tello.move_to(point[0], point[1], 30, 0)
        time.sleep(2)  # Adjust sleep time as needed

    # Land
    tello.land()
    time.sleep(2)

    # Disconnect
    tello.end()

def main():
    # Create grid and define start and end points
    grid = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ]
    start = (0, 0)
    end = (4, 4)

    # Calculate path
    path = astar(grid, start, end)

    if path:
        # Connect to Tello
        tello = Tello()
        tello.connect()

        # Fly the path
        fly_path(tello, path)
    else:
        print("No valid path found.")

if __name__ == "__main__":
    main()
