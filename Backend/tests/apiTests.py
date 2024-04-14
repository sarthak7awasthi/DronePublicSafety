import unittest
from app import create_app
import json

class TestAPIRoutes(unittest.TestCase):
    def setUp(self):
        app = create_app()
        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_hello_route(self):
        response = self.client.get('/hello')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Hello, World!')

    def test_start_drone_route(self):
        response = self.client.post('/start')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['message'], 'Drone started successfully.')

if __name__ == '__main__':
    unittest.main()
