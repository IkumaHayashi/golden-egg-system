import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def get_firestore_client():
    cred = credentials.Certificate(os.getcwd() + "/config/firebase-adminsdk.json")
    firebase_admin.initialize_app(cred)
    return firestore.client()
