import emailjs from '@emailjs/browser';

export default function sendMailEmailJsDotEnv(params){
    require('dotenv').config()
    
    const emailMsg = `From UserID: ${process.env.REACT_APP_EMAIL_JS_USER_ID}\nTo: ${params.Recipient}\nSubject: ${params.Subject}\nBody: ${params.Body}` 
    alert(emailMsg)
}


// export default function sendMailEmailJsGithubSecrets(params){
//     // require('dotenv').config()
    
//     const emailMsg = `From UserID: ${process.env.REACT_APP_EMAIL_JS_USER_ID}\nTo: ${params.Recipient}\nSubject: ${params.Subject}\nBody: ${params.Body}` 
//     alert(emailMsg)
// }
