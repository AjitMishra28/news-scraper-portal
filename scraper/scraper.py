# scraper.py
import requests
from bs4 import BeautifulSoup

def get_news():
    url = "https://news.ycombinator.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Updated selector as Hacker News no longer uses .storylink
    titles = soup.select('.titleline > a')
    news = [{"title": title.text, "link": title.get('href')} for title in titles]
    return news
