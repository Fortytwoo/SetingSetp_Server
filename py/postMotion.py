import requests
import time
import json
from datetime import datetime, timedelta

@eel.expose
def putSport(cookie,url,userId,step):
        cookie = cookie

        url= url + str(time.time)

        # ID
        # 不重要
        id = ''
        # 用户ID
        userId = userId
        # 需要设置的步数
        step = step

        headers = {
            'Cookie': cookie,
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 10; VOG-AL00 Build/HUAWEIVOG-AL00)',
            'Host': 'sports.lifesense.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Content-Length': '363'

        }
        # 当前时间/精确到秒 该HTTP链接被建立的时间
        created = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # 当前时间/精确到天
        dayMeasurementTime = datetime.now().strftime('%Y-%m-%d')
        # 测量时间
        measurementTime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        updated = int(str(int(time.time())) + "000")
        data = {
            "list": [
                {
                    "active": 1,
                    "calories": 25.883345,
                    "created": created,
                    "dataSource": 2,
                    "dayMeasurementTime": dayMeasurementTime,
                    "deviceId": "M_NULL",
                    "distance": 12,
                    "id": id,
                    "isUpload": 0,
                    "measurementTime": measurementTime,
                    "priority": 0,
                    "step": step,
                    "type": 2,
                    "updated": updated,
                    "userId": "26480340",
                    "DataSource": 2,
                    "exerciseTime": 0
                }
            ]
        }
        response = requests.post(url, headers=headers,json=data,verify=False)
        return json.loads(response.content)