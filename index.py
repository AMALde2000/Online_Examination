#!python
import cgi, cgitb
print("Content-type: text/html\n\n")
cgitb.enable()

import Model.lib.Sessions as sess
form = cgi.FieldStorage()

with open("Assets/template/header.html", "r") as cfile:
    header = cfile.read()
print(header)
menu = "View/guest/menu"
# content
if form.getvalue("page", 0) != 0:
    page = form.getvalue("page")
    if "guest" not in page:
        d = sess.session.GetSession("user")
        if len(d) == 0:
            page = "guest/login"
            print("<script> location.href='?page=guest/login';</script>")
            menu = "View/guest/menu"
        else:
            menu = "View/" + page.split("/")[0] + "/Menu"
else:
    page = "guest/login"

with open(menu + ".html", "r") as cfile:
    menuc = cfile.read()
print(menuc)

with open("View/" + page + ".html", "r") as cfile:
    content = cfile.read()
print(content)


# Footer
with open("Assets/template/footer.html", "r") as cfile:
    footer = cfile.read()
print(footer)
