#!python
import cgi, cgitb, json, os
print("Content-type: text/html\n\n")
from lib import Sessions as sess
from lib import DBConnection as conn

cgitb.enable()
form = cgi.FieldStorage()
action = form.getvalue("action")
if action == "getStudents":
    sem = form.getvalue('sem')
    sql = "select sid,name,phone,semester,address,status from student_details s join login l on l.log_id =s.sid where (l.status=1 or l.status=2)"
    if sem != '0': sql += " and s.semester=%s" % sem
    res = conn.db.getJSON(sql)
    print(res)
elif action == "getStudRequest":
    sem = form.getvalue('sem')
    sql = "select sid,name,phone,semester,address,status from student_details s join login l on l.log_id =s.sid where l.status=0"
    if sem != '0': sql += " and s.semester=%s" % sem
    res = conn.db.getJSON(sql)
    print(res)
elif action == "setStudStatus":
    data = json.loads(form.getvalue('data'))
    sql = "update login set status=%s where log_id=%s"
    vals = (data['act'],data['sid'])
    res = conn.db.setValues(sql,vals)
    print(res)