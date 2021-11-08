# API server for bitcoin address generator 
## OverView
API server allows generation of bitcoin address.The following operations are suppoerted:
1.	Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
2.	Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and addresses can be specified

## Backend technologies stack
TypeScript, Node.js, Nest.js, RSA, REST API

## Table of Contents
- [1. Quick Guide](#guide)
  - [Installation](#installation)
  - [Running the app](#run)
  - [Test](#test)
- [2. API Introduction](#introduction)
  - [RSA](#rsa)
  - [Generate SegWit address API](#seg-wit)
  - [Generate multi-sig address API](#multi-sig)
- [3. API Test interface](#interface)
- [3. Reference](#reference)

<a id="guide"></a>

## 1. Quick Guide
### 1.0 System require
- [**Node.js** v16+](https://nodejs.org/en/)
- [**yarn** v1.21+](https://classic.yarnpkg.com/en/)

<a id="installation"></a>

### 1.1 Installation
```bash
#Install dependencies:
$ yarn
```

<a id="run"></a>

### 1.2 Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

<a id="test"></a>

### 1.3 Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

<a id="introduction"></a>

## 2. API Introduction

<a id="rsa"></a>

### 2.1 RSA
[RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission.

In order to prevent API data from being exposed during transmission. This API server uses the RSA to encrypt the API data.

<a id="seg-wit"></a>

### 2.2 Generate SegWit address API
This API returns a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address
*	URL format: /api/v1/address/seg-wit
*	Request Method: Post

Request body:
|Field|Type|Description|
|:---:|:---:|:---:|
|data| string| Encrypt data|

Encrypt data:
|Field|Type|Description|
|:---:|:---:|:---:|
|mnemonic| string| seed |
|path| string| path |


Example:
*	Frontend encrypt data {"mnemonic":"junior keep day sentence defense crawl rabbit front evoke hobby awake fade" , path:"m/49'/0'/0'/1"}  => get encrypt data : "GHuYkp5AcKC2olWxGaOsUcTrpPHBsTS51tMkfaXaWyGSaFezm5oZp1GKT4555t5"
*	request body : {"data":"GHuYkp5AcKC2olWxGaOsUcTrpPHBsTS51tMkfaXaWyGSaFezm5oZp1GKT4555t5"}
*	response : {"address":"bc1qtcz5xl6q70vgge6axxz32q3l0gs38ws2r32cmj"}

<a id="multi-sig"></a>

### 2.3 Generate multi-sig address API
This API returns an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address
*	URL format: /api/v1/address/multi-sig
*	Request Method: Post

Request body:
|Field|Type|Description|
|:---:|:---:|:---:|
|data| string| Encrypt data|

Encrypt data:
|Field|Type|Description|
|:---:|:---:|:---:|
|m| number| m |
|n| number| n |
|addresses| []string| address list |

Example:
*	Frontend encrypt data {"m":1, "n":1, addresses:["02799dc04a8acf04e793ff0f2c35c21c0388529eb964c565a455f13c07123c9ea2"]}  => get encrypt data : "OhezuAuXH9/BFFJrnoQ57O2/NRRFmbeDVZB6ZKysI0Dr09jrA1qLvt8Lyv0fU5twO1tNUTeZSj+rOkOyFBr3UgOJZxNMVDEgKYWhfJIqCjAr3KSIli9V/iEBE9QhPfAQ5GcKI6/rgs2mPybYyBoW/1UhvQSSTtOAHVNV5pG2pBI="
*	request body : {"data":"OhezuAuXH9/BFFJrnoQ57O2/NRRFmbeDVZB6ZKysI0Dr09jrA1qLvt8Lyv0fU5twO1tNUTeZSj+rOkOyFBr3UgOJZxNMVDEgKYWhfJIqCjAr3KSIli9V/iEBE9QhPfAQ5GcKI6/rgs2mPybYyBoW/1UhvQSSTtOAHVNV5pG2pBI="}
*	response : {"address":"3JaRVih9yRUe1MP3t8NyBKH4JyLUnMVukC"}

<a id="interface"></a>

## 3. API Test interface
This is an example of a front-end interface, you can test these two apis here
```bash
http://127.0.0.1:3000/api_test
```

<a id="reference"></a>

## 4.Reference
- Nest.js: https://nestjs.com/

- RSA: https://en.wikipedia.org/wiki/RSA_(cryptosystem)