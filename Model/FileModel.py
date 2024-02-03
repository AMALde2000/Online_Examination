#!python
import cgi, os
import cgitb, json
from lib import DBConnection as conn
from lib import Sessions as sess

print("Content-type: text/html\n\n")
cgitb.enable()
form = cgi.FieldStorage()
log_id = sess.session.GetSession("user")[0]
role = log_id["user_type"]
log_id = log_id["log_id"]
action = form.getvalue("action")
if action == "updateCertificate":
    message = 0
    cid = form.getvalue("cid")
    pas = form.getvalue("pass")
    fileitem = form["file"]
    if fileitem.filename:
        fname = os.path.basename(fileitem.filename)
        fname = fname.split(".")
        fname = fname[len(fname)-1]
        sql = "update certificates set date=current_date,ext=%s,status='0',dec_key=%s where cid=%s"
        vals = (fname,pas,cid)
        res = conn.db.setValues(sql,vals)
        fname = "%s.%s" % (cid,fname)
        open("../Assets/uploads/" + fname, "wb").write(fileitem.file.read())
        message = 1
    else:
        message = 0
    print('{"success":%s}' % message)
elif action == "upload":
    message = 0
    fileitem = form["file"]
    if fileitem.filename:
        ctype = form.getvalue("type")
        des = form.getvalue("des")
        dept = form.getvalue("dept")
        priority = form.getvalue("priority")
        fn = os.path.basename(fileitem.filename)
        fn = fn.split(".")
        fn = fn[len(fn)-1]
        sql = "select ifnull(max(cid),0)+1 cid from `complaint`"
        res = json.loads(conn.db.getJSON(sql))
        cid = res[0]["cid"]
        sql = "INSERT INTO `complaint`(`cid`, `uid`, `dept`, `type`, `des`, `ext`, `status`,`priority`) VALUES (%s,%s,%s,%s,%s,%s,0,%s)"
        vals = (cid, log_id, dept, ctype, des,fn,priority)
        res = conn.db.setValues(sql, vals)
        fn = "%s.%s" % (cid,fn)
        open("../Assets/uploads/" + fn, "wb").write(fileitem.file.read())
        message = 1
    else:
        ctype = form.getvalue("type")
        des = form.getvalue("des")
        dept = form.getvalue("dept")
        priority = form.getvalue("priority")
        sql = "select ifnull(max(cid),0)+1 cid from `complaint`"
        res = json.loads(conn.db.getJSON(sql))
        cid = res[0]["cid"]
        sql = "INSERT INTO `complaint`(`cid`, `uid`, `dept`, `type`, `des`, `ext`, `status`,`priority`) VALUES (%s,%s,%s,%s,%s,'null',0,%s)"
        vals = (cid,log_id,dept,ctype,des,priority)
        res = conn.db.setValues(sql, vals)
        message = 1
    print('{"success" : %s}' % message)
