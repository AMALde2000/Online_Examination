#!python
import cgi
import os
import cgitb
import json
from lib import DBConnection as conn
from lib import Sessions as sess

print("Content-type: text/html\n\n")
cgitb.enable()
form = cgi.FieldStorage()
log_id = sess.session.GetSession("user")[0]
role = log_id["user_type"]
log_id = log_id["log_id"]
action = form.getvalue("action")
if action == "addExam":
    data = json.loads(form.getvalue('data'))
    sql = "select ifnull(max(eid),0)+1 eid from exam"
    eid = json.loads(conn.db.getJSON(sql))
    eid = eid[0]['eid']
    ex_id = sess.session.GetSession('user')[0]
    ex_id = ex_id['log_id']
    sql = "select dept_id from examiner where eid=%s" % ex_id
    did = json.loads(conn.db.getJSON(sql))
    did = did[0]['dept_id']
    sql = "insert into exam values(%s,%s,%s,%s,%s,%s,%s)"
    vals = (eid, data['exam'], data['date'], '0', did, data['sem'], ex_id)
    res = conn.db.setValues(sql, vals)
    print(eid)
elif action == "addQuestion":
    data = json.loads(form.getvalue('data'))
    qst = data['question']
    eid = data['eid']
    sql = "select ifnull(max(qid),0)+1 qid from question"
    qid = json.loads(conn.db.getJSON(sql))
    qid = qid[0]['qid']
    for q in qst:
        sql = "insert into question values(%s,%s,%s,%s)"
        vals = (qid, eid, q['mark'], q['qst'])
        res = conn.db.setValues(sql, vals)
        sql = "select ifnull(max(oid),0)+1 oid from options"
        oid = json.loads(conn.db.getJSON(sql))
        oid = oid[0]['oid']
        sql = "insert into options(`oid`,`qid`,`q_option`,`status`) values "
        for i in range(1, 5):
            if(i == int(q['ans'])):
                sql += "(%s,%s,'%s',%s)," % (oid, qid, q['op'+str(i)], 1)
            else:
                sql += "(%s,%s,'%s',%s)," % (oid, qid, q['op'+str(i)], 0)
            oid += 1
        res = conn.db.setValues(sql[:-1])
        qid += 1
    sql = "update exam set total =%s where eid=%s"
    vals = (data['total'], eid)
    res = conn.db.setValues(sql, vals)
    print(1)
elif action == "cancelExam":
    eid = form.getvalue('eid')
    sql = "select qid from question where eid=%s" % eid
    res = json.loads(conn.db.getJSON(sql))
    for r in res:
        sql = "delete from options where qid=%s" % r['qid']
        res = conn.db.setValues(sql)
    sql = "delete from question where eid=%s" % eid
    res = conn.db.setValues(sql)
    sql = "delete from exam where eid=%s" % eid
    res = conn.db.setValues(sql)
    print(res)
elif action == "getStudentEamList":
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select dept_id,semester from student_details where sid=%s" % log_id
    res = json.loads(conn.db.getJSON(sql))
    sql = "select e.eid,ex_name,left(ex_date,10) ex_date,total,ex.name from exam e join examiner ex on ex.eid=e.examiner_id where e.dept_id=%s and e.semester=%s"
    vals = (res[0]['dept_id'], res[0]['semester'])
    res = conn.db.getJSON(sql, vals)
    print(res)
elif action == "getQuestions":
    eid = form.getvalue('eid')
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select rid from result where sid=%s and eid=%s"
    vals = (log_id, eid)
    res = json.loads(conn.db.getJSON(sql, vals))
    if(len(res)):
        res = 0
    else:
        sql = "select  o.qid,q_option,status,mark,question,ex_name,left(ex_date,10) ex_date,total from options o join question q on q.qid=o.qid join exam e on e.eid=q.eid where e.eid=%s order by o.qid" % eid
        res = conn.db.getJSON(sql)
    print(res)
elif action == "setResult":
    data = json.loads(form.getvalue('data'))
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select ifnull(max(rid),0)+1 rid from result"
    rid = json.loads(conn.db.getJSON(sql))
    rid = rid[0]['rid']
    sql = "insert into result values(%s,%s,%s,%s)"
    vals = (rid, data['eid'], log_id, data['score'])
    res = conn.db.setValues(sql, vals)
    print(res)
elif action == "getStudentResult":
    log_id = sess.session.GetSession("user")[0]
    log_id = log_id["log_id"]
    sql = "select r.total score,e.ex_name,left(e.ex_date,10) ex_date,e.total,ex.name from result r join exam e on e.eid=r.eid join examiner ex on ex.eid=e.examiner_id where r.sid = %s order by e.ex_date desc" % log_id
    res = conn.db.getJSON(sql)
    print(res)
elif action == "examList":
    sql = "select e.ex_name,left(e.ex_date,10) ex_date,e.semester,ex.name,d.dept_name from exam e join examiner ex on ex.eid=e.examiner_id join department d on d.dept_id=e.dept_id"
    res = conn.db.getJSON(sql)
    print(res)
elif action == "getAllStudentResult":
    eid = form.getvalue('eid')
    sql = "select rid,s.name,total from result r join student_details s on s.sid=r.sid where eid=%s" % eid
    res = conn.db.getJSON(sql)
    print(res)
