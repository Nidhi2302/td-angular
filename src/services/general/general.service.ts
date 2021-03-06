export class GeneralService {
    static getValidatorErrorMessage() {
        let validationMessages = {
            'requiredField': "This field is required.",
            'onlyNumber': "Only number allowed.",
            'messageMaxLength' : "Maximum Limit 360 character...",
            'reportSuccess' : "Issue has been reported successfully.",
            'invalidLat':"Invalid Latitude.",
            'invalidLng':"Invalid Longitude.",
            'NOTIFICATION_SENT': "Notification sent successfully."
        };

        return validationMessages;
    }
    static getStates(){
        let states=["Alabama", 
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "District of Columbia",
            "Delaware",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Marianas Islands",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "U.S. Virgin Islands",
            "Vermont",
            "Virginia",
            "Virgin Islands",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
            ]
        return states
    }
}
