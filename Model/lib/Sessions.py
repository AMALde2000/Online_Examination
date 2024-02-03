import cgi, os, json
from . import DBConnection as conn

db = conn.DBConnection()


class Session:
    def __init__(self):
        # cgi.escape()//3.7
        self.ip = str(os.environ["REMOTE_ADDR"])
        self.browser = str(os.environ["HTTP_USER_AGENT"]).replace("'", "'")

    def SetSession(self, key, val):
        val = val.replace("'", "'")
        if self.GetSession(key):
            sql = "update session set v = %s where browser = %s and ipaddress = %s and k = %s"
            vals = (val, self.browser, self.ip, key)
        else:
            sql = "insert into session values(%s, %s, %s, %s)"
            vals = (self.browser, self.ip, key, val)
        db.setValues(sql, vals)

    def GetSession(self, key):
        sql = "select v from session where browser = %s and ipaddress = %s and k = %s"
        vals = (self.browser, self.ip, key)
        res = db.getJSON(sql, vals)
        res = json.loads(res)
        if len(res) == 0:
            return 0
        else:
            res = json.loads(res[0]["v"])
        return res

    def RemoveSession(self, key):
        sql = "delete from session where browser = %s and ipaddress = %s and k = %s"
        vals = (self.browser, self.ip, key)
        db.setValues(sql, vals)

    def RemoveAllSession(self):
        sql = "delete from session where browser = %s and ipaddress = %s"
        vals = (self.browser, self.ip)
        db.setValues(sql, vals)


session = Session()
