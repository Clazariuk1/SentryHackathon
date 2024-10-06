from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin
import smtplib

CARRIERS = {
    "att": "@mms.att.net",
    "tmobile": "@tmomail.net",
    "Verizon Wireless": "@vtext.com",
    "sprint": "@messaging.sprintpcs.com",
    "visible": "@vzwpix.com",
    "AERIAL COMMUNICATIONS": "@voicestream.net"
}

EMAIL = "thisisanemergencysos@gmail.com"
PASSWORD = "PLACE HOLDER PASSWORD"

def send_message(recipient, message):
    auth = (EMAIL, PASSWORD)

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(auth[0], auth[1])
        server.sendmail(auth[0], recipient, message)

app = Flask(__name__)
CORS(app)

@app.route('/send_text', methods=['POST', 'OPTIONS'])
@cross_origin()
def send_text():
    data = request.json
    phone_number = data["phone_number"]
    if not phone_number.startswith("+1"):
        phone_number = "+1" + phone_number
    print(data)

    try:
        response1 = requests.get(
            f"https://www.ipqualityscore.com/api/json/phone/IPQUALITY_API_KEY/{phone_number}"
        )
        response2 = requests.get(
            f"https://maps.googleapis.com/maps/api/geocode/json?latlng={data['lat']},{data['lng']}&key=GOOGLE_API_KEY"
        )
        response1_data = response1.json()
        carrier = response1_data["carrier"]

        address = response2.json()["results"][0]["formatted_address"]
        message = f"Hey, {data['recipient_name']}! {data['sender_name']} is in danger at {address}. Please help them!"
        recipient = data["phone_number"] + CARRIERS[carrier]
        send_message(recipient, message)
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


#@app.route('/send_audio', methods=['POST'])
#@cross_origin()
#def send_audio():
#    phone_number = request.form['phone_number']
#    audio_file = request.files['audio']

    # Save the audio file or send it as an SMS (example logic)
    # Here you could implement sending logic similar to how you send text messages
#    recipient = phone_number + CARRIERS['some_carrier']  # Determine the correct carrier
    # Implement your logic to send the audio file to the recipient
    # You might need to upload to a service or send as an MMS

#    return jsonify({"status": "success"}), 200
