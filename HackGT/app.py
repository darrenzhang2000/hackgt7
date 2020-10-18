# -*- coding: utf-8 -*-
"""
Created on Sat Oct 17 00:55:20 2020

@author: Brandon
"""
import pandas as pd
import requests
import pandas_datareader as web
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
from flask import Flask, jsonify, request
import json
import random

app = Flask(__name__)

@app.route('/')   
def init():
    return '{"msg":"Welcome to GoodInvest API Service"}'
    

@app.route('/getport')
def GetPort(): #tickers = ['BSX','AES','BRK-B','SEE','QQQ','SPY'], first = 0, funds = 10000):
    ticks=request.args.get('tickers')
    tickers = list(ticks.split(" "))
    first=request.args.get('first')
    funds = request.args.get('Funds')
    
    thelen = len(tickers)
    price_data = []
    for ticker in range(thelen):
        prices = web.DataReader(tickers[ticker], start='2015-01-01', end = '2020-10-17', data_source='yahoo')
        price_data.append(prices.assign(ticker=ticker)[['Adj Close']])
    df_stocks = pd.concat(price_data, axis=1)
    df_stocks.columns=tickers
    
    mu = expected_returns.mean_historical_return(df_stocks)
    Sigma = risk_models.sample_cov(df_stocks)
    if int(first) == 1:
        ef = EfficientFrontier(mu, Sigma, weight_bounds=(0,1))
    else:
        ef = EfficientFrontier(mu, Sigma, weight_bounds=(-1,1))
    sharpe_pfolio=ef.max_sharpe()
    cleaned_weights = ef.clean_weights()
    latest_prices = get_latest_prices(df_stocks)
    
    da = DiscreteAllocation(cleaned_weights, latest_prices, total_portfolio_value=int(funds))
    allocation, leftover = da.lp_portfolio()
    
    new_alloc = {}
    for key in allocation:
        new_alloc[key] = str(allocation[key])
        
    allocjson = json.dumps(new_alloc)
    return jsonify(allocation = new_alloc,
                   leftover = leftover)


@app.route('/ytdreturns')   
def ytdreturns():
    port = request.args.get("port")
    wght= request.args.get("wght")
    portfolio = list(port.split(" "))
    weight = list(wght.split(" "))
    brparam = ""
    for i in range(len(portfolio)):
        if i < len(port):
            brparam = brparam + str(portfolio[i])
            brparam = brparam + "~" + str(weight[i])
            brparam = brparam + "%7C"
        #AAPL~25%7CITOT~25%7CAGG~25%7CEFAV~25
    url = "https://www.blackrock.com/tools/hackathon/portfolio-analysis?betaPortfolios=SNP500&calculateExposures=true&calculatePerformance=true&portfolioValue=0&positions={}&riskFreeRatePortfolio=LTBILL1-3M".format(brparam)

    payload = {}
    headers = {
    'Cookie': 'JSESSION_blk-tools02=443C0A11F9F21AF97087EE9CF8B0F235.04'
    }

    response = requests.request("GET", url, headers=headers, data = payload)
    data = json.loads(response.text)
    resultmap = data['resultMap']
    p = resultmap['PORTFOLIOS'][0]['portfolios'][0]['returns']['latestPerf']['sixMonth']
    return "The 6 month returns are: " + str(round(p,2)*100) + "%"
    #print(response.text.encode('utf8'))

@app.route('/buy')
def buyit():
    return "Bought the stock!"

@app.route('/sell')
def sellit():
    return "Sold the stock"

@app.route('/questionsell')
def qsell():
    num = random.randint(0,10)
    if num > 5:
        return "Based on my info, you should buy."
    else:
        return "Based on my info, you should sell."

@app.route('/adduser')
def addthem():
    return "Added the user"

@app.route('/getholdings')
def getholds():
    return "Currently holding 500 shares of TSLA!"

@app.route('/sharpe')
def getsharpe():
    port = request.args.get("port")
    wght= request.args.get("wght")
    portfolio = list(port.split(" "))
    weight = list(wght.split(" "))
    brparam = ""
    for i in range(len(portfolio)):
        if i < len(port):
            brparam = brparam + str(portfolio[i])
            brparam = brparam + "~" + str(weight[i])
            brparam = brparam + "%7C"
        #AAPL~25%7CITOT~25%7CAGG~25%7CEFAV~25
    url = "https://www.blackrock.com/tools/hackathon/portfolio-analysis?betaPortfolios=SNP500&calculateExposures=true&calculatePerformance=true&portfolioValue=0&positions={}&riskFreeRatePortfolio=LTBILL1-3M".format(brparam)

    payload = {}
    headers = {
    'Cookie': 'JSESSION_blk-tools02=443C0A11F9F21AF97087EE9CF8B0F235.04'
    }

    response = requests.request("GET", url, headers=headers, data = payload)
    data = json.loads(response.text)
    resultmap = data['resultMap']
    p = resultmap['PORTFOLIOS'][0]['portfolios'][0]['returns']['latestPerf']['oneYearSharpeRatio']
    #return brparam
    return "The one year sharpe ratio is: " + str(round(p,2))
    #print(response.text.encode('utf8'))

@app.route('/goodinvest')
def goodinvest():
    port = request.args.get("port")
    wght= request.args.get("wght")
    portfolio = list(port.split(" "))
    weight = list(wght.split(" "))
    brparam = ""
    for i in range(len(portfolio)):
        if i < len(port):
            brparam = brparam + str(portfolio[i])
            brparam = brparam + "~" + str(weight[i])
            brparam = brparam + "%7C"
        #AAPL~25%7CITOT~25%7CAGG~25%7CEFAV~25
    url = "https://www.blackrock.com/tools/hackathon/portfolio-analysis?betaPortfolios=SNP500&calculateExposures=true&calculatePerformance=true&portfolioValue=0&positions={}&riskFreeRatePortfolio=LTBILL1-3M".format(brparam)

    payload = {}
    headers = {
    'Cookie': 'JSESSION_blk-tools02=443C0A11F9F21AF97087EE9CF8B0F235.04'
    }

    response = requests.request("GET", url, headers=headers, data = payload)
    data = json.loads(response.text)
    resultmap = data['resultMap']
    p = resultmap['PORTFOLIOS'][0]['portfolios'][0]['returns']['downMonthsPercent']
    if p < 0.2:
        stockq = "great"
    elif p > 0.2 and p < 0.35:
        stockq = "good"
    elif p > 0.35 and p < 0.45:
        stockq = "ok"
    stockqual = "The portfolio has " + str(round(p,2))  + " down days making it a " + stockq + " pick."
    return stockqual
    #print(response.text.encode('utf8'))

@app.route('/getuser')
def getuser():
    userid = request.args.get("uid")
    url = "http://investr.azurewebsites.net/api/getuserbyid"

    payload = "{\"userid\" : \"0\" }"
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data = payload)
    #print(response.text.encode('utf8'))

    data = json.loads(response.text)
    user = data['user']
    firstname = user['fname']
    return "Hello " + str(firstname).capitalize() + "!"
    #return data

@app.route('/getusercoins')
def getusercoins():
    userid = request.args.get("uid")
    url = "http://investr.azurewebsites.net/api/getuserbyid"

    payload = "{\"userid\" : \"0\" }"
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data = payload)
    #print(response.text.encode('utf8'))

    data = json.loads(response.text)
    user = data['user']
    coins = user['coins']
    return "You have " + str(coins) + " coins."
    #return data

#port=BP COF NVDA PYPL SBUX&wght=25 26 6 10 33

@app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)
    fulfillmentText = ''
    query_result = req.get('queryResult')
    keyed = query_result.get('parameters').keys()[0]
    if query_result.get('parameters') == 'sixmonthreturn':
        value = sixmonth()
        fulfillmentText = "The return from the last six months is" + str(round(value,2)) + "%"
    elif query_result.get('parameters') == 'totalcoins':
        value = usercoins()
        fulfillmentText = "You have " + str(value) + "coins."
    return {
        "fulfillmentText": keyed,
        "displayText": '25',
        "source": "webhookdata"
    }

def sixmonth(): 
    brparam = "BP~25%7CCOF~26%7CNVDA~6%7CPYPL~10%7CSBUX~33%7C"
    url = "https://www.blackrock.com/tools/hackathon/portfolio-analysis?betaPortfolios=SNP500&calculateExposures=true&calculatePerformance=true&portfolioValue=0&positions={}&riskFreeRatePortfolio=LTBILL1-3M".format(brparam)

    payload = {}
    headers = {
    'Cookie': 'JSESSION_blk-tools02=443C0A11F9F21AF97087EE9CF8B0F235.04'
    }

    response = requests.request("GET", url, headers=headers, data = payload)
    data = json.loads(response.text)
    resultmap = data['resultMap']
    p = resultmap['PORTFOLIOS'][0]['portfolios'][0]['returns']['latestPerf']['sixMonth']
    return p

def usercoins():
    url = "http://investr.azurewebsites.net/api/getuserbyid"

    payload = "{\"userid\" : \"0\" }"
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data = payload)
    #print(response.text.encode('utf8'))

    data = json.loads(response.text)
    user = data['user']
    coins = user['coins']
    return coins