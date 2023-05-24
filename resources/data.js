/* Password Manager App (v3.0)
 *
 * Notes:
 * -> The 'tab' property corresponds to the list of categories in 'app.html'
 * -> Appending 'web' to an array will turn the field into a clickable link.
 * -> Appending 'pw' will conceal the field.
 */

/* Personal Accounts */

const personal = [
    
    {   title: 'Google',
        website: ['https://google.com/','web'],
        username: ['googleuser'],
        password: ['pass1234','pw'],
        tab: 'website'
    },

];

/* Work Accounts */

const work = [

    {   title: 'Business Site',
        email: ['user@business.site'],
        username: ['workaccount'],
        password: ['mypassword','pw'],
        tab: 'financial'
    },

];

