#!python
from lib import DBConnection as conn
from lib import Sessions as sess
import cgi
import cgitb
import json
import os
print("Content-type: text/html\n\n")

cgitb.enable()
form = cgi.FieldStorage()
action = form.getvalue("action")
if action == "login":
    data = json.loads(form.getvalue("data"))
    sql = "select log_id,user_type from login where username = %s and password = %s and status=1"
    vals = (data["username"], data["password"])
    res = json.loads(conn.db.getJSON(sql, vals))
    if(len(res)):
        res = json.dumps(res)
        sess.session.SetSession("user", res)
    print(res)
elif action == "logout":
    sess.session.RemoveAllSession()
elif action == "getUsers":
    data = json.loads(form.getvalue("data"))
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select s.st_id as uid,s.name,concat(s.img,'.',s.extn) image,c.name as ds,if(gender,\"Female\",\"Male\") gender from student s join college c on c.col_id=s.cl_id where s.st_id <> %s union select col_id as uid,name,concat(img,'.',extn) image,address as ds,'0' as gender from college where col_id <> %s"
    vals = (log_id, log_id)
    res = conn.db.getJSON(sql, vals)
    print(res)
elif action == "register":
    data = json.loads(form.getvalue("data"))
    if data['usertype'] == "student":
        sql = "select username from login where username='%s'" % data['email']
        res = json.loads(conn.db.getJSON(sql))
        if(len(res)):
            print('{"success":"-1"}')
        else:
            sql = "select phone from student_details where phone='%s'" % data['phone']
            res = json.loads(conn.db.getJSON(sql))
            if(len(res)):
                print('{"success":"-2"}')
            else:
                sql = "select ifnull(max(log_id),0)+1 log_id from login"
                log_id = json.loads(conn.db.getJSON(sql))
                log_id = log_id[0]["log_id"]
                sql = "insert into login values(%s,%s,%s,'student',0)"
                vals = (log_id, data['email'], data['pword'])
                res = conn.db.setValues(sql, vals)
                sql = "INSERT INTO `student_details`VALUES (%s,%s,%s,%s,%s,%s)"
                vals = (log_id, data['name'], data['phone'],
                        data['dept'], data['sem'], data['address'])
                res = conn.db.setValues(sql, vals)
                print('{"success":"1"}')
    elif data['usertype'] == "examiner":
        sql = "select username from login where username='%s'" % data['email']
        res = json.loads(conn.db.getJSON(sql))
        if(len(res)):
            print('{"success":"-1"}')
        else:
            sql = "select phone from examiner where phone='%s'" % data['phone']
            sid = json.loads(conn.db.getJSON(sql))
            if(len(res)):
                print('{"success":"-2"}')
            else:
                sql = "select ifnull(max(log_id),0)+1 log_id from login"
                pid = json.loads(conn.db.getJSON(sql))
                pid = pid[0]["log_id"]
                sql = "insert into login values(%s,%s,%s,'examiner',0)"
                vals = (pid, data['email'], data['pword'])
                res = conn.db.setValues(sql, vals)
                sql = "insert into examiner values(%s,%s,%s,%s)"
                vals = (pid, data['name'], data['dept'], data['phone'])
                res = conn.db.setValues(sql, vals)
                print('{"success":"1"}')

elif action == "getDept":
    sql = "SELECT * FROM `department`"
    res = conn.db.getJSON(sql)
    print(res)
elif action == "changePassword":
    data = json.loads(form.getvalue('data'))
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select log_id from login where log_id=%s and password=%s"
    vals = (log_id,data['pword'])
    res = json.loads(conn.db.getJSON(sql,vals))
    if(len(res)):
        sql = "update login set password=%s where log_id=%s"
        vals = (data['npword'],log_id)
        res = conn.db.setValues(sql,vals)
        print(1)
    else:
        print(2)
elif action == "addExaminer":
    data = json.loads(form.getvalue("data"))
    sql = "select username from login where username='%s'" % data['email']
    res = json.loads(conn.db.getJSON(sql))
    if(len(res)):
        print('{"success":"-1"}')
    else:
        sql = "select phone from examiner where phone='%s'" % data['phone']
        sid = json.loads(conn.db.getJSON(sql))
        if(len(res)):
            print('{"success":"-2"}')
        else:
            sql = "select ifnull(max(log_id),0)+1 log_id from login"
            pid = json.loads(conn.db.getJSON(sql))
            pid = pid[0]["log_id"]
            sql = "insert into login values(%s,%s,%s,'examiner',1)"
            vals = (pid, data['email'], data['pword'])
            res = conn.db.setValues(sql, vals)
            sql = "insert into examiner values(%s,%s,%s,%s)"
            vals = (pid, data['name'], data['dept'], data['phone'])
            res = conn.db.setValues(sql, vals)
            print('{"success":"1"}')
