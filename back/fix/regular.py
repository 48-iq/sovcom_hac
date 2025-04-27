import re

def findTime(text: str) -> str:
  time_pattern = r'[0-9][0-9]:[0-9][0-9]'
  time_match = re.search(time_pattern, text)

  if time_match:
    return time_match.group()

def findDate(text: str) -> str:
  date_pattern = r'[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]'
  date_match = re.search(date_pattern, text)

  if date_match:
    return date_match.group()

def findPartner(text: str, available_partners) -> str:
  for partner in available_partners:
    if partner in text:
      return partner