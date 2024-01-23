import { defineStore } from "pinia";

export const useStore = defineStore('store', {
    state: () => ({

        version:'2.2',

        admin:{
            username:"",
            password:""
        },
        
        isLogedIn: false,

        db: {
            "websiteDatabase": {
                "contact": {
                    "email": "",
                    "number": "",
                    "waNumber": "",
                    "facebook": "",
                    "instagram": "",
                    "linkedIn": "",
                },
                "about": {
                    "heading": "",
                    "bio": "",
                    "about1": "",
                    "about2": "",
                    "about3": "",
                    "about4": "",
                },
                "services": [
                    {
                        "id": "",
                        "title": "",
                        "description": "",
                        "index": "",
                    },
                ],
                "stories": [
                    {
                        "id": "",
                        "thumbnail": "",
                        "index": "",
                    },
                ],
                "rules": [
                    {
                        "id": "",
                        "rule": "",
                        "index": "",
                    }
                ],
                "whyChooseUs": [
                    {
                        "id": "",
                        "note": "",
                        "index": "",
                    },
                ],
                "faq": [
                    {
                        "id": "",
                        "question": "",
                        "answer": "",
                        "index": "",
                    },
                ]
            },
            "adminDatabase": {
                "services": [
                    {
                        "id": "",
                        "title": "",
                        "capacity": "",
                        "duration": "",
                        "availability": "MONDAY-7:00-23:00,TUESDAY-7:00-19:00,WEDNESDAY-7:00-19:00,THURSDAY-7:00-19:00,FRIDAY-7:00-19:00,SATURDAY-7:00-15:00",
                        "range":"",
                        "cost": "",
                        "index": "",
                    },
                ],
                "guests": [
                    {
                        "id": "",
                        "name": "",
                        "email": "",
                        "number": "",
                        "timestamp": "",
                        "startingTime": "",
                        "endingTime": "",
                        "serviceId": "",
                        "eventId": "",
                        "index": "",
                    },
                ],
                "members": [
                    {
                        "id": "",
                        "useremail": "",
                        "joiningDate": "",
                        "index": "",
                    },
                ],
                "announcements": []
            }
        }



    }),
    actions: {

        getApi() {
            // return 'https://script.google.com/macros/s/AKfycbxIWrzksRxTz4nqtdh1M6t7D7DsnIHlAOsFSlXtzQ4gM5ydaLJXXxY2TDeH9FC3H8db/exec',
            return 'https://script.google.com/macros/s/AKfycbz_rwDLLwUjdiiFT9jPRy2Mo6IPA7YGo3PDwhZH0Mt30h39pN0L720gkreRl207mP6mcg/exec'
        },

    }
})