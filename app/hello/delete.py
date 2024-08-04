
import json
from datetime import datetime

def handler(event, context):

    body = {'message-delete': True}

    res = {
        'statusCode': 200,
        'body': body
    }

    res['body'] = json.dumps(res['body'], ensure_ascii=False)
    return res

