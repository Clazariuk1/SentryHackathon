from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin
import smtplib
import logging

CARRIERS = {
    "att": "@mms.att.net",
    "tmobile": "@tmomail.net",
    "Verizon Wireless": "@vtext.com",
    "sprint": "@messaging.sprintpcs.com",
    "visible": "@vzwpix.com",
    "AERIAL COMMUNICATIONS": "@voicestream.net"
}

EMAIL = "thisisanemergencysos@gmail.com"
PASSWORD = "PASSWORD"

logging.basicConfig(filename='text_messages.log', level=logging.INFO, 
                    format='%(asctime)s %(levelname)s:%(message)s')

def send_message(recipient, message):
    auth = (EMAIL, PASSWORD)

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(auth[0], auth[1])
        server.sendmail(auth[0], recipient, message)
        logging.info(f"Message sent to {recipient}")

app = Flask(__name__)
CORS(app)

@app.route('/send_text', methods=['POST', 'OPTIONS'])
@cross_origin()
def send_text():
    data = request.json
    phone_number = data["phone_number"]
    if not phone_number.startswith("+1"):
        phone_number = "+1" + phone_number
    logging.info(f"Received request to send text to {phone_number}")

    try:
        response1 = requests.get(
            f"https://www.ipqualityscore.com/api/json/phone/API_KEY/{phone_number}"
        )
        response2 = requests.get(
            f"https://maps.googleapis.com/maps/api/geocode/json?latlng={data['lat']},{data['lng']}&key=API_KEY"
        )
        response1_data = response1.json()
        carrier = response1_data["carrier"]

        address = response2.json()["results"][0]["formatted_address"]
        message = f"Hey, {data['recipient_name']}! {data['sender_name']} is in danger at {address}. Please help them!"
        recipient = data["phone_number"] + CARRIERS[carrier]
        send_message(recipient, message)
        logging.info(f"Text sent to {recipient} with message: {message}")
        return jsonify({"status": "success"}), 200
    except Exception as e:
        logging.error(f"Error sending text: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run()
