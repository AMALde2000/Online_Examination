import mysql.connector
import json


class DBConnection:
    def __init__(self):
        self.host = "localhost" 
        self.database = "online_examination"
        self.user = "root"
        self.password = ""

    def __open(self):
        # connect to database
        self.__conn = mysql.connector.connect(
            host=self.host, user=self.user, passwd=self.password, db=self.database
        )
        # creating cursor for query execution
        self.__cur = self.__conn.cursor()

    def __closeConnection(self):
        self.__cur.close()
        self.__conn.close()

    def getJSON(self, sql, vals=0):
        jsonData = []
        data = self.getValues(sql, vals)
        for r in data:
            jsonData.append(dict(zip(self.head, r)))
        return json.dumps(jsonData)

    def getValues(self, sql, vals=0):
        self.__open()
        if vals == 0:
            self.__cur.execute(sql)
        else:
            self.__cur.execute(sql, vals)
        dt = self.__cur.fetchall()
        self.head = [x[0] for x in self.__cur.description]
        self.__closeConnection()
        return dt

    def setValues(self, sql, vals=0):
        self.__open()
        if vals == 0:
            self.__cur.execute(sql)
        else:
            self.__cur.execute(sql, vals)
        rowcnt = self.__cur.rowcount
        self.__conn.commit()
        self.__closeConnection()
        return rowcnt


db = DBConnection()

