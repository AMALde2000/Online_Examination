#!python
import cgi, cgitb, json, os
print("Content-type: text/html\n\n")
from lib import Sessions as sess
from lib import DBConnection as conn

cgitb.enable()
form = cgi.FieldStorage()
action = form.getvalue("action")
if action=="getExaminer":
    sql = "select eid,name,dept_name,phone,status from examiner e join login l on l.log_id=e.eid join department d on d.dept_id=e.dept_id where l.status=1 or l.status=2"
    res = conn.db.getJSON(sql)
    print(res)
elif action=="getExRequests":
    sql = "select eid,name,dept_name,phone,status from examiner e join login l on l.log_id=e.eid join department d on d.dept_id=e.dept_id where l.status=0"
    res = conn.db.getJSON(sql)
    print(res)
elif action=="examinerAction":
    data = json.loads(form.getvalue('data'))
    sql = "update login set status=%s where log_id=%s"
    vals = (data['act'],data['eid'])
    res = conn.db.setValues(sql,vals)
    print(res)
elif action == "getEamList":
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select eid,ex_name,left(ex_date,10) ex_date,semester from exam where examiner_id=%s" % log_id
    res = conn.db.getJSON(sql)
    print(res)
