import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


class SendMail:
    def sendEmail(self, to, sub, cont):
        try:
            port = 465
            password = "cts@123456"
            smtp = "smtp.gmail.com"
            ctx = ssl.create_default_context()

            frm = "cts.students.project@gmail.com"
            msg = MIMEMultipart("alternative")
            msg["Subject"] = sub
            msg["From"] = frm
            msg["To"] = to
            msg.attach(MIMEText(cont, "html"))

            with smtplib.SMTP_SSL(smtp, port, context=ctx) as server:
                server.login(frm, password)
                server.send_message(msg, frm, to)
                return 0
        except Exception as e:
            print(e)
sendEmail = SendMail()