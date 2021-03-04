const validationRules = {
    email: [
        {
            rule: /^([a-z\d.-]+)/,
            message: '<b>example@mail.com</b>'
        },
        {
            rule: /@([a-z\d-]+)/,
            message: 'example<b>@mail.com</b>'
        },
        {
            rule: /\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
            message: 'example@mail<b>.com</b>'
        }
        
    ],
    username: [
        {
            rule: /^[ \x2D0-9_a-z]{5,20}$/i,
            message: 'Username tidak valid'
        }
    ],
    password: [
        {
            rule: /^[\d\w@-]{6,20}$/i,
            message: 'Password tdak valid'
        }
    ]
}

function validation(value, rules) {
    let valid
    let text

    for (var i = 0; i < rules.length; i++) {
        const thisRules = rules[i]

        if (thisRules.rule.test(value)) {
            valid = true
            text = value
        } else {
            valid = false
            text = thisRules.message
            break
        }
    }

    return {valid, text}
}

export const validateEmail = (email) => validation(email, validationRules.email)
export const validatePassword = (password) => validation(password, validationRules.password)
export const validateUsername = (username) => validation(username, validationRules.username)