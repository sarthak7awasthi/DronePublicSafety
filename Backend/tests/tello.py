import unittest
from unittest.mock import MagicMock, patch
from app.Drone.utils import initializeTello
from app.Drone.faceTrackingTello import starter

class TestStarterFunction(unittest.TestCase):
    @patch('app.Drone.faceTrackingTello.initializeTello')
    @patch('app.Drone.faceTrackingTello.telloGetFrame')
    @patch('app.Drone.faceTrackingTello.findPerson')
    @patch('app.Drone.faceTrackingTello.trackFace')
    @patch('cv2.imshow')
    @patch('cv2.waitKey')
    @patch('cv2.cvtColor')
    def test_starter_function(self, mock_cvtColor, mock_waitKey, mock_imshow,
                              mock_trackFace, mock_findPerson, mock_telloGetFrame,
                              mock_initializeTello):
        # Mocking dependencies
        mock_drone = MagicMock()
        mock_frame_reader = MagicMock()
        mock_telloGetFrame.return_value = (None, mock_frame_reader)
        mock_info = MagicMock()
        mock_findPerson.return_value = (None, mock_info)
        mock_dims = [640, 480]
        mock_pid = [0.4, 0.4, 0]
        mock_pErrors = [0, 0]
        mock_trackFace.return_value = mock_pErrors

        mock_initializeTello.return_value = mock_drone

        # Call the function
        starter()

        # Assertions
        mock_drone.takeoff.assert_called_once()
        mock_drone.move_up.assert_called_once_with(50)
        mock_telloGetFrame.assert_called_once_with(mock_drone, 640, 480)
        mock_findPerson.assert_called_once()
        mock_trackFace.assert_called_once_with(mock_drone, mock_info, mock_dims,
                                                mock_pid, mock_pErrors)
        mock_drone.streamoff.assert_called_once()
        mock_drone.land.assert_called_once()

if __name__ == '__main__':
    unittest.main()
