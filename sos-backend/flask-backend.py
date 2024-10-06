from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin
import smtplib
import logging

EMAIL = "thisisanemergencysos@gmail.com"
PASSWORD = "PASSWORD"

logging.basicConfig(filename='text_messages.log', level=logging.INFO,
                    format='%(asctime)s %(levelname)s:%(message)s')

def send_message(recipient, message):
    auth = (EMAIL, PASSWORD)

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(auth[0], auth[1])
        server.sendmail(auth[0], recipient, f"Subject: THIS IS AN EMERGENCY!!!\n\n{message}")
        logging.info(f"Message sent to {recipient}")

app = Flask(__name__)
CORS(app)

@app.route('/send_text', methods=['POST', 'OPTIONS'])
@cross_origin()
def send_text():
    data = request.json
    logging.info(data)
    recipient = data["emergencyPhone"]

    try:
        response2 = requests.get(
            f"https://maps.googleapis.com/maps/api/geocode/json?latlng={data['latitude']},{data['longitude']}&key=API_KEY"
        )

        address = response2.json()["results"][0]["formatted_address"]
        message = f"Hello! {data['fullName']} is in danger at {address} {data['location']}. Please help them!"
        send_message(recipient, message)
        logging.info(f"Text sent to {recipient} with message: {message}")
        return jsonify({"status": f"{message} sent to {recipient}"}), 200
    except Exception as e:
        logging.error(f"Error sending text: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500