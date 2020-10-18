# -*- coding: utf-8 -*-
"""
Created on Sat Oct 17 00:55:20 2020

@author: Brandon
"""
import pandas as pd
import pandas_datareader as web
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices
import json
from flask import Flask, jsonify, request

app = Flask(__name__)

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
    #print(df_stocks.head())
    #nullin_df = pd.DataFrame(df_stocks,columns=tickers)
    #print(nullin_df.isnull().sum())
    
    mu = expected_returns.mean_historical_return(df_stocks)
    Sigma = risk_models.sample_cov(df_stocks)
    if int(first) == 1:
        ef = EfficientFrontier(mu, Sigma, weight_bounds=(0,1))
    else:
        ef = EfficientFrontier(mu, Sigma, weight_bounds=(-1,1))
    sharpe_pfolio=ef.max_sharpe()
    cleaned_weights = ef.clean_weights()
    
    #print(cleaned_weights)
    #ef.portfolio_performance(verbose=True)
    
    
    latest_prices = get_latest_prices(df_stocks)
    
    da = DiscreteAllocation(cleaned_weights, latest_prices, total_portfolio_value=int(funds))
    allocation, leftover = da.lp_portfolio()
    #print("Discrete allocation:", allocation)
    #print("Funds remaining: ${:.2f}".format(leftover))
    #new_alloc = {str(key): str(value) for key, value in allocation}
    new_alloc = {}
    for key in allocation:
        new_alloc[key] = str(allocation[key])
        
    allocjson = json.dumps(new_alloc)
    #print(allocjson)
    return jsonify(allocation = new_alloc,
                   leftover = leftover)
