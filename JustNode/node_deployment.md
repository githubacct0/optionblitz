
#. NILE NETWORK

##. Create JST Token 		TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3
##. Create JustMid			TFbci8j8Ja3hMLPsupsuYcUMsgXniG1TWb
##. TronOracle 				TFbr36xsz2gxUJHXiUwK1tEJpLKxxiMsbz

#. Aggregator BTC-USD		TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4
##. JobID					6dff23e595e74352b319c35e2d29737a

#. Aggregator EUR-USDT		TLALWuipoQ15QSy4eKVq3hCua1P6D4E4t4
##. JobID					839c053c02204544b56403d3f43cc114

#. Aggregator XAU-USDT		THcT2kzbEtaJbA9NQvEgAGqUmSTpBoLBzm
##. JobID					44f3d76d57d84049a6c5e16a6fd58e38


BTC-USD https://nile.tronscan.org/#/contract/TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4/code
EUR-USD https://nile.tronscan.org/#/contract/TLALWuipoQ15QSy4eKVq3hCua1P6D4E4t4/code
XAU-USD https://nile.tronscan.org/#/contract/THcT2kzbEtaJbA9NQvEgAGqUmSTpBoLBzm/code

#. Deploy Instructions
##. https://docs.justlink.io/v1/doc/en/deploy.html#access-executable-program-for-the-node

#. Server IP: 192.119.95.69

#. MySQL Access:

##. root
##. 8+~$<N5!j'7;pGNL

##. nodesql
##. 12345!@#$%ABCabc

#. JST Node Operation Address
##. TFt7KWJ1S1dP3TV3jLaNNyDrisWAUMLj9P

#. Initialize DB
##. mysql -> DROP DATABASE oracle;
##. mysql -> CREATE DATABASE oracle;
##. ~/just-link/node/src/main/resources/db/migration# mysql -u root -p oracle < V1.0.1__init.sql 


#. Start JST Node
java -jar node/build/libs/node-v1.0.jar --server.port=8081 --spring.profiles.active=dev --key key.store --help --env dev

#. API Services:
https://marketdata.tradermade.com/api/v1/live?currency=BTCUSD&api_key=ZME_qzvTMesF1rckyVBK 
https://marketdata.tradermade.com/api/v1/live?currency=EURUSD&api_key=ZME_qzvTMesF1rckyVBK
https://marketdata.tradermade.com/api/v1/live?currency=XAUUSD&api_key=ZME_qzvTMesF1rckyVBK

#. Add Service
	/*
	    curl --location --request POST 'http://localhost:8081/job/specs' \
		  --header 'Content-Type: application/json' \
		    --data-raw '{
		    "initiators": [
		        {
		        "type": "runlog",
		        "params": {
		            "address": "TFbr36xsz2gxUJHXiUwK1tEJpLKxxiMsbz"
		        }
		        }
		    ],
		    "tasks": [
		        {
			        "type": "httpget",
			        "params": {
			            "get": "https://marketdata.tradermade.com/api/v1/live?currency=BTCUSD&api_key=ZME_qzvTMesF1rckyVBK",
			            "path": "quotes.0.mid"
			        }
		        },
		        {
			        "type": "multiply",
			        "params": {
			            "times": 1000000
			        }
		        },
		        {
		        "type": "trontx"
		        }
		    ]
		}'
		curl --location --request POST 'http://localhost:8081/job/specs' \
		  --header 'Content-Type: application/json' \
		    --data-raw '{
		    "initiators": [
		        {
		        "type": "runlog",
		        "params": {
		            "address": "TFbr36xsz2gxUJHXiUwK1tEJpLKxxiMsbz"
		        }
		        }
		    ],
		    "tasks": [
		        {
			        "type": "httpget",
			        "params": {
			            "get": "https://marketdata.tradermade.com/api/v1/live?currency=EURUSD&api_key=ZME_qzvTMesF1rckyVBK",
			            "path": "quotes.0.mid"
			        }
		        },
		        {
			        "type": "multiply",
			        "params": {
			            "times": 1000000
			        }
		        },
		        {
		        "type": "trontx"
		        }
		    ]
		}' 
		curl --location --request POST 'http://localhost:8081/job/specs' \
		  --header 'Content-Type: application/json' \
		    --data-raw '{
		    "initiators": [
		        {
		        "type": "runlog",
		        "params": {
		            "address": "TFbr36xsz2gxUJHXiUwK1tEJpLKxxiMsbz"
		        }
		        }
		    ],
		    "tasks": [
		        {
			        "type": "httpget",
			        "params": {
			            "get": "https://marketdata.tradermade.com/api/v1/live?currency=XAUUSD&api_key=ZME_qzvTMesF1rckyVBK",
			            "path": "quotes.0.mid"
			        }
		        },
		        {
			        "type": "multiply",
			        "params": {
			            "times": 1000000
			        }
		        },
		        {
		        "type": "trontx"
		        }
		    ]
		}'  


