from locust import HttpUser, task, between
from faker import Faker

class QuickstartUser(HttpUser):
    wait_time = between(5, 9)
    token = ''

    @task
    def last_missions(self):
        self.client.get('/lastMissions', headers={
            "Authorization": self.token
        })

    def on_start(self):
        faker = Faker()

        response = self.client.post(
            "/auth/register",
            json = {
                "username": 'user',
                "email": faker.email(),
                "password": '1234'
            }
        )

        response_json = response.json()
        self.token = response_json['access_token']
