from pymongo import MongoClient
from other_data import other_data
from partners_data import partners_data
class MongoClient:
  def __init__(self, host: str = 'localhost:27017'):
    self.client = MongoClient(host)
    self.db = self.client['app']
    self.receipts_coll = self.db['receipts']
    self.check_coll = self.db['check']
    self.partners_coll = self.db['partners']
    self.other_coll = self.db['other']

    is_new = self.check_coll.count_documents({}) == 0

    if is_new:
      self.partners_coll.insert_many(partners_data)
      self.other_coll.insert_many(other_data)     

    self.check_coll.insert_one({"test": "test"})
  
  def get_other(self):
    return self.other_coll.find({})
  
  def get_partners(self):
    return self.partners_coll.find({})
  
  def get_all_shops(self):
    return [*self.other_coll.find({}), *self.partners_coll.find({})]
  
  def is_new(self):
    return self.check_coll.count_documents({}) == 0

  def insert_receipt(self, data: dict):
    self.collection.insert_one(data)

  def get_receipts(self):
    return self.receipts_coll.find({})
  
